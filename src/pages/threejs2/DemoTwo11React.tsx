import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, PerspectiveCamera, Plane, Sphere } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";


const raycaster = new THREE.Raycaster();

function Scene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const raycasterRef = useRef<THREE.Raycaster>(null!);

  useFrame(({ camera, pointer }) => {
    // 使用相机和指针位置更新拾取光线
    raycaster.setFromCamera( pointer, camera );

    // 计算与拾取射线相交的对象
    const intersects = raycaster.intersectObject(planeRef.current);
    if ( intersects.length > 0 ) {
      // 更新指示小球的位置
      sphereRef.current.position.copy(intersects[0].point);
    }
  })

  return (
    <>
      <Plane ref={planeRef} args={[20, 20]} rotation-x={Math.PI * -0.5} />

      <Sphere
        ref={sphereRef}
        args={[0.5, 32, 32]}
        material-color={0xff0000}
        onClick={event => {
          console.log('Sphere.onClick', event)
        }}
      />

      <Box args={[1,1,1]} position={[0,1,0]} material-color={0x00FF00} />

      <raycaster ref={raycasterRef} />
    </>
  )
}

export default function DemoTwo11React() {
  return (
    <Canvas>
      <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1} />
      <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]} />

      <Scene />

      <OrbitControls />
      <MyHelper />
    </Canvas>
  )
}
