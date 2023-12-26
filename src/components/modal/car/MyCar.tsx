import React, { useRef } from 'react';
import { Box, Cylinder } from "@react-three/drei";
import { Object3DProps } from "@react-three/fiber/dist/declarations/src/three-types";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";


const carWidth = 4;
const carHeight = 1;
const carLength = 8;

const wheelRadius = 1;
const wheelThickness = .5;
const wheelSegments = 6;


export interface MyCarProps extends Object3DProps {
  anim?: 'Move' | 'Stop'
}

/**
 * @author xu.pengfei
 * @date 2023/12/26 16:06
 */
export default function MyCar({anim, ...props}: MyCarProps) {
  return (
    <object3D {...props}>
      <Box args={[carWidth, carHeight, carLength]} material-color="grey" castShadow position={[0, 1.4, 0]}>
        {/*<meshPhongMaterial color="grey" />*/}

        {/* 4 wheels */}
        <Wheel position={[-carWidth / 2 - wheelThickness / 2, -carHeight / 2,  carLength / 3]} moving={anim === 'Move'} />
        <Wheel position={[ carWidth / 2 + wheelThickness / 2, -carHeight / 2,  carLength / 3]} moving={anim === 'Move'} />
        <Wheel position={[-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3]} moving={anim === 'Move'} />
        <Wheel position={[ carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3]} moving={anim === 'Move'} />
      </Box>
    </object3D>
  )
}



function Wheel({moving = false, position}: {
  position: [number, number, number],
  moving: boolean,
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const time =  clock.getElapsedTime();
    // 滚动车轮
    if (moving) {
      ref.current.rotation.x = time * 3;
    }
  })

  return (
    <Cylinder
      ref={ref}
      castShadow
      position={position}
      rotation={[0, 0, Math.PI * .5]}
      args={[wheelRadius, wheelRadius, wheelThickness, wheelSegments]}
    >
      <meshPhongMaterial color={0x888888}/>
    </Cylinder>
  )
}
