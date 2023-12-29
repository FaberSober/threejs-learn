import React, { useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane, Tube, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";


const point1 = new THREE.Vector3(0, 0, 0)
const point2 = new THREE.Vector3(0, 4, 0)
const curve = new THREE.LineCurve3(point1, point2);

function Scene() {
  const planeRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, THREE.DirectionalLightHelper)

  useFrame(({ camera, pointer }, delta) => {
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

      <Tube args={[curve, 10, 5, 50, false]}>
        <meshPhongMaterial color="#f3f3f3" wireframe/>
      </Tube>
    </>
  )
}

export default function DemoTwo17React() {
  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]} />

        <Scene />

        <MyHelper />
        <OrbitControls />
      </Canvas>

      <div>
        <ol>
          <li></li>
        </ol>
      </div>
    </div>
  )
}
