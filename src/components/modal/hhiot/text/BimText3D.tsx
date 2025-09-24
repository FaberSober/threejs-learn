import React from 'react';
import type { Object3DNode } from "@react-three/fiber/dist/declarations/src/three-types";
import { Plane, Text3D } from "@react-three/drei";


export interface BimText3DProps extends Object3DNode<any, any> {
  text: string;
  width?: number;
}

/**
 * @author xu.pengfei
 * @date 2024/3/27 16:53
 */
export default function BimText3D({ text, width = 10, ...props }: BimText3DProps) {
  return (
    <group {...props} dispose={null}>
      <Plane args={[width, 3.5]} position={[width / 2, 1.1, 0]}>
        <meshPhongMaterial color="red"/>
      </Plane>
      <Text3D font="/file/fonts/FZYaoTi_Regular.json" height={0.1} position={[1, 0.3, 0]} size={2}>
        {text}
        <meshBasicMaterial color={0xFFFFFF}/>
      </Text3D>
    </group>
  )
}
