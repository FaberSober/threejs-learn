import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, Sphere } from "@react-three/drei";


export default function DemoTwo04React() {
  return (
    <Canvas>
      <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1} />
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={100} position={[0, 0, 10]} />

      <mesh>
        <sphereGeometry args={[1, 20, 20]} />
        <meshPhongMaterial color={0xFF0000} flatShading={true} />
      </mesh>

      <Sphere args={[1, 20, 20]} position={[-3, 6, 0]}>
        <meshBasicMaterial color={0xFF0000} />
      </Sphere>

      <Sphere args={[1, 20, 20]} position={[0, 6, 0]}>
        <meshPhongMaterial color={0xFF0000} flatShading={true}/>
      </Sphere>


      <OrbitControls/>
      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  )
}
