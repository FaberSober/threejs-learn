import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Box, FaceControls, FaceLandmarker } from "@react-three/drei";


/**
 * @author xu.pengfei
 * @date 2023/11/24 15:21
 */
export default function Demo23FaceControls() {
  return (
    <ThreeCanvasLayout>
      <color attach="background" args={['#303030']} />
      <axesHelper />

      <React.Suspense fallback={null}>
        <FaceLandmarker>
          <FaceControls />
        </FaceLandmarker>
      </React.Suspense>

      <Box args={[0.1, 0.1, 0.1]}>
        <meshStandardMaterial />
      </Box>
    </ThreeCanvasLayout>
  )
}
