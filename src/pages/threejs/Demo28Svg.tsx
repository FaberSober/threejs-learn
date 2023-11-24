import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Svg } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:46
 */
export default function Demo28Svg() {
  return (
    <ThreeCanvasLayout>
      <Svg
        fillMaterial={{
          wireframe: false
        }}
        position={[
          -70,
          70,
          0
        ]}
        scale={0.25}
        src="/assets/tiger.svg"
        strokeMaterial={{
          wireframe: false
        }}
      />
      <gridHelper
        args={[
          160,
          10
        ]}
        rotation={[
          1.5707963267948966,
          0,
          0
        ]}
      />
    </ThreeCanvasLayout>
  )
}
