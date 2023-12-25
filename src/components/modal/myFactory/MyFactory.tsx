import React from 'react';
import { Box, GizmoHelper, GizmoViewport, Plane, useHelper } from "@react-three/drei";
import * as THREE from "three";
import MyHelper from "@/components/modal/MyHelper";


interface MyFactoryProps {
  showHelper?: boolean;
}

/**
 * 简单工厂模型
 * @author xu.pengfei
 * @date 2023/12/25 09:37
 */
export default function MyFactory({ showHelper }: MyFactoryProps) {
  const light1 = React.useRef<THREE.DirectionalLight>(null!)
  const light2 = React.useRef<THREE.DirectionalLight>(null!)

  useHelper(showHelper && light1, THREE.DirectionalLightHelper)
  useHelper(showHelper && light2, THREE.DirectionalLightHelper)



  return (
    <>
      {/* 点光源1 */}
      <directionalLight ref={light1} color={0xffffff} intensity={1} position={[-20, 20, -20]} castShadow/>

      {/* 点光源2 */}
      <directionalLight ref={light2} color={0xffffff} intensity={1} position={[-20, 10, 20]}/>

      {/* 平面 */}
      <Plane
        args={[50, 50]}
        material={new THREE.MeshPhongMaterial({color: 0xFFFFFF})}
        receiveShadow
        rotation={[Math.PI * -0.5, 0, 0]}
      >

        {/* 厂房 */}
        <object3D>
          {/* 一层 */}
          <Box args={[1, 1, 1]} position={[15, 0, 2]} scale={[10, 20, 4]}>
            <meshPhongMaterial color={0xFF0000}/>
          </Box>
          {/* 二层 */}
          <Box args={[1, 1, 1]} position={[15, 0, 6]} scale={[10, 20, 4]}>
            <meshPhongMaterial color={0xFFFF00}/>
          </Box>
          {/* 三层 */}
          <Box args={[1, 1, 1]} position={[15, 0, 10]} scale={[10, 20, 4]}>
            <meshPhongMaterial color={0x00FF00}/>
          </Box>
        </object3D>

        {showHelper && <MyHelper/>}
      </Plane>


      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport/>
      </GizmoHelper>
    </>
  )
}
