import React from 'react';
import { Canvas } from "@react-three/fiber";
import { Box, FirstPersonControls } from "@react-three/drei";


/**
 * @author xu.pengfei
 * @date 2023/11/24 15:21
 */
export default function Demo24FirstPersonControls() {
  return (
    <Canvas>
      {/* 灯光 */}
      <ambientLight intensity={0.8}/>
      <pointLight position={[0, 6, 0]} intensity={700} distance={10}/>

      <FirstPersonControls
        activeLook
        enabled
        heightCoef={1}
        heightMax={1}
        heightMin={0}
        lookSpeed={0.005}
        lookVertical
        movementSpeed={1}
        verticalMax={3.141592653589793}
        verticalMin={0}
      />
      <Box>
        <meshBasicMaterial wireframe/>
      </Box>

      {/* 轴显 */}
      <axesHelper />
    </Canvas>
  )
}
