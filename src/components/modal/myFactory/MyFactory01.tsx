import React from 'react';
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";


const gltfUrl = '/assets/model/factory01/factory-base-old.01.glb'
useGLTF.preload(gltfUrl)

/**
 * @author xu.pengfei
 * @date 2023/12/28 10:00
 */
export default function MyFactory01() {
  const { animations, scene } = useGLTF(gltfUrl) as GLTF

  return (
    <>
      <primitive object={scene}/>
    </>
  )
}
