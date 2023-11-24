import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { MathUtils } from "three";
import { useThree } from "@react-three/fiber";
import { Point, Points } from "@react-three/drei";
import '@/components/material/MyPointsMaterial'


function PointEvent({ color, ...props }:any) {
  const [hovered, setHover] = React.useState(false)
  const [clicked, setClick] = React.useState(false)
  return (
    <Point
      {...props}
      color={clicked ? 'hotpink' : hovered ? 'red' : color}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
      onClick={(e) => (e.stopPropagation(), setClick((state) => !state))}
    />
  )
}

function BasicPointsInstances() {
  const [points] = React.useState(() => {
    const n = 10
    return Array.from({ length: n * n * n }, () => {
      return [MathUtils.randFloatSpread(4), MathUtils.randFloatSpread(4), MathUtils.randFloatSpread(4)]
    })
  })
  const raycaster = useThree((state) => state.raycaster)
  React.useEffect(() => {
    if (raycaster.params.Points) {
      const old = raycaster.params.Points.threshold
      raycaster.params.Points.threshold = 0.05
      return () => {
        if (raycaster.params.Points) raycaster.params.Points.threshold = old
      }
    }
  }, [])

  return (
    <>
      <Points>
        {points.map((p, index) => (
          <PointEvent
            key={index}
            position={p as [number, number, number]}
            color={p as [number, number, number]}
            size={Math.random() * 0.5 + 0.1}
          />
        ))}
        {/* @ts-ignore */}
        <myPointsMaterial />
      </Points>
    </>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:04
 */
export default function Demo19BasicPointsInstances() {
  return (
    <ThreeCanvasLayout>
      <BasicPointsInstances />
    </ThreeCanvasLayout>
  )
}
