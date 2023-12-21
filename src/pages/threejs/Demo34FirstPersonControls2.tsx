import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { Box, FirstPersonControls, GizmoHelper, GizmoViewport, Sky, useGLTF } from "@react-three/drei";


function Model(props:any) {
  const gltf = useGLTF('/assets/model/simple-factory.gltf') as any
  // const gltf = useGLTF('/assets/model/001.glb') as any
  // const gltf = useGLTF('/assets/model/monkey.glb')
  // console.log('gltf', gltf)
  return <primitive {...props} object={gltf.scene} />
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:21
 */
export default function Demo34FirstPersonControls2() {
  return (
    <Canvas>
      {/* 灯光 */}
      <ambientLight intensity={0.8}/>
      <pointLight position={[0, 6, 0]} intensity={700} distance={10}/>

      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

      <Suspense>
        <Model />
      </Suspense>

      <FirstPersonControls
        activeLook
        enabled
        heightCoef={1}
        heightMax={1}
        heightMin={0}
        lookSpeed={0.05}
        // lookVertical
        movementSpeed={1}
        // verticalMax={3.141592653589793}
        // verticalMin={0}
      />
      <Box>
        <meshBasicMaterial wireframe/>
      </Box>

      {/* 轴显 */}
      <axesHelper />

      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        {/*<GizmoViewcube />*/}
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  )
}
