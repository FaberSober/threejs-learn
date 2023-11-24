import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
// import modelPath from './path/to/model.glb'

function Model(props:any) {
  // const gltf = useGLTF('/assets/model/simple-factory.gltf')
  const gltf = useGLTF('/assets/model/monkey.glb')
  return <primitive {...props} object={gltf.scene} />
}


/**
 * @author xu.pengfei
 * @date 2023/11/14 10:34
 */
export default function demo04() {
  return (
    <div>
      <h1>use @react-three/drei load gltf</h1>

      <Canvas>
        <ambientLight />
        <Suspense>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
