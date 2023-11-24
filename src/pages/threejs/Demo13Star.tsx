import React from 'react';
import { Plane, Stars } from "@react-three/drei";
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:07
 */
export default function Demo13Star() {
  return (
    <ThreeCanvasLayout>
      <Stars />
      <Plane rotation-x={Math.PI / 2} args={[100, 100, 4, 4]}>
        <meshBasicMaterial color="white" wireframe />
      </Plane>
      <axesHelper />
    </ThreeCanvasLayout>
  )
}

