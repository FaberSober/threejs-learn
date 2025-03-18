import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import Monkey from '@/components/modal/Monkey'
import Elec220v from '@/components/modal/Elec220v'
import House01 from '@/components/modal/House01'
// import House02 from '@/components/modal/House02'
import House02b from '@/components/modal/House02b'
import House03 from '@/components/modal/House03'


/**
 * @author xu.pengfei
 * @date 2023/11/24 10:04
 */
export default function Demo05() {
  return (
    <div>
      <h1>use @react-three/drei load glb</h1>

      <Canvas shadows camera={{ position: [10, 10, 10], fov: 75 }}>
        {/*<ambientLight />*/}
        <pointLight position={[10, 10, 10]} intensity={1000} distance={1000} />
        <Suspense>
          {/* <Monkey /> */}
          {/* <Elec220v /> */}
          {/* <House01 /> */}
          {/* <House02 /> */}
          {/* <House02b /> */}
          <House03 />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  )
}
