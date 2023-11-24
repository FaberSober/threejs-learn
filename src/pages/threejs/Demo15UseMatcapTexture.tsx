import React from 'react';
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { Mesh } from "three";
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:14
 */
export default function Demo15UseMatcapTexture() {
  const { nodes } = useGLTF('/assets/model/suzanne.glb', true) as any
  const [matcapTexture] = useMatcapTexture(111, 1024)

  return (
    <ThreeCanvasLayout>
      <React.Suspense fallback={null}>
        <mesh geometry={(nodes.Suzanne as Mesh).geometry}>
          <meshMatcapMaterial matcap={matcapTexture} />
        </mesh>
      </React.Suspense>
    </ThreeCanvasLayout>
  )
}
