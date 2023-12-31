import React, { createContext, PropsWithoutRef, RefAttributes, useContext, useImperativeHandle, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Box,
  Cone,
  GizmoHelper,
  GizmoViewport,
  KeyboardControls,
  KeyboardControlsEntry,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  PointerLockControls,
  StatsGl,
  useHelper,
  useKeyboardControls
} from "@react-three/drei";
import MyFactory from "@/components/modal/myFactory/MyFactory";
import { Button, Checkbox, Radio, Space } from "antd";
import MyHelper from "@/components/modal/MyHelper";
import MyCar from "@/components/modal/car/MyCar";
import XbotModel, { Anim } from "@/components/modal/bot/XbotModel";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib/controls/OrbitControls";
import gsap from "gsap";
import { Vector3 } from "three";


// Create a sine-like wave
const controlPoints:[number, number, number][] = [
  [30, 0, 30],
  [-30, 0, 30],
  [-30, 0, -30],
  [30, 0, -30],
];
const p0 = new THREE.Vector3();
const p1 = new THREE.Vector3();
const curve = new THREE.CatmullRomCurve3(
  controlPoints.map((p, ndx) => {
    p0.set(...p);
    p1.set(...controlPoints[(ndx + 1) % controlPoints.length]);
    return [
      (new THREE.Vector3()).copy(p0),
      (new THREE.Vector3()).lerpVectors(p0, p1, 0.1),
      (new THREE.Vector3()).lerpVectors(p0, p1, 0.9),
    ];
  }).flat(),
  true,
);

const points = curve.getPoints(250);

const raycaster = new THREE.Raycaster();
const cursorPosition = new THREE.Vector3(); // 移动指标位置
const fromVector = new THREE.Vector3(0, 0, 0); // 初始位置
const targetVector = new THREE.Vector3(0, 0, 0); // 目标移动位置

// let speed = 0.03; // 移动速度0.1m/s
let time0 = 0; // 移动时间
let distance = 0; // 移动的总距离
let moveDistance = 0; // 移动的距离

const carWorldPosition = new THREE.Vector3();
const carPosition = new THREE.Vector3();
const carTarget = new THREE.Vector3();
const personPosition = new THREE.Vector3(); // 人物位置

enum OprType { GLOBAL, PERSON, SET_PERSON }
let oprType:OprType = OprType.GLOBAL; // 操作类型

