import React, { useState } from 'react';
import { Billboard, Box, Edges, GizmoHelper, GizmoViewport, Html, Outlines, Plane, Sphere, Text, useHelper } from "@react-three/drei";
import * as THREE from "three";
import MyHelper from "@/components/modal/MyHelper";
import { Button } from "antd";


interface MyFactoryProps {
  showHelper?: boolean;
}

/**
 * 简单工厂模型
 * @author xu.pengfei
 * @date 2023/12/25 09:37
 */
export default function MyFactory({ showHelper }: MyFactoryProps) {
  const [hoverBoxId, setHoverBoxId] = useState<1|2|3|undefined>()

  return (
    <object3D>
      {/* 平面 */}
      <Plane
        name="平面"
        args={[80, 80]}
        material={new THREE.MeshPhongMaterial({color: 0xFFFFFF})}
        receiveShadow
        rotation={[Math.PI * -0.5, 0, 0]}
        onPointerOver={(event) => event.stopPropagation()}
      />

      {/* 厂房 */}
      <object3D
        name="厂房"
        position={[0, 2, -15]} // 厂房整体位置
      >
        {/* 一层 */}
        <object3D
          name="一层"
          onPointerOver={(event) => {
            event.stopPropagation()
            // console.log('onPointerOver', 1)
            setHoverBoxId(1)
          }}
          onPointerOut={(event) => {
            // console.log('onPointerOut', 1)
            setHoverBoxId(undefined)
          }}
        >
          <Box
            args={[1, 1, 1]}
            scale={[20, 4, 10]}
            castShadow
          >
            <meshPhongMaterial color={0xFF0000}/>
            {/*<Outlines visible={hoverBoxId === 1} thickness={0.05} color="hotpink" screenspace={false} opacity={1} transparent={false} angle={Math.PI} />*/}
            <Edges visible={hoverBoxId === 1} scale={1.05} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={false} />
            </Edges>
          </Box>

          <Billboard follow={true} position={[10, 0, 5]}>
            {hoverBoxId === 1 && (
              <Html center transform={true} occlude={false}>
                <div style={{ background: '#FFFFFF', color: '#333', padding: 2, borderRadius: 2, cursor: 'pointer', fontSize: '30px' }} onClick={() => console.log('click div')}>
                  <span>一层</span>
                </div>
              </Html>
            )}
          </Billboard>
        </object3D>

        {/* 二层 */}
        <object3D
          name="二层"
          position={[0, 4, 0]}
          onPointerOver={(event) => {
            event.stopPropagation()
            // console.log('onPointerOver', 2)
            setHoverBoxId(2)
          }}
          onPointerOut={(event) => {
            // console.log('onPointerOut', 2)
            setHoverBoxId(undefined)
          }}
        >
          <Box
            args={[1, 1, 1]}
            scale={[20, 4, 10]}
            castShadow
          >
            <meshPhongMaterial color={0xFFFF00}/>
            <Edges visible={hoverBoxId === 2} scale={1.1} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={false} />
            </Edges>
            {/*<Outlines visible={hoverBoxId === 2} thickness={0.05} color="hotpink" screenspace={false} opacity={1} transparent={false} angle={Math.PI} />*/}
          </Box>

          <Billboard follow={true} position={[10, 0, 5]}>
            {hoverBoxId === 2 && (
              <Html center transform={true} occlude={false}>
                <div style={{ background: '#FFFFFF', color: '#333', padding: 2, borderRadius: 2, cursor: 'pointer', fontSize: '30px' }} onClick={() => console.log('click div')}>
                  <span>二层</span>
                </div>
              </Html>
            )}
          </Billboard>
        </object3D>

        {/* 三层 */}
        <object3D
          name="三层"
          position={[0, 8, 0]}
          onPointerOver={(event) => {
            event.stopPropagation()
            console.log('onPointerOver', 3)
            setHoverBoxId(3)
          }}
          onPointerOut={(event) => {
            // console.log('onPointerOut', 3)
            setHoverBoxId(undefined)
          }}
          castShadow
        >
          <Box
            args={[1, 1, 1]}
            scale={[20, 4, 10]}
          >
            <meshPhongMaterial color={0x00FF00}/>
            <Edges visible={hoverBoxId === 3} scale={1.1} renderOrder={1000}>
              <meshBasicMaterial transparent color="#333" depthTest={false} />
            </Edges>
            {/*<Outlines visible={hoverBoxId === 3} thickness={0.05} color="hotpink" screenspace={false} opacity={1} transparent={false} angle={Math.PI} />*/}
          </Box>

          <Billboard
            follow={true}
            position={[20, 0, 5]}
          >
            {hoverBoxId === 3 && (
              <Html center transform={false} occlude={false}>
                <div
                  style={{
                    background: '#fffefd',
                    color: '#413e1d',
                    padding: 12,
                    border: '1px solid #413e1d',
                    borderRadius: 4,
                    fontSize: '16px',
                    width: 200,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <span>三层</span>
                  <span>不随摄像头缩放，展示在屏幕之上</span>
                  <Button type="primary" onClick={() => console.log('click Antd Button')}>Hello</Button>
                </div>
              </Html>
            )}
          </Billboard>
        </object3D>
      </object3D>

      {/* 摄像头 */}
      <object3D
        position={[-12, 5, 12]}
        name="摄像头"
        onPointerOver={(event) => event.stopPropagation()}
      >
        {/* 柱子 */}
        <Box args={[1, 1, 1]} scale={[1, 10, 1]} material-color={0x0000ff} castShadow />
        {/* 摄像头 */}
        <Sphere position={[0,5,0]} material-color={0xff0000} castShadow />

        {/* 标志广告牌 */}
        <Billboard follow={true} position={[0, 6.5, 0]}>
          {/*<Plane args={[10,10]} material-color="red" />*/}
          {/*<Text fontSize={1} color={'#EC2D2D'}>摄像头</Text>*/}
          <Html center transform occlude>
            <div style={{ background: '#FFFFFF', color: '#333', padding: 2, borderRadius: 2, cursor: 'pointer', fontSize: '30px' }} onClick={() => console.log('click div')}>
              <span>摄像头</span>
            </div>
          </Html>
        </Billboard>
      </object3D>

      {showHelper && <MyHelper/>}
    </object3D>
  )
}
