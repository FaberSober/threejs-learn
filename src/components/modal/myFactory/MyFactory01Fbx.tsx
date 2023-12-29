import React from 'react';
import { useFBX } from "@react-three/drei";
import { GLTF } from "three-stdlib";


const modelUrl = '/assets/model/factory01/factory-base.01.fbx'
useFBX.preload(modelUrl)

/**
 * @author xu.pengfei
 * @date 2023/12/28 10:00
 */
export default function MyFactory01Fbx() {
  const fbx = useFBX(modelUrl)

  return (
    <>
      <primitive object={fbx}/>
    </>
  )
}
