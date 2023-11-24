import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SimpleFactory from "@/components/modal/SimpleFactory";


/**
 * @author xu.pengfei
 * @date 2023/11/24 10:04
 */
export default function Demo06() {
  return (
    <div>
      <h1>use @react-three/drei load gltf</h1>

      <Canvas>
        <ambientLight />
        <Suspense>
          <SimpleFactory/>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
