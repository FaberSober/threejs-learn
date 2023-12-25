import React, { useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import { useSpring, animated, config } from "@react-spring/three";
import { Button } from "antd";



function Scene({ active }: { active: boolean }) {
  const boxRef = useRef<THREE.Mesh>(null!);

  // const springs = useSpring({ scale: active ? 1.5 : 1 })
  const { scale } = useSpring({ scale: active ? 1.5 : 1 })

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    boxRef.current.rotation.x = a;
  });

  return (
    <>
      <animated.mesh ref={boxRef} scale={scale} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[1,1,1]} />
        <meshBasicMaterial color={0xffff00} />
      </animated.mesh>
    </>
  )
}


function MyRotatingBox() {
  const myMesh = useRef<THREE.Mesh>(null!);
  const [active, setActive] = useState(false);

  const { scale } = useSpring({
    scale: active ? 1.5 : 1,
    config: config.wobbly
  });

  useFrame(({ clock }) => {
    const a = clock.getElapsedTime();
    myMesh.current.rotation.x = a;
  });

  return (
    <animated.mesh
      ref={myMesh}
      scale={scale}
      onClick={() => setActive(!active)}
      position={[4,0,0]}
    >
      <boxGeometry />
      <meshBasicMaterial color="royalblue" />
    </animated.mesh>
  );
}

export default function DemoTwo08React() {
  const [animated, setAnimated] = useState(true)

  return (
    <div>
      <Canvas>
        <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1} />
        <PerspectiveCamera makeDefault fov={75} near={0.1} far={1000} position={[5, 5, 5]} />

        <Scene active={animated} />
        <MyRotatingBox />

        <OrbitControls />
        <MyHelper />
      </Canvas>

      <Button onClick={() => setAnimated(!animated)}>
        {animated ? '动画中' : '动画暂停'}
      </Button>
      <div>单击蓝色方块触发缩放动画</div>
    </div>
  )
}
