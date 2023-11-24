import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


function Box(props:any) {
  // This reference will give us direct access to the mesh
  const meshRef = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => {
    // meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta
  })
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}


/**
 * @author xu.pengfei
 * @date 2023/11/14 10:17
 */
export default function Demo07() {
  const v = new Int8Array(3);
  v[0] = 2;
  v[1] = 2;
  v[2] = 2;

  return (
    <div>
      <h1>use @react-three/fiber</h1>
      <ol>
        <li>mouse hover change box color</li>
        <li>mouse click change box scale</li>
      </ol>

      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={500} distance={10} />
        <mesh position={[5,5,5]}>
          <sphereGeometry args={[0.5]} />
          <meshStandardMaterial color={'gold'} />
        </mesh>

        <Box position={[0, 0, 0]} />

        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={v.length / 3} array={v} itemSize={3} />
          <meshStandardMaterial color={'orange'} />
        </bufferGeometry>

        {/* 相机控制 */}
        <OrbitControls />
      </Canvas>
    </div>
  )
}
