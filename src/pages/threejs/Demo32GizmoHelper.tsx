import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { GizmoHelper, GizmoViewcube, GizmoViewport, useGLTF } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 16:21
 */
export default function Demo32GizmoHelper() {
  const { scene } = useGLTF('/assets/model/LittlestTokyo.glb')

  return (
    <ThreeCanvasLayout>
      <primitive object={scene} scale={0.01} />

      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        {/*<GizmoViewcube />*/}
        <GizmoViewport />
      </GizmoHelper>

    </ThreeCanvasLayout>
  )
}
