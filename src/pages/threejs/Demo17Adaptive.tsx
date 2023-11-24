import React from 'react';
import { AdaptiveDpr, AdaptiveEvents, OrbitControls, useGLTF } from "@react-three/drei";
import { Material, Mesh } from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";


interface ArcherGLTF extends GLTF {
  materials: { material_0: Material }
  nodes: Record<'mesh_0' | 'mesh_1' | 'mesh_2', Mesh>
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:30
 */
export default function Demo17Adaptive() {
  const {
    nodes: { mesh_0, mesh_1, mesh_2 },
    materials: { material_0 },
  } = useGLTF('/assets/model/archer.glb') as ArcherGLTF

  return (
    <Canvas shadows camera={{ position: [0, 0, 30], fov: 50 }} performance={{ min: 1 }}>
      <React.Suspense fallback={null}>
        <group dispose={null}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <group position={[0, 0, 2]}>
              <mesh castShadow receiveShadow material={material_0} geometry={mesh_0.geometry} />
              <mesh castShadow receiveShadow material={material_0} geometry={mesh_1.geometry} />
              <mesh castShadow receiveShadow material={material_0} geometry={mesh_2.geometry} />
            </group>
          </group>
        </group>
      </React.Suspense>

      <directionalLight
        intensity={1}
        position={[10, 10, 5]}
        shadow-mapSize-width={64}
        shadow-mapSize-height={64}
        castShadow
        shadow-bias={-0.001}
      />
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />

      <OrbitControls regress />
    </Canvas>
  )
}
