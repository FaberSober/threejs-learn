import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Segment, Segments } from "@react-three/drei";

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:14
 */
export default function Demo21Segments() {
  return (
    <ThreeCanvasLayout>
      <Segments limit={6} lineWidth={2.0}>
        <Segment start={[0, 0, 0]} end={[10, 0, 0]} color={'red'} />
        <Segment start={[0, 0, 0]} end={[0, 10, 0]} color={'blue'} />
        <Segment start={[0, 0, 0]} end={[0, 0, 10]} color={'green'} />
        <Segment start={[0, 0, 0]} end={[-10, 0, 0]} color={[1, 0, 0]} />
        <Segment start={[0, 0, 0]} end={[0, -10, 0]} color={[0, 1, 0]} />
        <Segment start={[0, 0, 0]} end={[0, 0, -10]} color={[1, 1, 0]} />
      </Segments>
    </ThreeCanvasLayout>
  )
}
