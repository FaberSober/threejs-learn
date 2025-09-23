import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls, useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { useRef } from 'react'


export interface IndicatorProps {
  targetRef: React.RefObject<THREE.Group>
  name?: string
}

// ✅ 指示牌组件
export default function Indicator({ targetRef, name }: IndicatorProps) {
  const labelRef = useRef<THREE.Group>(null!)
  const lineRef = useRef<THREE.LineSegments>(null!)

  useFrame(() => {
    if (targetRef.current && labelRef.current && lineRef.current) {
      const targetPos = new THREE.Vector3()
      targetRef.current.getWorldPosition(targetPos)

      // 把指示牌放到目标点上方
      labelRef.current.position.copy(targetPos.clone().add(new THREE.Vector3(0, 0, 20)))

      // 更新连线（起点=指示牌，终点=目标点）
      if (lineRef.current.geometry instanceof THREE.BufferGeometry) {
        lineRef.current.geometry.setFromPoints([
          labelRef.current.position.clone(),
          targetPos
        ])
      }
    }
  })

  return (
    <>
      {/* 3D 空节点，作为指示牌容器 */}
      <group ref={labelRef}>
        <Html center>
          <div
            style={{
              background: 'rgba(0,0,0,0.7)',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              whiteSpace: 'nowrap',
            }}
          >
            {name}
          </div>
        </Html>
      </group>

      {/* 连线 */}
      <primitive object={new THREE.LineSegments(
        new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]),
        new THREE.LineBasicMaterial({ color: 'red', linewidth: 20 })
      )} ref={lineRef} />
    </>
  )
}
