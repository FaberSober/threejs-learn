import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Segment, SegmentObject, Segments } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";


function AnimatedSegments() {
  const ref = React.useRef<SegmentObject[]>([])
  useFrame(({ clock }) => {
    ref.current.forEach((r, i) => {
      const time = clock.elapsedTime
      const x = Math.sin((i / 5000) * Math.PI) * 10
      const y = Math.cos((i / 5000) * Math.PI) * 10
      const z = Math.cos((i * time) / 1000)
      r.start.set(x, y, z)
      r.end.set(x + Math.sin(time + i), y + Math.cos(time + i), z)
      r.color.setRGB(x / 10, y / 10, z)
    })
  })

  return (
    <Segments limit={10000} lineWidth={0.1}>
      {Array.from({ length: 10000 }).map((_, i) => (
        <Segment key={i} ref={(r) => (ref.current[i] = r)} color="orange" start={[0, 0, 0]} end={[0, 0, 0]} />
      ))}
    </Segments>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:14
 */
export default function Demo22AnimatedSegments() {

  return (
    <ThreeCanvasLayout>
      <AnimatedSegments />
    </ThreeCanvasLayout>
  )
}
