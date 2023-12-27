import React, { useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, PerspectiveCamera, Plane, Sphere, useHelper } from "@react-three/drei";
import XbotModel, { Anim } from "@/components/modal/bot/XbotModel";
import MyHelper from "@/components/modal/MyHelper";


const raycaster = new THREE.Raycaster();
const fromVector = new THREE.Vector3(0, 0, 0); // 初始位置
const targetVector = new THREE.Vector3(0, 0, 0); // 目标移动位置

let speed = 0.03; // 移动速度0.1m/s
let time0 = 0; // 移动时间
let distance = 0; // 移动的总距离
let moveDistance = 0; // 移动的距离

function Scene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  const boxRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const camera = useRef<THREE.OrthographicCamera>(null!)
  useHelper(lightRef, THREE.DirectionalLightHelper)
  // useHelper(camera, THREE.CameraHelper)

  const [linePoints, setLinePoints] = useState<any[]>([fromVector, targetVector])

  const [anim, setAnim] = useState<Anim>(Anim.idle)

  useFrame(({ camera, pointer }, delta) => {
    // 使用相机和指针位置更新拾取光线
    raycaster.setFromCamera( pointer, camera );

    // 计算与拾取射线相交的对象
    const intersects = raycaster.intersectObject(planeRef.current);
    if ( intersects.length > 0 ) {
      // 更新指示小球的位置
      sphereRef.current.position.copy(intersects[0].point);
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
      boxRef.current.position.setX(fromVector.x + moveX)
      boxRef.current.position.setZ(fromVector.z + moveZ)
    }
  })

  return (
    <>
      <directionalLight ref={lightRef} position={[0, 5, 5]} color={0xFFFFFF} intensity={3} castShadow shadow-mapSize={[4096, 4096]}>
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera ref={camera} attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>
      <Plane ref={planeRef} args={[20, 20]} rotation-x={Math.PI * -0.5} receiveShadow>
        <meshPhongMaterial color={0xEEEEEE} />
      </Plane>

      <Sphere
        ref={sphereRef}
        args={[0.5, 32, 32]}
        onClick={event => {
          // console.log('Sphere.onClick', event)
        }}
        onContextMenu={event => {
          // console.log('Sphere.onContextMenu', event)
          // 生成新的线段
          fromVector.copy(boxRef.current.position)
          targetVector.copy(event.point)
          setLinePoints([fromVector, targetVector])

          // 重置移动数据
          time0 = 0;
          distance = fromVector.distanceTo(targetVector)
          moveDistance = 0
          console.log('distance', distance)

          // 设置动画、移动速度
          if (distance > 5) {
            setAnim(Anim.run)
            speed = 0.07
          } else {
            setAnim(Anim.walk)
            speed = 0.03
          }

          // 设置朝向
          boxRef.current.lookAt(targetVector)

          // boxRef.current.position.set(targetVector.x, 0.5, targetVector.z)
        }}
        castShadow
      >
        <meshPhongMaterial color={0xff0000}/>
      </Sphere>

      <object3D ref={boxRef} position={[0, 0, 0]}>
        <XbotModel selAnim={anim} />
        {/*<MyHelper size={5} />*/}
      </object3D>

      <lineSegments>

      </lineSegments>
      <Line
        // points={[[0,0,0], [1,0.1,1]]}
        points={linePoints}
        color='red'
        visible={false}
      />
    </>
  )
}

export default function DemoTwo14React() {
  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]} />

        <Scene />

        {/*<MyHelper />*/}
        <OrbitControls />
      </Canvas>

      <div>
        <ol>
          <li>右键点击地面，控制人物移动到点击位置</li>
          <li>当移动距离大于5米时，人物跑动</li>
        </ol>
      </div>
    </div>
  )
}
