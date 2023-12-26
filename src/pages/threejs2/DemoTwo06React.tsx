import React, { createContext, useContext, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { Billboard, CycleRaycast, GizmoHelper, GizmoViewport, Html, Line, OrbitControls, PerspectiveCamera, PointerLockControls, Text, useHelper } from "@react-three/drei";
import MyFactory from "@/components/modal/myFactory/MyFactory";
import { Checkbox, Radio, Space } from "antd";
import MyHelper from "@/components/modal/MyHelper";
import MyCar from "@/components/modal/car/MyCar";


// Create a sine-like wave
const controlPoints:[number, number, number][] = [
  [30, 0, 30],
  [-30, 0, 30],
  [-30, 0, -30],
  [30, 0, -30],
  // [30, 0, 30],
];
// const curve = new THREE.SplineCurve( [
//   new THREE.Vector2( 30, 30 ),
//   new THREE.Vector2( -30, 30 ),
//   new THREE.Vector2( -30, -30 ),
//   new THREE.Vector2( 30, -30 ),
//   new THREE.Vector2( 30, 30 ),
// ]);
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


const tankWorldPosition = new THREE.Vector3();
const tankPosition = new THREE.Vector3();
const tankTarget = new THREE.Vector3();

function Scene() {
  const {cameraType, showHelper} = useContext(ConfigLayoutContext)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const light1 = React.useRef<THREE.DirectionalLight>(null!)
  const light1ShadowCamera = useRef<THREE.OrthographicCamera>(null!)

  useHelper(showHelper && cameraRef, THREE.CameraHelper)
  useHelper(showHelper && light1, THREE.DirectionalLightHelper)
  // useHelper(showHelper && light1ShadowCamera, THREE.CameraHelper)

  const carRef = useRef<THREE.Object3D>(null!)

  useFrame(({ clock }) => {
    const time =  clock.getElapsedTime();
    // move tank
    const tankTime = time * .05;

    curve.getPointAt(tankTime % 1, tankPosition);
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
    carRef.current.position.set(tankPosition.x, tankPosition.y, tankPosition.z);
    carRef.current.lookAt(tankTarget);

    // get tank world position
    carRef.current.getWorldPosition(tankWorldPosition);
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
      <MyFactory showHelper={showHelper}/>

      {/* 小车 */}
      <object3D ref={carRef} position={[5,0,5]}>
        <MyCar anim="Move" />
      </object3D>

      {/* 小车运动线路 */}
      <Line points={points} position={[0,0.05,0]} color={0xff0000} />

      <CycleRaycast
        onChanged={(objects, cycle) => {
          // console.log(objects, cycle)
          return null;
        }}
      />

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

enum CameraType {
  Global,
  Scene,
}

export interface ConfigLayoutContextProps {
  cameraType: CameraType;
  showHelper: boolean;
}

export const ConfigLayoutContext = createContext<ConfigLayoutContextProps>({} as any);

export default function DemoTwo06React() {
  const [controlType, setControlType] = useState<'Orbit' | 'PointerLock'>('Orbit')
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.Global)
  const [showHelper, setShowHelper] = useState(true)

  const contextValue: ConfigLayoutContextProps = {
    cameraType,
    showHelper,
  }

  return (
    <ConfigLayoutContext.Provider value={contextValue}>
      <div>
        <Canvas shadows>
          <Scene/>

          {/* 全局摄像机 */}
          <PerspectiveCamera
            makeDefault={cameraType === CameraType.Global}
            position={[30, 30, 30]}
          />

          {controlType === 'Orbit' && <OrbitControls/>}
          {controlType === 'PointerLock' && <PointerLockControls/>}


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
            <div>镜头选择：</div>
            <Radio.Group value={cameraType} onChange={e => setCameraType(e.target.value)} buttonStyle="solid">
              <Radio.Button value={CameraType.Global}>全局摄像机</Radio.Button>
              <Radio.Button value={CameraType.Scene}>场景摄像机</Radio.Button>
            </Radio.Group>
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
          </ol>
        </div>
      </div>
    </ConfigLayoutContext.Provider>
  )
}
