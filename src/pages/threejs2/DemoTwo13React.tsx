import React, { useRef, useState } from 'react'
import * as THREE from 'three';
import { Line2 } from 'three-stdlib';
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Line, OrbitControls, PerspectiveCamera, Plane, Sphere, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";


const raycaster = new THREE.Raycaster();
const fromVector = new THREE.Vector3(0, 0, 0); // 初始位置
const targetVector = new THREE.Vector3(0, 0, 0); // 目标移动位置

const speed = 0.2; // 移动速度0.5m/s
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
      <directionalLight ref={lightRef} position={[0, 5, 5]} color={0xFFFFFF} intensity={3} castShadow>
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

          // boxRef.current.position.set(targetVector.x, 0.5, targetVector.z)
        }}
        castShadow
      >
        <meshPhongMaterial color={0xff0000}/>
      </Sphere>

      <Box ref={boxRef} args={[1, 1, 1]} position={[0, 0.5, 0]} castShadow>
        <meshPhongMaterial color={0x00FF00} />
      </Box>

      <lineSegments>

      </lineSegments>
      <Line
        // points={[[0,0,0], [1,0.1,1]]}
        points={linePoints}
        color='red'
      />
    </>
  )
}

export default function DemoTwo13React() {
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
          <li>右键点击地面，控制方块移动到点击位置</li>
        </ol>
      </div>
    </div>
  )
}
