import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Billboard, Box, Text, OrbitControls, PerspectiveCamera, Plane, Sphere, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import TestModel from '@/components/modal/hhiot/TestModel';
import { animated, useSpring } from '@react-spring/three';
import { Button } from 'antd';
import { Cube419 } from '@/components/modal/hhiot/Cube419';
import { Cube418 } from '@/components/modal/hhiot/Cube418';
import { Cube417 } from '@/components/modal/hhiot/Cube417';

function Scene({ target }: any) {
  const planeRef = useRef<THREE.Mesh>(null!);
  const tubeRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, THREE.DirectionalLightHelper)

  useHelper(tubeRef, THREE.BoxHelper, 'cyan')

  // 使用 useSpring 控制 group 的 position
  const { position } = useSpring({
    position: target,
    config: { mass: 1, tension: 120, friction: 14 }, // 动画阻尼参数
  })

  console.log('position', position, 'target', target)
  return (
    <>
      <directionalLight ref={lightRef} position={[0, 15, 15]} color={0xFFFFFF} intensity={1} castShadow shadow-mapSize={[4096, 4096]}>
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>
      <ambientLight intensity={0.8}/>
      <Plane
        ref={planeRef}
        args={[20, 20]}
        rotation-x={Math.PI * -0.5}
        receiveShadow
      >
        <meshPhongMaterial color={0xEEEEEE}/>
      </Plane>

      {/* <JzModel position={[0, 0, 0]} scale={0.1} rotation={[0, 0, 0]} castShadow/> */}
      {/* <TestModel position={[0, 0, 0]} scale={0.1} rotation={[0, 0, 0]} castShadow/> */}
      <animated.group position={position}>
        {/* <TestModel position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow/> */}
        <Cube419 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube418 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube417 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
      </animated.group>

      {/* <Billboard
        follow={true}
        lockX={false}
        lockY={false}
        lockZ={false} // Lock the rotation on the z axis (default=false)
      >
        <Text fontSize={1}>I'm a billboard</Text>
      </Billboard> */}
    </>
  )
}

export default function DemoTwo20React() {
  const [pos, setPos] = useState<[number, number, number]>([0, 0, 0])

  return (
    <div>
      <div>
        <div>
          <Button onClick={() => setPos([0, 0, 0])}>回到原点</Button>
          <Button onClick={() => setPos([2, 1, -1])}>移动到 (2,1,-1)</Button>
          <Button onClick={() => setPos([-2, 0, 2])}>移动到 (-2,0,2)</Button>
        </div>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]}/>
        <Scene target={pos} />
        <MyHelper/>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
