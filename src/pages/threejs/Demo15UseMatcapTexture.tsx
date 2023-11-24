import React from 'react';
import { useGLTF, useMatcapTexture } from "@react-three/drei";
import { Mesh } from "three";
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";


function UseMatcapTexture() {
  const { nodes } = useGLTF('/assets/model/suzanne.glb', true) as any
  const [matcapTexture] = useMatcapTexture(111, 1024)

  return (
    <React.Suspense fallback={null}>
      <mesh geometry={(nodes.Suzanne as Mesh).geometry}>
        <meshMatcapMaterial matcap={matcapTexture} />
      </mesh>
    </React.Suspense>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:14
 */
export default function Demo15UseMatcapTexture() {
  return (
    <ThreeCanvasLayout>
      <UseMatcapTexture />
    </ThreeCanvasLayout>
  )
}
