import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useControls } from 'leva'



interface MyHelperProps {
  unit?: number,
  helperVisible?: boolean,
}

function MyHelper({ unit = 10, helperVisible }: MyHelperProps) {
  return (
    <>
      <gridHelper visible={helperVisible} args={[unit, unit]} renderOrder={1} onUpdate={self => self.material.depthTest = false}/>
      <axesHelper visible={helperVisible} renderOrder={2} onUpdate={self => self.material.depthTest = false}/>
    </>
  )
}

interface NormalOrbitProps extends MyHelperProps{
  name: string,
  children: React.ReactNode,
  x?: number,
}

function NormalOrbit({name, children, x = 0, ...myHelperProps}: NormalOrbitProps) {
  const ref = useRef<THREE.Object3D>(null!)
  useFrame((state, delta) => {
    ref.current!.rotation.y += delta
  })
  return (
    <object3D ref={ref} position={[x, 0, 0]}>
      <MyHelper {...myHelperProps} />
      {children}
    </object3D>
  )
}

function Sun(props: MyHelperProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta
  })

  return (
    <mesh ref={meshRef} scale={[5,5,5]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshPhongMaterial emissive={0xffff00} />
      <MyHelper {...props} />
    </mesh>
  )
}

function Earth(props: MyHelperProps) {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 6, 6]}/>
      <meshPhongMaterial color={0x2233ff} emissive={0x112244}/>
      <MyHelper {...props} />
    </mesh>
  )
}

function Moon(props: MyHelperProps) {
  const meshRef = useRef<THREE.Mesh>(null!)
  useFrame((state, delta) => {
    meshRef.current!.rotation.y += delta
  })
  return (
    <mesh ref={meshRef} scale={[.5, .5, .5]}>
      <sphereGeometry args={[1, 6, 6]}/>
      <meshPhongMaterial color={0x888888} emissive={0x222222}/>
      <MyHelper {...props} />
    </mesh>
  )
}

export default function DemoTwo02React() {
  const configs = useControls({
    solarSystem: false,
    sunMesh: false,
    earthOrbit: false,
    earthMesh: false,
    moonOrbit: false,
    moonMesh: false,
  })

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
      <NormalOrbit name="solarSystem" unit={25} helperVisible={configs.solarSystem}>
        <Sun helperVisible={configs.sunMesh} />
        <NormalOrbit x={10} name="earthOrbit" helperVisible={configs.earthOrbit}>
          <Earth helperVisible={configs.earthMesh} />
          <NormalOrbit x={2} name="moonOrbit" helperVisible={configs.moonOrbit}>
            <Moon helperVisible={configs.moonMesh} />
          </NormalOrbit>
        </NormalOrbit>
      </NormalOrbit>
    </Canvas>
  )
}
