import React from 'react';
import { Outlet } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:01
 */
export default function Inner() {
  return (
    <div>
      <Canvas shadows camera={{ position: [-5, 5, 5], fov: 75 }}>
        {/* 灯光 */}
        <ambientLight intensity={0.8} />
        <pointLight intensity={1} position={[0, 6, 0]} />
        {/* 控制 */}
        <OrbitControls makeDefault />
        {/* 轴显 */}
        <axesHelper />

        {/* 主体 */}
        <Outlet />
      </Canvas>
    </div>
  )
}
