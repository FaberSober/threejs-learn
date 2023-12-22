import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";


function NormalOrbit({children, x = 0}: {children: React.ReactNode, x?: number}) {
  const ref = useRef<any>()
  useFrame((state, delta) => {
    ref.current!.rotation.y += delta
  })
  return (
    <object3D ref={ref} position={[x, 0, 0]}>
      <axesHelper renderOrder={1} onUpdate={self => self.material.depthTest = false}/>
      {children}
    </object3D>
  )
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>()

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta
  })

  return (
    <mesh
      // @ts-ignore
      ref={meshRef}
      scale={[5,5,5]}
      onUpdate={self => {
        // const axes = new THREE.AxesHelper();
        // axes.material.depthTest = false;
        // axes.renderOrder = 1;
        // self.add(axes);
      }}
    >
      <sphereGeometry args={[1, 6, 6]} />
      <meshPhongMaterial emissive={0xffff00} />
      <axesHelper renderOrder={1} onUpdate={self => self.material.depthTest = false} />
    </mesh>
  )
}

function Earth() {
  const meshRef = useRef<THREE.Mesh>()

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta
  })

  return (
    <mesh
      // @ts-ignore
      ref={meshRef}
    >
      <sphereGeometry args={[1, 6, 6]}/>
      <meshPhongMaterial color={0x2233ff} emissive={0x112244}/>
      <axesHelper renderOrder={1} onUpdate={self => self.material.depthTest = false}/>
    </mesh>
  )
}

function Moon() {
  const meshRef = useRef<THREE.Mesh>()
  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta
  })
  return (
    <mesh
      // @ts-ignore
      ref={meshRef}
      scale={[.5, .5, .5]}
    >
      <sphereGeometry args={[1, 6, 6]}/>
      <meshPhongMaterial color={0x888888} emissive={0x222222}/>
      <axesHelper renderOrder={1} onUpdate={self => self.material.depthTest = false}/>
    </mesh>
  )
}

export default function DemoTwo02React() {

  return (
    <Canvas>
      <pointLight color={0xffffff} intensity={3} />
      <PerspectiveCamera
        makeDefault
        fov={75}
        position={[0, 20, 0]}
        up={[0,0,1]}
        onUpdate={self => {
          self.lookAt(0,0,0);
        }}
      />
      <NormalOrbit>
        <Sun />
        <NormalOrbit x={10}>
          <Earth />
          <NormalOrbit x={2}>
            <Moon />
          </NormalOrbit>
        </NormalOrbit>
      </NormalOrbit>
    </Canvas>
  )
}
