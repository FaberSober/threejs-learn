import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Button } from "antd";
import MyHelper from "@/components/modal/MyHelper";
import gsap from "gsap";


let animate1: gsap.core.Tween|undefined = undefined

function Scene({ animated }: {animated:boolean}) {
  const boxRef = useRef<THREE.Mesh>(null!);

  useEffect(() => {
    console.log('boxRef.current', boxRef.current)
    animate1 = gsap.to(boxRef.current.position, {
      x: 5,
      duration: 5,
      ease: "power1.inOut",
      //   设置重复的次数，无限次循环-1
      repeat: -1,
      //   往返运动
      yoyo: true,
      //   delay，延迟2秒运动
      delay: 2,
      onComplete: () => {
        console.log("动画完成");
      },
      onStart: () => {
        console.log("动画开始");
      },
    });
    gsap.to(boxRef.current.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });
  }, [boxRef.current])

  useEffect(() => {
    console.log('animated', animated, animate1, animate1?.isActive())
    if (animate1 === undefined) return;
    if (animate1.isActive()) {
      //   暂停
      animate1.pause();
    } else {
      //   恢复
      animate1.resume();
    }
  }, [animated])

  return (
    <>
      <mesh ref={boxRef} rotation={[Math.PI / 4, 0, 0]}>
        <boxGeometry args={[1,1,1]} />
        <meshBasicMaterial color={0xffff00} />
      </mesh>
    </>
  )
}

export default function DemoTwo07React() {
  const [animated, setAnimated] = useState(true)

  return (
    <div>
      <Canvas>
        <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1} />
        <PerspectiveCamera makeDefault fov={75} near={0.1} far={1000} position={[0, 0, 10]} />

        <Scene animated={animated} />

        <OrbitControls />
        <MyHelper />
      </Canvas>

      <Button onClick={() => setAnimated(!animated)}>
        {animated ? '动画中' : '动画暂停'}
      </Button>
    </div>
  )
}
