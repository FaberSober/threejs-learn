import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Sky } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 11:22
 */
export default function Demo08() {
  return (
    <div>
      <h1>Sky</h1>

      <Canvas>
        <>
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
          <axesHelper />
          <OrbitControls  />
        </>
      </Canvas>
    </div>
  )
}
