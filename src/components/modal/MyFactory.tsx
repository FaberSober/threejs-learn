import React from 'react';
import { GizmoHelper, GizmoViewport, Plane, useHelper } from "@react-three/drei";
import * as THREE from "three";


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
      <directionalLight ref={light1} color={0xffffff} intensity={1} position={[0,20,0]} castShadow/>

      {/* 点光源2 */}
      <directionalLight ref={light2} color={0xffffff} intensity={1} position={[1, 2, 4]} />

      {/* 平面 */}
      <Plane
        args={[50, 50]}
        material={new THREE.MeshPhongMaterial({color: 0xFFFFFF})}
        receiveShadow
        rotation={[Math.PI * -.5, 0, 0]}
      />

      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport />
      </GizmoHelper>
    </>
  )
}
