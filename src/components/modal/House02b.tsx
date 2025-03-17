import React from 'react';
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";


// const gltfUrl = '/assets/model/factory01/factory-base-old.01.glb'
const gltfUrl = '/assets/model/house.02.glb'
useGLTF.preload(gltfUrl)

/**
 * @author xu.pengfei
 * @date 2023/12/28 10:00
 */
export default function House02b() {
  const { animations, scene } = useGLTF(gltfUrl) as GLTF

  return (
    <>
      <primitive object={scene}/>
    </>
  )
}
