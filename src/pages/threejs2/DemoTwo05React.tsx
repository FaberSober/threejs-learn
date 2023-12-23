import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Sphere, useTexture } from "@react-three/drei";
import { useControls } from 'leva'


function Scene() {
  const boxRef = useRef<THREE.Mesh>(null);

  const config = useControls({
    'texture.wrapS': {
      value: THREE.ClampToEdgeWrapping,
      options: {
        ClampToEdgeWrapping: THREE.ClampToEdgeWrapping,
        'RepeatWrapping': THREE.RepeatWrapping,
        'MirroredRepeatWrapping': THREE.MirroredRepeatWrapping,
      }
    },
    'texture.repeat.x': {min: 0, max: 2, value: 1},
    'texture.repeat.y': {min: 0, max: 2, value: 1},
  })

  useFrame((state, delta) => {
    boxRef.current!.rotation.x += delta
    boxRef.current!.rotation.y += delta
  })

  const texture = useTexture('/assets/wall.png')
  texture.repeat.set(config['texture.repeat.x'], config['texture.repeat.y'])
  texture.wrapS = config['texture.wrapS']

  return (
    <>
      <mesh ref={boxRef}>
        <boxGeometry args={[1, 1, 1]}/>
        {/*<meshPhongMaterial color={0xFF0000} flatShading={true}/>*/}
        <meshBasicMaterial map={texture} />
      </mesh>
    </>
  )
}

export default function DemoTwo05React() {

  return (
    <Canvas>
      <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1} />
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={100} position={[0, 0, 2]} />

      <Scene />

      <OrbitControls/>
      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  )
}
