import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
// import modelPath from './path/to/model.glb'

function Model(props:any) {
  const gltf = useGLTF('/assets/model/simple-factory.gltf') as any
  // const gltf = useGLTF('/assets/model/monkey.glb')
  // console.log('gltf', gltf)
  return <primitive {...props} object={gltf.scene} />
}


/**
 * @author xu.pengfei
 * @date 2023/11/14 10:34
 */
export default function Demo04() {
  return (
    <div>
      <h1>use @react-three/drei load gltf 12345</h1>

      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[-20, 20, 0]} intensity={2000} distance={1000} />
        <mesh position={[-20, 20, 0]}>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color={'gold'} />
        </mesh>

        <Suspense>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
