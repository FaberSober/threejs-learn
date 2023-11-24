import React from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Outlet } from "react-router-dom";


export interface ThreeCanvasLayoutProps {
  children?: React.ReactNode;
  light?: boolean;
  control?: boolean;
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:40
 */
export default function ThreeCanvasLayout({children, light = true, control = true}: ThreeCanvasLayoutProps) {
  return (
    <Canvas shadows camera={{ position: [-5, 5, 5], fov: 75 }}>
      {/* 灯光 */}
      {light && <ambientLight intensity={0.8} />}
      {light && <pointLight position={[0, 6, 0]} intensity={700} distance={10} />}

      {/*<directionalLight*/}
      {/*  intensity={11}*/}
      {/*  position={[10, 10, 5]}*/}
      {/*  shadow-mapSize-width={64}*/}
      {/*  shadow-mapSize-height={64}*/}
      {/*  castShadow*/}
      {/*  shadow-bias={-0.001}*/}
      {/*/>*/}
      {/* 控制 */}
      {control && <OrbitControls makeDefault />}

      {/* 轴显 */}
      <axesHelper />

      {/* 主体 */}
      {children}
    </Canvas>
  )
}
