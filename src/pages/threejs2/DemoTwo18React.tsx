import React, { useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import { useSpring } from "@react-spring/three";
import ParticleCloud from '@/components/effect/ParticleCloud';


function Scene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  // const tubeRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, THREE.DirectionalLightHelper)

  // useHelper(tubeRef, THREE.BoxHelper, 'cyan')

  const { spring } = useSpring({ from: { spring: 1 }, to: { spring: 0 }, loop: true });

  useFrame(({camera, pointer}, delta) => {
  })

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

      <ParticleCloud count={1000} />

      <mesh>
        <boxGeometry />
        <meshStandardMaterial attach="material" color="#CA8" roughness={0.5} metalness={1} />
      </mesh>

      <mesh scale={spring.to(s => [1 + s * 0.1, 1 + s * 0.1, 1 + s * 0.1])} rotation={[0, spring.to(s => s * Math.PI * 2), 0]}>
        <icosahedronGeometry />
        <meshStandardMaterial attach="material" color="#8AC" roughness={0.5} metalness={1} />
      </mesh>
    </>
  )
}

export default function DemoTwo18React() {
  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]}/>

        <Scene/>

        <MyHelper/>
        <OrbitControls/>
      </Canvas>

      <div>
        <ol>
          <li></li>
        </ol>
      </div>
    </div>
  )
}
