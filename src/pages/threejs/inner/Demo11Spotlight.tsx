import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Plane, SpotLight, useDepthBuffer } from "@react-three/drei";


/**
 * @author xu.pengfei
 * @date 2023/11/24 13:54
 */
export default function Demo11Spotlight() {
  const depthBuffer = useDepthBuffer({ size: 256 })

  return <>
    <SpotLight
      penumbra={0.5}
      depthBuffer={depthBuffer}
      position={[3, 2, 0]}
      intensity={0.5}
      angle={0.5}
      color="#ff005b"
      castShadow
    />
    <SpotLight
      penumbra={0.5}
      depthBuffer={depthBuffer}
      position={[-3, 2, 0]}
      intensity={0.5}
      angle={0.5}
      color="#0EEC82"
      castShadow
    />

    <mesh position-y={0.5} castShadow>
      <boxGeometry />
      <meshPhongMaterial />
    </mesh>

    <Plane receiveShadow rotation-x={-Math.PI / 2} args={[100, 100]}>
      <meshPhongMaterial />
    </Plane>
  </>
}
