import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { MathUtils } from "three";
import { useThree } from "@react-three/fiber";


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

function BasicPointsInstancesSelection() {
  const [points] = React.useState(() =>
    Array.from({ length: 100 }, (i) => [
      MathUtils.randFloatSpread(10),
      MathUtils.randFloatSpread(10),
      MathUtils.randFloatSpread(10),
    ])
  )

  const raycaster = useThree((state) => state.raycaster)
  React.useEffect(() => {
    if (raycaster.params.Points) {
      const old = raycaster.params.Points.threshold
      raycaster.params.Points.threshold = 0.175
      return () => {
        if (raycaster.params.Points) raycaster.params.Points.threshold = old
      }
    }
  }, [])

  return (
    <Points limit={points.length} range={points.length}>
      <PointMaterial transparent vertexColors size={15} sizeAttenuation={false} depthWrite={false} />
      {points.map((position, i) => (
        <PointEvent key={i} color="orange" position={position} />
      ))}
    </Points>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:10
 */
export default function Demo20BasicPointsInstancesSelection() {

  return (
    <ThreeCanvasLayout>
      <BasicPointsInstancesSelection />
    </ThreeCanvasLayout>
  )
}
