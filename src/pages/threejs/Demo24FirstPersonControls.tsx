import React, { Suspense } from 'react';
import { Canvas } from "@react-three/fiber";
import { Box, FirstPersonControls, OrbitControls, useGLTF } from "@react-three/drei";


function Model(props:any) {
  const gltf = useGLTF('/assets/model/factory-demo.01.glb') as any
  // const gltf = useGLTF('/assets/model/simple-factory.gltf') as any
  // const gltf = useGLTF('/assets/model/001.glb') as any
  // const gltf = useGLTF('/assets/model/monkey.glb')
  console.log('gltf', gltf)
  gltf.scene.traverse((child:any)=>{
    console.log("name:",child?.name);
  })
  return <primitive {...props} object={gltf.scene} />
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:21
 */
export default function Demo24FirstPersonControls() {
  return (
    <Canvas>
      {/* 灯光 */}
      <ambientLight intensity={0.8}/>
      <pointLight position={[0, 6, 0]} intensity={700} distance={10}/>

      <FirstPersonControls
        activeLook={false}
        enabled
        heightCoef={1}
        heightMax={1}
        heightMin={0}
        lookSpeed={0.005}
        lookVertical
        movementSpeed={1}
        verticalMax={3.141592653589793}
        verticalMin={0}
      />
      <Box>
        <meshBasicMaterial wireframe/>
      </Box>

      <Suspense>
        <Model />
      </Suspense>

      {/* 轨道控制 */}
      <OrbitControls enableZoom={false} enablePan={false} />

      {/* 轴显 */}
      <axesHelper />
    </Canvas>
  )
}
