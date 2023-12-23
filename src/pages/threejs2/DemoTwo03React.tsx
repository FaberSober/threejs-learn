import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import {
  Box,
  CameraControls,
  Cylinder,
  FirstPersonControls,
  GizmoHelper,
  GizmoViewport,
  Line,
  MeshPortalMaterial,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  Sphere,
  useHelper
} from "@react-three/drei";
import { useControls } from 'leva'
import { DirectionalLightShadow } from "three/src/lights/DirectionalLightShadow";
import { CameraHelper } from "three";
import { Radio, Space } from "antd";



interface MyHelperProps {
  unit?: number,
  helperVisible?: boolean,
}

function MyHelper({ unit = 10, helperVisible }: MyHelperProps) {
  return (
    <>
      <gridHelper visible={helperVisible} args={[unit, unit]} renderOrder={1} onUpdate={self => self.material.depthTest = false}/>
      <axesHelper visible={helperVisible} renderOrder={2} onUpdate={self => self.material.depthTest = false}/>
    </>
  )
}

let time = 0;

const targetPosition = new THREE.Vector3();
const tankWorldPosition = new THREE.Vector3();
const tankPosition = new THREE.Vector2();
const tankTarget = new THREE.Vector2();


// Create a sine-like wave
const curve = new THREE.SplineCurve( [
  new THREE.Vector2( -10, 0 ),
  new THREE.Vector2( -5, 5 ),
  new THREE.Vector2( 0, 0 ),
  new THREE.Vector2( 5, -5 ),
  new THREE.Vector2( 10, 0 ),
  new THREE.Vector2( 5, 10 ),
  new THREE.Vector2( -5, 10 ),
  new THREE.Vector2( -10, -10 ),
  new THREE.Vector2( -15, -8 ),
  new THREE.Vector2( -10, 0 ),
] );
const points = curve.getPoints( 50 );

function Curve() {
  return (
    <Line
      points={points}
      position={[0,0.05,0]}
      rotation={[Math.PI * .5, 0, 0]}
      color={0xff0000}
    />
  )
}

function TargetOrbit() {
  const {cameraType} = useContext(ConfigLayoutContext)
  const targetOrbitRef = useRef<THREE.Object3D>(null!)
  const targetBobRef = useRef<THREE.Object3D>(null!)
  const targetMeshRef = useRef<THREE.Mesh>(null!)
  const targetMaterialRef = useRef<THREE.MeshPhongMaterial>(null!)

  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  // useHelper(camera, CameraHelper)

  useFrame((state, delta, frame) => {
    // move target
    targetOrbitRef.current.rotation.y = time * .27;
    targetBobRef.current.position.y = Math.sin(time * 2) * 4;
    targetMeshRef.current.rotation.x = time * 7;
    targetMeshRef.current.rotation.y = time * 13;
    targetMaterialRef.current.emissive.setHSL(time * 10 % 1, 1, .25);
    targetMaterialRef.current.color.setHSL(time * 10 % 1, 1, .25);

    // get target world position
    targetMeshRef.current.getWorldPosition(targetPosition);

    // make the targetCameraPivot look at the at the tank
    camera.current.lookAt(tankWorldPosition);
  })

  return (
    // targetOrbit
    <object3D ref={targetOrbitRef}>
      {/* targetElevation */}
      <object3D position={[0,8,carLength * 2]}>
        {/* targetBob */}
        <object3D ref={targetBobRef}>
          {/* targetMesh */}
          <Sphere ref={targetMeshRef} castShadow args={[.5, 6, 3]}>
            <meshPhongMaterial ref={targetMaterialRef} color={0x00FF00} flatShading/>
          </Sphere>

          {/* targetCameraPivot */}
          <object3D>
            {/* turretCamera */}
            <PerspectiveCamera
              ref={camera}
              makeDefault={cameraType === CameraType.Target}
              fov={75}
              position={[0, 1, -2]}
              rotation={[0, Math.PI, 0]}
            />
          </object3D>
        </object3D>
      </object3D>
    </object3D>
  )
}

const carWidth = 4;
const carHeight = 1;
const carLength = 8;

const wheelRadius = 1;
const wheelThickness = .5;
const wheelSegments = 6;

const domeRadius = 2;
const domeWidthSubdivisions = 12;
const domeHeightSubdivisions = 12;
const domePhiStart = 0;
const domePhiEnd = Math.PI * 2;
const domeThetaStart = 0;
const domeThetaEnd = Math.PI * .5;

const turretWidth = .1;
const turretHeight = .1;
const turretLength = carLength * .75 * .2;

const bodyMaterial = new THREE.MeshPhongMaterial({color: 0x6688AA});

