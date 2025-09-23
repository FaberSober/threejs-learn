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
import { Cube426 } from '@/components/modal/hhiot/Cube426';
import { Cube425 } from '@/components/modal/hhiot/Cube425';
import { Cube424 } from '@/components/modal/hhiot/Cube424';
import { Cube577 } from '@/components/modal/hhiot/Cube577';
import { Cube578 } from '@/components/modal/hhiot/Cube578';
import { Cube580 } from '@/components/modal/hhiot/Cube580';
import { Cube581 } from '@/components/modal/hhiot/Cube581';
import { Cube583 } from '@/components/modal/hhiot/Cube583';
import { Cube584 } from '@/components/modal/hhiot/Cube584';
import { Cube586 } from '@/components/modal/hhiot/Cube586';
import { Cube587 } from '@/components/modal/hhiot/Cube587';
import { Cube498 } from '@/components/modal/hhiot/Cube498';
import { Cube499 } from '@/components/modal/hhiot/Cube499';
import { Cube500 } from '@/components/modal/hhiot/Cube500';
import { Cube505 } from '@/components/modal/hhiot/Cube505';
import { Cube506 } from '@/components/modal/hhiot/Cube506';
import { Cube507 } from '@/components/modal/hhiot/Cube507';

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

        <Cube426 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube425 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube424 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />

        <Cube577 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube578 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />

        <Cube580 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube581 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />

        <Cube583 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube584 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />

        <Cube586 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube587 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />

        <Cube498 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube499 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube500 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />

        <Cube505 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube506 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
        <Cube507 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow />
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
