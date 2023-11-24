import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 11:22
 */
export default function Demo08() {
  return (
    <div>
      <h1>Environment</h1>

      <Canvas>
        <>
          <Environment
            background
            blur={0}
            preset="apartment"
          />
          <mesh>
            <torusKnotGeometry
              args={[
                1,
                0.5,
                128,
                32
              ]}
            />
            <meshStandardMaterial
              metalness={1}
              roughness={0}
            />
          </mesh>
          <OrbitControls autoRotate />
        </>
      </Canvas>
    </div>
  )
}
