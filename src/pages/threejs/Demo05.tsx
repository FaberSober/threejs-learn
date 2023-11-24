import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import Monkey from '@/components/modal/Monkey'


/**
 * @author xu.pengfei
 * @date 2023/11/24 10:04
 */
export default function Demo05() {
  return (
    <div>
      <h1>use @react-three/drei load glb</h1>

      <Canvas>
        {/*<ambientLight />*/}
        <pointLight position={[10, 10, 10]} intensity={500} distance={1000} />
        <Suspense>
          <Monkey />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
