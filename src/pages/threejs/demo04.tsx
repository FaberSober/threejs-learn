import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Sky, GizmoHelper, GizmoViewcube, GizmoViewport, Outlines } from '@react-three/drei'
// import modelPath from './path/to/model.glb'

function Model(props:any) {
  const gltf = useGLTF('/assets/model/factory-demo.01.glb') as any
  const { nodes, materials } = gltf
  // const gltf = useGLTF('/assets/model/simple-factory.gltf') as any
  // const gltf = useGLTF('/assets/model/001.glb') as any
  // const gltf = useGLTF('/assets/model/monkey.glb')
  // console.log('gltf', gltf)
  // return <primitive {...props} object={gltf.scene} />

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes['地面'].geometry} material={materials['材质.地面']} scale={6} />
      <mesh geometry={nodes['厂房1'].geometry} material={materials['材质.厂房1']} position={[0, 1, -4]}>
        <mesh geometry={nodes['立柱1'].geometry} material={materials['材质.立柱1']} position={[0, 1, 0]} scale={[0.322, 1, 0.304]} />
      </mesh>
      <mesh geometry={nodes['外立柱1'].geometry} material={materials['材质.外立柱1']} position={[-4.191, 1, -1.921]} scale={[0.31, 1, 0.345]} />
    </group>
  )
}


/**
 * @author xu.pengfei
 * @date 2023/11/14 10:34
 */
export default function Demo04() {
  return (
    <div>
      <h1>use @react-three/drei load gltf 12345</h1>

      <Canvas shadows camera={{ position: [20, 10, 10], fov: 75 }} >
        <ambientLight color={'white'} intensity={0.5} />
        {/*<directionalLight color={'white'} intensity={0.5} />*/}
        <hemisphereLight args={['white', 'black']} intensity={2} />
        {/*<pointLight position={[-20, 20, 0]} intensity={2000} distance={1000} />*/}
        {/*<mesh position={[-20, 20, 0]}>*/}
        {/*  <sphereGeometry args={[0.5]} />*/}
        {/*  <meshStandardMaterial color={'gold'} />*/}
        {/*</mesh>*/}

        <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

        <Suspense>
          <Model />
        </Suspense>
        <OrbitControls />

        <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
          {/*<GizmoViewcube />*/}
          <GizmoViewport />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}
