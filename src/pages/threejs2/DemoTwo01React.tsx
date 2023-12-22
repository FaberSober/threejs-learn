import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

let time = 0

interface BoxProps extends MeshProps {
  color: number;
  x: number;
}

function Box({ color, x, ...props}: BoxProps) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef<THREE.Mesh>(null!)

  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    time += delta
    meshRef.current!.rotation.x += delta
    meshRef.current!.rotation.y += delta
  })

  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      ref={meshRef}
      position={[x, 0, 0]}
      {...props}
    >
      <boxGeometry args={[1, 1, 1]} />
      {/*<meshBasicMaterial color={color} />*/}
      <meshPhongMaterial color={color} />
    </mesh>
  )
}

export default function DemoTwo01React() {
  return (
    <Canvas>
      <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1} />
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={5} position={[0, 0, 2]} />
      <Box color={0x44aa88} x={0} />
      <Box color={0x8844aa} x={-2} />
      <Box color={0xaa8844} x={2} />
    </Canvas>
  )
}
