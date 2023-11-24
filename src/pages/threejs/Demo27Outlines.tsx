import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Outlines } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:41
 */
export default function Demo27Outlines() {
  return (
    <ThreeCanvasLayout>
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial />
        <Outlines thickness={0.1} color="hotpink" />
      </mesh>
    </ThreeCanvasLayout>
  )
}