function MovingCar() {
  const {cameraType, showHelper} = useContext(ConfigLayoutContext)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  const carRef = useRef<THREE.Object3D>(null!)

  useHelper(showHelper && cameraRef, THREE.CameraHelper)

  useFrame(({ clock }) => {
    const time =  clock.getElapsedTime();
    // move tank
    const carTime = time * .05;

    curve.getPointAt(carTime % 1, carPosition);
    curve.getPointAt((carTime + 0.01) % 1, carTarget);
    carRef.current.position.set(carPosition.x, carPosition.y, carPosition.z);
    carRef.current.lookAt(carTarget);
    cameraRef.current.lookAt(carTarget.x, 4, carTarget.z);

    // get tank world position
    carRef.current.getWorldPosition(carWorldPosition);
  })

  return (
    <>
      <object3D ref={carRef} position={[5, 0, 5]}>
        <MyCar anim="Move"/>

        {/* 小车摄像头 */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault={cameraType === CameraType.Car}
          position={[0, 4, -4]}
          rotation={[0,Math.PI, 0]}
        />

        {showHelper && <MyHelper />}
      </object3D>

      {/* 小车运动线路 */}
      <Line points={points} position={[0, 0.05, 0]} color={0xff0000}/>
    </>
  )
}

type ForwardRefComponent<P, T> = React.ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>>

interface SceneProps {}
interface SceneImpl {
  handleFreeView: () => void;
  handleFollowPerson: () => void;
  handleSetPerson: () => void;
  animPerson: (anim: Anim) => void;
}

const Scene: ForwardRefComponent<SceneProps, SceneImpl> = React.forwardRef(
  (props, ref) => {
    const {cameraType, showHelper} = useContext(ConfigLayoutContext)
    const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
    const light1 = React.useRef<THREE.DirectionalLight>(null!)
    const light1ShadowCamera = useRef<THREE.OrthographicCamera>(null!)

    const botBoxRef = useRef<THREE.Mesh>(null!); // 人物
    const planeRef = useRef<THREE.Mesh>(null!);
    const sphereRef = useRef<THREE.Mesh>(null!);

    useHelper(showHelper && cameraRef, THREE.CameraHelper)
    useHelper(showHelper && light1, THREE.DirectionalLightHelper)
    // useHelper(showHelper && light1ShadowCamera, THREE.CameraHelper)

    const [anim, setAnim] = useState<Anim>(Anim.idle)

    const { scene, camera, controls } = useThree()

    // 封装供外部主动调用的接口
    useImperativeHandle(ref, () => ({
      handleFreeView: () => {
        console.log('自由控制视角')
        oprType = OprType.GLOBAL;
        if (controls) {
          const orbitControl = controls as OrbitControlsImpl
          orbitControl.enablePan = true;
          orbitControl.enableZoom = true;
        }
      },
      handleFollowPerson: () => {
        // console.log(scene)
        // const camera = scene.getObjectByName('CameraGlobal01') as THREE.PerspectiveCamera;
        // console.log('camera', camera)
        // console.log('s', s)
        console.log('跟随人物，第三人称视角')

        oprType = OprType.PERSON;

        const botPos = botBoxRef.current.position;
        const movePos = new THREE.Vector3(
          botPos.x,
          botPos.y,
          botPos.z,
        ); // 人物位置

        gsap.to(camera.position, { x: movePos.x, y: movePos.y + 2, z: movePos.z - 2, duration: 3, ease: "power1.inOut", });
        if (controls) {
          const orbitControl = controls as OrbitControlsImpl
          gsap.to(orbitControl.target, { x: movePos.x, y: movePos.y + 2, z: movePos.z, duration: 3, ease: "power1.inOut", });

          orbitControl.enablePan = false;
          orbitControl.enableZoom = false;
        }
      },
      handleSetPerson: () => {
        console.log('点击地面，设置人物位置')
        oprType = OprType.SET_PERSON;
      },
      animPerson: (anim: Anim) => {
        setAnim(anim)
      },
    }));


    // 射线检测
    useFrame(({ camera, pointer }, delta) => {
      if (oprType !== OprType.SET_PERSON) {
        return;
      }

      // 计算与拾取射线相交的对象
      {
        // 使用相机和指针位置更新拾取光线
        raycaster.setFromCamera( pointer, camera );
        const intersects = raycaster.intersectObject(planeRef.current);
        if ( intersects.length > 0 ) {
          cursorPosition.copy(intersects[0].point)
          // 更新指示小球的位置
          sphereRef.current.position.setX(intersects[0].point.x)
          sphereRef.current.position.setZ(intersects[0].point.z)
        }
      }

      // 更新移动进度
      if (moveDistance < distance && distance > 0) {
        time0 += delta;
        moveDistance += speed;
        if (moveDistance >= distance) {
          moveDistance = distance;
          setAnim(Anim.idle)
        }

        // 计算移动的目标点
        const movePer = moveDistance / distance;
        const moveX = (targetVector.x - fromVector.x) * movePer
        const moveZ = (targetVector.z - fromVector.z) * movePer
        // 更新移动方块的位置
        botBoxRef.current.position.setX(fromVector.x + moveX)
        botBoxRef.current.position.setZ(fromVector.z + moveZ)
      }
    })

    // 键盘控制
    const [, get] = useKeyboardControls<Controls>()

    useFrame(({ camera, pointer }, delta) => {
      if (oprType !== OprType.PERSON) {
        return;
      }

      const state = get()
      const orbitControl = controls as OrbitControlsImpl

      // 前后方向
      if (state.forward) {
        transformed.z = -speed
      } else if (state.back) {
        transformed.z = speed
      } else {
        transformed.z = 0
      }

      // 左右方向
      if (state.left) {
        transformed.x = -speed
      } else if (state.right) {
        transformed.x = speed
      } else {
        transformed.x = 0
      }

      // 获取控制器旋转，使得永远朝向控制器的前方前进
      const angle = orbitControl.getAzimuthalAngle();
      transformed.applyAxisAngle(THREE.Object3D.DEFAULT_UP, angle);

      // 同步移动位置
      botBoxRef.current.position.add(transformed);
      camera.position.add(transformed);
      orbitControl.target.add(transformed);

      // 更新人物模型旋转方向
      botBoxRef.current.rotation.y = angle - Math.PI

      transformed.set(0, 0, 0);
    })

    return (
      <>
        {/* 点光源1 */}
        <directionalLight ref={light1} color={0xffffff} intensity={1} position={[-40, 40, 0]} castShadow>
          {/* 使用react-three-fiber的嵌套属性 */}
          <orthographicCamera ref={light1ShadowCamera} attach="shadow-camera" args={[-50, 50, 50, -50]}/>
        </directionalLight>

        <ambientLight intensity={0.8}/>

        {/* 工厂-基础模型 */}
        <object3D>
          <MyFactory showHelper={showHelper}/>

          <Plane
            ref={planeRef}
            name="平面检测"
            position={[0,-0.1,0]}
            args={[100, 100]}
            // material={new THREE.MeshPhongMaterial({color: 0xFF0000})}
            rotation={[Math.PI * -0.5, 0, 0]}
            onPointerOver={(event) => event.stopPropagation()}
          >
            <meshBasicMaterial transparent color={0x000000} opacity={0} />
          </Plane>
        </object3D>

        {/* 小车 */}
        <MovingCar/>

        {/* 人物 */}
        <object3D ref={botBoxRef} position={[0, 0, 0]} scale={[1,1,1]} name="Person01">
          <XbotModel selAnim={anim}/>
          {/*<MyHelper size={5} unit={20}/>*/}
        </object3D>

        {/* 移动指示器 */}
        <Cone
          ref={sphereRef}
          args={[0.4, 2, 4]}
          rotation={[Math.PI, 0, 0]}
          position={[0,0,0]}
          castShadow
          // visible={oprType === OprType.SET_PERSON}
          // 点击左键，直接设置人物坐标
          onClick={event => {
            console.log('移动指示器.onClick', oprType, cursorPosition)
            // 移动人物到点击位置
            if (oprType !== OprType.SET_PERSON) {
              return;
            }
            botBoxRef.current.position.setX(cursorPosition.x)
            botBoxRef.current.position.setZ(cursorPosition.z)
          }}
          // 点击右键，动画移动人物
          onContextMenu={event => {
            // console.log('Sphere.onContextMenu', event)
            // 生成新的线段
            fromVector.copy(botBoxRef.current.position)
            targetVector.copy(event.point)

            // 重置移动数据
            time0 = 0;
            distance = fromVector.distanceTo(targetVector)
            moveDistance = 0
            console.log('distance', distance)

            // 设置动画、移动速度
            if (distance > 5) {
              setAnim(Anim.run)
              speed = 0.1
            } else {
              setAnim(Anim.walk)
              speed = 0.05
            }

            // 设置朝向
            botBoxRef.current.lookAt(targetVector)
          }}
        >
          <meshLambertMaterial color='red' />
        </Cone>

        {/* 场景摄像机 */}
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault={cameraType === CameraType.Scene}
          position={[10, 10, 10]}
          fov={40}
          near={1}
          far={20}
        />
      </>
    )
  }
)

enum CameraType {
  Global,
  Scene,
  Car,
}

interface ConfigLayoutContextProps {
  cameraType: CameraType;
  showHelper: boolean;
}

const ConfigLayoutContext = createContext<ConfigLayoutContextProps>({} as any);

const _velocity = new Vector3() // 移动速度向量
let moving = false; // 是否在移动中
let canJump = true; // 是否可以跳跃
let speed = 0.05;

const transformed = new THREE.Vector3(); // 移动向量

enum Controls {
  forward = 'forward',
  left = 'left',
  right = 'right',
  back = 'back',
  jump = 'jump',
}

export default function DemoTwo06React() {
  const [controlType, setControlType] = useState<'Orbit' | 'PointerLock'>('Orbit')
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.Global)
  const [showHelper, setShowHelper] = useState(true)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const controlRef = useRef<OrbitControlsImpl>(null!)
  const sceneRef = useRef<SceneImpl>(null!)

  const contextValue: ConfigLayoutContextProps = {
    cameraType,
    showHelper,
  }

  const map = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  )

  /**
   * 查看全局场景
   */
  function handleViewGlobal() {
    gsap.to(cameraRef.current.position, { x: 40, y: 40, z: 40, duration: 3, ease: "power1.inOut", });
    gsap.to(controlRef.current.target, { x: 0, y: 0, z: 0, duration: 3, ease: "power1.inOut", });
  }

  /**
   * 查看楼栋场景
   */
  function handleViewBuilding() {
    gsap.to(cameraRef.current.position, { x: 14, y: 14, z: 8, duration: 3, ease: "power1.inOut", });
    gsap.to(controlRef.current.target, { x: 0, y: 5, z: -8, duration: 3, ease: "power1.inOut", });
  }

  /**
   * 查看摄像头场景
   */
  function handleViewCamera() {
    gsap.to(cameraRef.current.position, { x: 1, y: 16, z: 19, duration: 3, ease: "power1.inOut", });
    gsap.to(controlRef.current.target, { x: -12, y: 6, z: 10, duration: 3, ease: "power1.inOut", });
  }

  function handlePrintInfo() {
    console.log('控制器target位置：', controlRef.current.target)
    console.log('相机位置：', cameraRef.current.position)
  }

  return (
    <div>
      <Canvas shadows>

        {/* Context需要包裹Scene，如果Context包裹Canvas，会导致每次热更新代码触发THREE.WebGLRenderer: Context Lost.。导致重新渲染 */}
        <ConfigLayoutContext.Provider value={contextValue}>
          <KeyboardControls
            map={map}
            onChange={(name, pressed, _state: any) => {
              if (oprType !== OprType.PERSON) {
                return;
              }
              // 控制人物动画
              if (_state.forward || _state.back || _state.left || _state.right) {
                if (!moving) {
                  sceneRef.current && sceneRef.current.animPerson(Anim.walk)
                }
                moving = true
              } else {
                if (moving) {
                  sceneRef.current && sceneRef.current.animPerson(Anim.idle)
                }
                moving = false
              }
            }}
          >
            <Scene ref={sceneRef} />
          </KeyboardControls>
        </ConfigLayoutContext.Provider>

        {/* 全局摄像机 */}
        <PerspectiveCamera
          ref={cameraRef}
          name="CameraGlobal01"
          makeDefault={cameraType === CameraType.Global}
          position={[30, 30, 30]}
        />

        <OrbitControls
          ref={controlRef}
          makeDefault
        />
        <StatsGl className="fa-stats-gl-rb" />
        {/*<PointerLockControls enabled={controlType === 'PointerLock'} />*/}

        <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
          <GizmoViewport/>
        </GizmoHelper>
      </Canvas>

      <div style={{marginTop: 12, display: 'flex', flexDirection: 'column'}}>
        <Space style={{marginTop: 12}}>
          <div>控制方式：</div>
          <Radio.Group value={controlType} onChange={e => setControlType(e.target.value)} buttonStyle="solid">
            <Radio.Button value='Orbit'>Orbit</Radio.Button>
            <Radio.Button value='PointerLock'>PointerLock</Radio.Button>
          </Radio.Group>
        </Space>

        <Space style={{marginTop: 12}}>
          <div>操作方式：</div>
          <Button onClick={() => sceneRef.current && sceneRef.current.handleFreeView()}>自动视角</Button>
          <Button onClick={() => sceneRef.current && sceneRef.current.handleFollowPerson()}>跟随人物</Button>
          <Button onClick={() => sceneRef.current && sceneRef.current.handleSetPerson()}>设置人物位置</Button>
        </Space>

        <Space style={{marginTop: 12}}>
          <div>镜头选择：</div>
          <Radio.Group value={cameraType} onChange={e => setCameraType(e.target.value)} buttonStyle="solid">
            <Radio.Button value={CameraType.Global}>全局摄像机</Radio.Button>
            <Radio.Button value={CameraType.Scene}>场景摄像机</Radio.Button>
            <Radio.Button value={CameraType.Car}>移动小车</Radio.Button>
          </Radio.Group>
        </Space>

        <Space style={{marginTop: 12}}>
          <div>查看场景：</div>
          <Button onClick={handleViewGlobal}>全局</Button>
          <Button onClick={handleViewBuilding}>楼栋</Button>
          <Button onClick={handleViewCamera}>摄像头</Button>
        </Space>

        <Space style={{marginTop: 12}}>
          <div>获取数据：</div>
          <Button onClick={handlePrintInfo}>获取数据</Button>
        </Space>

        <Space style={{marginTop: 12}}>
          <div>showHelper：</div>
          <Checkbox checked={showHelper} onChange={e => setShowHelper(e.target.checked)}>
            showHelper
          </Checkbox>
        </Space>

        <ol>
          <li>固定路线循环运动小车</li>
          <li>控制移动的人物</li>
          <li>设置人物位置：鼠标左键直接设置位置，鼠标右键人物走动。（TODO：目前先点击右键人物走动后，再切换人物跟随视角。人物会一直看向走动的目标点）</li>
        </ol>
      </div>
    </div>
  )
}
