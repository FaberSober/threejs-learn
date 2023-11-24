import React from 'react';
import { useGLTF, useNormalTexture } from "@react-three/drei";
import { Mesh, Vector2 } from "three";
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:23
 */
export default function Demo16UseNormalTexture() {
  const { nodes } = useGLTF('/assets/model/suzanne.glb', true) as any
  const repeat = 8; // texture repeat
  const scale = 4; // texture scale
  const [normalTexture] = useNormalTexture(3, {
    repeat: [repeat, repeat],
    anisotropy: 8,
  }); // texture index

  return (
    <ThreeCanvasLayout>
      <React.Suspense fallback={null}>
        <mesh geometry={(nodes.Suzanne as Mesh).geometry}>
          <meshStandardMaterial
            color="darkmagenta"
            roughness={0.9}
            metalness={0.1}
            normalScale={new Vector2(scale, scale)}
            normalMap={normalTexture}
          />
        </mesh>
      </React.Suspense>
    </ThreeCanvasLayout>
  )
}
