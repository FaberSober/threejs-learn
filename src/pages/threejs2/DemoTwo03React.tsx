import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import { useControls } from 'leva'
import { DirectionalLightShadow } from "three/src/lights/DirectionalLightShadow";
import { CameraHelper } from "three";


function TargetOrbit() {
  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  // useHelper(camera, CameraHelper)

  return (
    <object3D>
      {/* targetElevation */}
      <object3D position={[0,8,carLength * 2]}>
        {/* targetBob */}
        <object3D>
          {/* targetMesh */}
          <mesh castShadow>
            <sphereGeometry args={[.5, 6, 3]}/>
            <meshPhongMaterial color={0x00FF00} flatShading/>
          </mesh>

          {/* targetCameraPivot */}
          <object3D>
            {/* turretCamera */}
            <PerspectiveCamera
              ref={camera}
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

function Turret() {
  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  // useHelper(camera, CameraHelper)

  return (
    <object3D scale={[5, 5, 5]} position={[0, .5, 0]}>
      <mesh castShadow position={[0,0,turretLength * .5]}>
        <boxGeometry args={[turretWidth, turretHeight, turretLength]}/>
        <meshPhongMaterial color={0x6688AA}/>

        {/* turretCamera */}
        <PerspectiveCamera
          ref={camera}
          fov={75}
          position={[0, .75 * .2, 0]}
          rotation={[0, Math.PI, 0]}
        />
      </mesh>
    </object3D>
  )
}

function Dome() {
  return (
    <mesh castShadow position={[0, .5, 0]}>
      <sphereGeometry args={[domeRadius, domeWidthSubdivisions, domeHeightSubdivisions, domePhiStart, domePhiEnd, domeThetaStart, domeThetaEnd]}/>
      <meshPhongMaterial color={0x6688AA}/>
    </mesh>
  )
}

function Wheel({position}: {
  position: [number, number, number]
}) {
  return (
    <mesh position={position} castShadow rotation={[0,0,Math.PI * .5]}>
      <cylinderGeometry args={[wheelRadius, wheelRadius, wheelThickness, wheelSegments]}/>
      <meshPhongMaterial color={0x888888}/>
    </mesh>
  )
}

function Tank() {
  const camera = React.useRef<THREE.PerspectiveCamera>(null!)
  useHelper(camera, CameraHelper)

  return (
    <object3D>
      {/* body */}
      <mesh position={[0,1.4,0]} castShadow>
        <boxGeometry args={[carWidth, carHeight, carLength]}/>
        <meshPhongMaterial color={0x6688AA}/>

        {/* tankCamera */}
        <PerspectiveCamera
          ref={camera}
          fov={75}
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
      </mesh>
    </object3D>
  )
}

function MyScene() {
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

  return (
    <>
      <PerspectiveCamera
        ref={camera}
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

      <mesh>
        <planeGeometry args={[50, 50]} />
        <meshPhongMaterial color={0xCC8866} />
      </mesh>

      <Tank />

      <TargetOrbit />
    </>
  )
}

export default function DemoTwo03React() {

  return (
    <Canvas
      onCreated={state => {
        state.gl.setClearColor(0xAAAAAA)
        state.gl.shadowMap.enabled = true;
      }}
    >
      <MyScene />

      <OrbitControls />
      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  )
}