function Turret() {
  const {cameraType} = useContext(ConfigLayoutContext)
  const turretPivotRef = useRef<THREE.Object3D>(null!)

  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  // useHelper(camera, CameraHelper)

  useFrame(() => {
    // face turret at target
    turretPivotRef.current.lookAt(targetPosition);

    // make the turretCamera look at target
    camera.current.lookAt(targetPosition);
  })

  return (
    <object3D ref={turretPivotRef} scale={[5, 5, 5]} position={[0, .5, 0]}>
      <Box castShadow position={[0,0,turretLength * .5]} args={[turretWidth, turretHeight, turretLength]} material={bodyMaterial}>
        {/* turretCamera */}
        <PerspectiveCamera
          ref={camera}
          makeDefault={cameraType === CameraType.Turret}
          fov={75}
          position={[0, .75 * .2, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </Box>
    </object3D>
  )
}

function Dome() {
  return (
    <Sphere
      castShadow
      position={[0, .5, 0]}
      args={[domeRadius, domeWidthSubdivisions, domeHeightSubdivisions, domePhiStart, domePhiEnd, domeThetaStart, domeThetaEnd]}
      material={bodyMaterial}
    />
  )
}

function Wheel({position}: {
  position: [number, number, number]
}) {
  const ref = useRef<THREE.Mesh>(null!)

  useFrame(() => {
    // 滚动车轮
    ref.current.rotation.x = time * 3;
  })

  return (
    <Cylinder
      ref={ref}
      castShadow
      position={position}
      rotation={[0, 0, Math.PI * .5]}
      args={[wheelRadius, wheelRadius, wheelThickness, wheelSegments]}
    >
      <meshPhongMaterial color={0x888888}/>
    </Cylinder>
  )
}

function Tank() {
  const {cameraType} = useContext(ConfigLayoutContext)
  const tankRef = useRef<THREE.Object3D>(null!)

  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  useHelper(camera, CameraHelper)

  useFrame(() => {
    // move tank
    const tankTime = time * .05;

    curve.getPointAt(tankTime % 1, tankPosition);
    curve.getPointAt((tankTime + 0.01) % 1, tankTarget);
    tankRef.current.position.set(tankPosition.x, 0, tankPosition.y);
    tankRef.current.lookAt(tankTarget.x, 0, tankTarget.y);

    // get tank world position
    tankRef.current.getWorldPosition(tankWorldPosition);

    // tank camera
    camera.current.lookAt(tankWorldPosition.x, tankWorldPosition.y, tankWorldPosition.z);
  })

  return (
    <object3D ref={tankRef}>
      {/* body */}
      <Box args={[carWidth, carHeight, carLength]} position={[0, 1.4, 0]} castShadow>
        <meshPhongMaterial color={0x6688AA}/>

        {/* tankCamera */}
        <PerspectiveCamera
          ref={camera}
          makeDefault={cameraType === CameraType.Tank}
          fov={75}
          near={1}
          far={10}
          position={[0, 3, -6]}
          rotation={[0, Math.PI, 0]}
        />

        {/* 6 wheels */}
        <Wheel position={[-carWidth / 2 - wheelThickness / 2, -carHeight / 2,  carLength / 3]} />
        <Wheel position={[ carWidth / 2 + wheelThickness / 2, -carHeight / 2,  carLength / 3]} />
        <Wheel position={[-carWidth / 2 - wheelThickness / 2, -carHeight / 2, 0]} />
        <Wheel position={[ carWidth / 2 + wheelThickness / 2, -carHeight / 2, 0]} />
        <Wheel position={[-carWidth / 2 - wheelThickness / 2, -carHeight / 2, -carLength / 3]} />
        <Wheel position={[ carWidth / 2 + wheelThickness / 2, -carHeight / 2, -carLength / 3]} />

        {/* 圆顶 */}
        <Dome />

        {/* 炮筒 */}
        <Turret />
      </Box>


      <MyHelper helperVisible />
    </object3D>
  )
}

function MyScene() {
  const {cameraType} = useContext(ConfigLayoutContext)
  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  // useHelper(camera, CameraHelper)

  const shadow = new DirectionalLightShadow();
  shadow.mapSize.set(1024, 1024);

  const d = 50;
  shadow.camera.left = -d;
  shadow.camera.right = d;
  shadow.camera.top = d;
  shadow.camera.bottom = -d;
  shadow.camera.near = 1;
  shadow.camera.far = 50;
  shadow.bias = 0.001;

  useFrame((state, delta, frame) => {
    time += delta
  })

  return (
    <>
      <PerspectiveCamera
        ref={camera}
        makeDefault={cameraType === CameraType.Global}
        fov={40}
        position={[8, 4, 10]}
        onUpdate={self => {
          self.position.set(8, 4, 10).multiplyScalar(3);
          self.lookAt(0, 0, 0);
        }}
      />

      {/* 点光源1 */}
      <directionalLight color={0xffffff} intensity={1} position={[0,20,0]} castShadow shadow={shadow} />

      {/* 点光源2 */}
      <directionalLight color={0xffffff} intensity={1} position={[1, 2, 4]} />

      <Plane
        args={[50, 50]}
        material={new THREE.MeshPhongMaterial({color: 0xCC8866})}
        receiveShadow
        rotation={[Math.PI * -.5,0,0]}
      />

      <Tank />

      <TargetOrbit />

      <Curve />
    </>
  )
}

enum CameraType {
  Global,
  Tank,
  Turret,
  Target
}

export interface ConfigLayoutContextProps {
  cameraType: CameraType;
}

export const ConfigLayoutContext = createContext<ConfigLayoutContextProps>({} as any);

export default function DemoTwo03React() {
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.Global)

  const contextValue: ConfigLayoutContextProps = {
    cameraType,
  }

  return (
    <ConfigLayoutContext.Provider value={contextValue}>
      <div>
        <Canvas
          onCreated={state => {
            state.gl.setClearColor(0xAAAAAA)
            state.gl.shadowMap.enabled = true;
          }}
        >
          <MyScene />

          <FirstPersonControls  />

          {/*<OrbitControls />*/}
          <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
            <GizmoViewport />
          </GizmoHelper>
        </Canvas>

        <Space style={{marginTop: 12}}>
          <div>镜头选择：</div>
          <Radio.Group value={cameraType} onChange={e => setCameraType(e.target.value)} buttonStyle="solid">
            <Radio.Button value={CameraType.Global}>全局</Radio.Button>
            <Radio.Button value={CameraType.Tank}>坦克</Radio.Button>
            <Radio.Button value={CameraType.Turret}>炮筒</Radio.Button>
            <Radio.Button value={CameraType.Target}>目标</Radio.Button>
          </Radio.Group>
        </Space>
      </div>
    </ConfigLayoutContext.Provider>
  )
}
