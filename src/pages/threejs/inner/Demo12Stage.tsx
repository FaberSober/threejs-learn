import React from 'react';
import { Sphere, Stage } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:01
 */
export default function Demo12Stage() {
  return (
    <React.Suspense fallback={null}>
      <color attach="background" args={['white']} />
      <Stage intensity={1} environment='apartment' preset='rembrandt'>
        <Sphere args={[1, 64, 64]}>
          <meshStandardMaterial roughness={0} color="royalblue" />
        </Sphere>
      </Stage>
    </React.Suspense>
  )
}
