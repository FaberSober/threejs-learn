import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, TransformControls } from '@react-three/drei'
import * as THREE from 'three';
import { Button } from 'antd';


/**
 * @author xu.pengfei
 * @date 2025-10-15 15:34:47
 */
export default function Demo37TransformControls() {
  const groupRef = useRef<THREE.Group>(null!)
  const [mode, setMode] = useState<'translate' | 'rotate' | 'scale'>('translate')


  return (
    <div>
      <h1>使用TransformControls可拖拽操作手柄</h1>
      <ol>
        <li>使用TransformControls可拖拽操作手柄</li>
      </ol>

      {/* 控制面板 */}
      <div >
        <Button onClick={() => setMode('translate')}>移动</Button>
        <Button onClick={() => setMode('rotate')}>旋转</Button>
        <Button onClick={() => setMode('scale')}>缩放</Button>
      </div>

      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <gridHelper args={[10, 10]} />
        <axesHelper args={[5]} />

        {/* 可拖拽操作手柄 */}
        <TransformControls
          object={groupRef}
          mode={mode}
          onObjectChange={(e) => {
            // 这里可以获取最新的位置信息
            const obj = groupRef.current
            console.log('position:', obj.position)
            console.log('rotation:', obj.rotation)
            console.log('scale:', obj.scale)
          }}
        />

        {/* Orbit 控制相机移动（可与TransformControls共用） */}
        <OrbitControls makeDefault />

        {/* 被控制的Group */}
        <group ref={groupRef} position={[0, 1, 0]}>
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="orange" />
          </mesh>
        </group>
      </Canvas>
    </div>
  )
}
