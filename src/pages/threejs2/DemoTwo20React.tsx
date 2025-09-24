import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Billboard, Box, Text, OrbitControls, PerspectiveCamera, Plane, Sphere, useHelper, Sky, useTexture } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import TestModel from '@/components/modal/hhiot/TestModel';
import { animated, useSpring } from '@react-spring/three';
import { Button } from 'antd';
import { Cube419 } from '@/components/modal/hhiot/cube/Cube419';
import { Cube418 } from '@/components/modal/hhiot/cube/Cube418';
import { Cube417 } from '@/components/modal/hhiot/cube/Cube417';
import { Cube426 } from '@/components/modal/hhiot/cube/Cube426';
import { Cube425 } from '@/components/modal/hhiot/cube/Cube425';
import { Cube424 } from '@/components/modal/hhiot/cube/Cube424';
import { Cube577 } from '@/components/modal/hhiot/cube/Cube577';
import { Cube578 } from '@/components/modal/hhiot/cube/Cube578';
import { Cube580 } from '@/components/modal/hhiot/cube/Cube580';
import { Cube581 } from '@/components/modal/hhiot/cube/Cube581';
import { Cube583 } from '@/components/modal/hhiot/cube/Cube583';
import { Cube584 } from '@/components/modal/hhiot/cube/Cube584';
import { Cube586 } from '@/components/modal/hhiot/cube/Cube586';
import { Cube587 } from '@/components/modal/hhiot/cube/Cube587';
import { Cube498 } from '@/components/modal/hhiot/cube/Cube498';
import { Cube499 } from '@/components/modal/hhiot/cube/Cube499';
import { Cube500 } from '@/components/modal/hhiot/cube/Cube500';
import { Cube505 } from '@/components/modal/hhiot/cube/Cube505';
import { Cube506 } from '@/components/modal/hhiot/cube/Cube506';
import { Cube507 } from '@/components/modal/hhiot/cube/Cube507';

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

  function handleCubeClick(e: { stopPropagation: () => void }, name: string) {
    e.stopPropagation()
    console.log('click', name)
  }

  const textureGround = useTexture('/file/image/ground.png'); // 地面贴图

  console.log('position', position, 'target', target)
  return (
    <>
      <directionalLight ref={lightRef} position={[0, 15, 15]} color={0xFFFFFF} intensity={1} castShadow shadow-mapSize={[4096, 4096]}>
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
      <ambientLight intensity={0.8}/>
      <Plane
        ref={planeRef}
        args={[384, 216]}
        rotation-x={Math.PI * -0.5}
        receiveShadow
      >
        {/* <meshPhongMaterial color={0xEEEEEE}/> */}
        <meshPhongMaterial transparent={true} color={0xffffff} opacity={1} depthTest={true} map={textureGround} />
      </Plane>

      {/* <JzModel position={[0, 0, 0]} scale={0.1} rotation={[0, 0, 0]} castShadow/> */}
      {/* <TestModel position={[0, 0, 0]} scale={0.1} rotation={[0, 0, 0]} castShadow/> */}
      <group position={[0,0,0]} rotation={[0, -Math.PI*0.3, 0]}>
        <animated.group position={position}>
          {/* <TestModel position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow/> */}
          <Cube419 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '419')} />
          <Cube418 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '418')} />
          <Cube417 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '417')} />

          <Cube426 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '426')} />
          <Cube425 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '425')} />
          <Cube424 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '424')} />

          <Cube577 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '577')} />
          <Cube578 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '578')} />

          <Cube580 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '580')} />
          <Cube581 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '581')} />

          <Cube583 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '583')} />
          <Cube584 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '584')} />

          <Cube586 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '586')} />
          <Cube587 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '587')} />

          <Cube498 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '498')} />
          <Cube499 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '499')} />
          <Cube500 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '500')} />

          <Cube505 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '505')} />
          <Cube506 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '506')} />
          <Cube507 position={[0,0,0]} scale={0.1} rotation={[0, 0, 0]} castShadow onClick={e => handleCubeClick(e, '507')} />
        </animated.group>
      </group>

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
        <PerspectiveCamera makeDefault fov={75} position={[3, 6, 10]}/>
        <Scene target={pos} />
        <MyHelper/>
        <OrbitControls/>
      </Canvas>
    </div>
  )
}
