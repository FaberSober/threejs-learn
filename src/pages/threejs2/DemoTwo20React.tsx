import React, { useMemo, useRef } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Box, OrbitControls, PerspectiveCamera, Plane, Sphere, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import JzModel from '@/components/modal/hhiot/JzModel';


function Scene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  const tubeRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, THREE.DirectionalLightHelper)

  useHelper(tubeRef, THREE.BoxHelper, 'cyan')


  return (
    <>
      <directionalLight ref={lightRef} position={[0, 15, 15]} color={0xFFFFFF} intensity={1} castShadow shadow-mapSize={[4096, 4096]}>
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>
      <ambientLight intensity={0.8}/>
      {/* <Plane
        ref={planeRef}
        args={[20, 20]}
        rotation-x={Math.PI * -0.5}
        receiveShadow
      >
        <meshPhongMaterial color={0xEEEEEE}/>
      </Plane> */}

      <JzModel position={[0, 0, 0]} scale={0.1} rotation={[0, 0, 0]} castShadow/>
    </>
  )
}

export default function DemoTwo20React() {
  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]}/>

        <Scene/>

        {/* <MyHelper/> */}
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
