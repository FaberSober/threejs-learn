import React, { useState } from 'react';
import { Billboard, Box, Edges, GizmoHelper, GizmoViewport, Outlines, Plane, Sphere, Text, useHelper } from "@react-three/drei";
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

  const [hoverBoxId, setHoverBoxId] = useState<1|2|3|undefined>()

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
        <object3D
          position={[15, 0, 2]} // 厂房整体位置
        >
          {/* 一层 */}
          <Box
            args={[1, 1, 1]}
            scale={[10, 20, 4]}
            onPointerOver={(event) => {
              console.log('onPointerOver', 1)
              setHoverBoxId(1)
            }}
            onPointerOut={(event) => {
              console.log('onPointerOut', 1)
              setHoverBoxId(undefined)
            }}
          >
            <meshPhongMaterial color={0xFF0000}/>
            <Edges visible={hoverBoxId === 1} scale={1.05} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={false} />
            </Edges>
            {/*<Outlines visible={hoverBoxId === 1} thickness={0.05} color="hotpink" screenspace={false} opacity={1} transparent={false} angle={Math.PI} />*/}
          </Box>
          {/* 二层 */}
          <Box
            args={[1, 1, 1]}
            position={[0, 0, 4]}
            scale={[10, 20, 4]}
            onPointerOver={(event) => {
              console.log('onPointerOver', 2)
              setHoverBoxId(2)
            }}
            onPointerOut={(event) => {
              console.log('onPointerOut', 2)
              setHoverBoxId(undefined)
            }}
          >
            <meshPhongMaterial color={0xFFFF00}/>
            <Edges visible={hoverBoxId === 2} scale={1.1} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={false} />
            </Edges>
            {/*<Outlines visible={hoverBoxId === 2} thickness={0.05} color="hotpink" screenspace={false} opacity={1} transparent={false} angle={Math.PI} />*/}
          </Box>
          {/* 三层 */}
          <Box
            args={[1, 1, 1]}
            position={[0, 0, 8]}
            scale={[10, 20, 4]}
            onPointerOver={(event) => {
              console.log('onPointerOver', 3)
              setHoverBoxId(3)
            }}
            onPointerOut={(event) => {
              console.log('onPointerOut', 3)
              setHoverBoxId(undefined)
            }}
          >
            <meshPhongMaterial color={0x00FF00}/>
            <Edges visible={hoverBoxId === 3} scale={1.1} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={false} />
            </Edges>
            {/*<Outlines visible={hoverBoxId === 3} thickness={0.05} color="hotpink" screenspace={false} opacity={1} transparent={false} angle={Math.PI} />*/}
          </Box>

        </object3D>

        {/* 摄像头 */}
        <object3D position={[-12, 12, 5]}>
          {/* 柱子 */}
          <Box args={[1, 1, 1]} scale={[1, 1, 10]} material-color={0x0000ff} />
          {/* 摄像头 */}
          <Sphere position={[0,0,5]} material-color={0xff0000} />
        </object3D>

        {showHelper && <MyHelper/>}
      </Plane>


      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport/>
      </GizmoHelper>
    </>
  )
}
