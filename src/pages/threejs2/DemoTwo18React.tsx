import React, { useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Plane, Tube, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";


const point1 = new THREE.Vector3(0, 0, 0)
const point2 = new THREE.Vector3(0, 4, 0)
const curve = new THREE.LineCurve3(point1, point2);

const vertexShader = `
  varying vec4 vPosition;
  void main() {
    vPosition = modelMatrix * vec4(position,1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const fragmentShader = `
  uniform vec3 uColor; // 光墙半径
  uniform vec3 uMax;
  uniform vec3 uMin;
  uniform mat4 modelMatrix; // 世界矩阵
  varying vec4 vPosition; // 接收顶点着色传递进来的位置数据

  void main() {
    // 转世界坐标
    vec4 uMax_world = modelMatrix * vec4(uMax,1.0);
    vec4 uMin_world = modelMatrix * vec4(uMin,1.0);
    // 根据像素点世界坐标的y轴高度,设置透明度
    float opacity =1.0 - (vPosition.y - uMin_world.y) / (uMax_world.y -uMin_world.y);

    gl_FragColor = vec4( uColor, opacity);
  }
`

function Scene() {
  const planeRef = useRef<THREE.Mesh>(null!);
  const tubeRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  useHelper(lightRef, THREE.DirectionalLightHelper)

  useHelper(tubeRef, THREE.BoxHelper, 'cyan')

  useFrame(({ camera, pointer }, delta) => {
  })

  return (
    <>
      <directionalLight ref={lightRef} position={[0, 15, 15]} color={0xFFFFFF} intensity={1} castShadow shadow-mapSize={[4096, 4096]}>
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>
      <ambientLight intensity={0.8}/>
      <Plane
        ref={planeRef}
        args={[20, 20]}
        rotation-x={Math.PI * -0.5}
        receiveShadow
      >
        <meshPhongMaterial color={0xEEEEEE}/>
      </Plane>

      <Tube
        ref={tubeRef}
        args={[curve, 10, 5, 50, false]}
        onUpdate={self => {
          if (self.geometry.boundingBox) {
            const min = self.geometry.boundingBox?.min;
            const max = self.geometry.boundingBox?.max;
            self.material.uniforms.uMin.value = min;
            self.material.uniforms.uMax.value = max;
          }
        }}
      >
        {/*<meshPhongMaterial color="#f3f3f3" wireframe/>*/}
        <shaderMaterial
          // args={[
          //
          // ]}
          opacity={0.4}
          transparent={true}
          side={THREE.DoubleSide}
          depthTest={false}
          uniforms={{
            uMax: {
              value: new THREE.Vector3(5, 5, 5)
            },
            uMin: {
              value: new THREE.Vector3(-5, 0, -5)
            },
            uColor: {
              value: new THREE.Color('#0a85ff')
            },
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </Tube>
    </>
  )
}

export default function DemoTwo17React() {
  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]} />

        <Scene />

        <MyHelper />
        <OrbitControls />
      </Canvas>

      <div>
        <ol>
          <li></li>
        </ol>
      </div>
    </div>
  )
}
