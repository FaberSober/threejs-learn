import React, { useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Box,
  Cone,
  GizmoHelper,
  GizmoViewport,
  KeyboardControls,
  KeyboardControlsEntry,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Plane,
  PointerLockControls,
  Sphere,
  useHelper,
  useKeyboardControls
} from "@react-three/drei";
import XbotModel, { Anim } from "@/components/modal/bot/XbotModel";
import MyHelper from "@/components/modal/MyHelper";
import { MathUtils, Vector3 } from "three";
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import MyFactory from "@/components/modal/myFactory/MyFactory";


const _velocity = new Vector3() // 移动速度向量
let moving = false; // 是否在移动中
let canJump = true; // 是否可以跳跃
const speed = 0.05;

const transformed = new THREE.Vector3(); // 移动向量

enum Controls {
  forward = 'forward',
  left = 'left',
  right = 'right',
  back = 'back',
  jump = 'jump',
}

function Scene({anim}: {anim: Anim}) {
  const planeRef = useRef<THREE.Mesh>(null!);
  const boxRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);

  const lightRef = useRef<THREE.DirectionalLight>(null!);
  const camera = useRef<THREE.OrthographicCamera>(null!)
  useHelper(lightRef, THREE.DirectionalLightHelper)
  // useHelper(camera, THREE.CameraHelper)

  const cameraBotRef = useRef<THREE.PerspectiveCamera>(null!)
  useHelper(cameraBotRef, THREE.CameraHelper)

  const controlRef = useRef<OrbitControlsImpl>(null!)

  // 键盘控制
  const [, get] = useKeyboardControls<Controls>()

  useFrame(({ camera, pointer }, delta) => {
    const state = get()

    // 前后方向
    if (state.forward) {
      transformed.z = -speed
    } else if (state.back) {
      transformed.z = speed
    } else {
      transformed.z = 0
    }

    // 左右方向
    if (state.left) {
      transformed.x = -speed
    } else if (state.right) {
      transformed.x = speed
    } else {
      transformed.x = 0
    }

    // 获取控制器旋转，使得永远朝向控制器的前方前进
    const angle = controlRef.current.getAzimuthalAngle();
    transformed.applyAxisAngle(THREE.Object3D.DEFAULT_UP, angle);

    // 同步移动位置
    boxRef.current.position.add(transformed);
    cameraBotRef.current.position.add(transformed);
    controlRef.current.target.add(transformed);

    // 更新人物模型旋转方向
    boxRef.current.rotation.y = angle - Math.PI

    transformed.set(0, 0, 0);
  })

  return (
    <>
      <directionalLight ref={lightRef} position={[0, 5, 5]} color={0xFFFFFF} intensity={3} castShadow shadow-mapSize={[512, 512]}>
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera ref={camera} attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>

      <Plane
        ref={planeRef}
        args={[20, 20]}
        rotation-x={Math.PI * -0.5}
        receiveShadow
      >
        <meshPhongMaterial color={0xEEEEEE} />
      </Plane>

      <Box args={[1,1,1]} position={[0,1,4]} castShadow>
        <meshPhongMaterial color='blue' />
      </Box>

      <object3D ref={boxRef} position={[0, 0, 0]}>
        <XbotModel selAnim={anim}/>
        <MyHelper size={5} unit={20}/>
      </object3D>

      <PerspectiveCamera ref={cameraBotRef} makeDefault position={[0,2,-2]} />

      <OrbitControls ref={controlRef} target={[0,2,0]} enableZoom={false} enablePan={false} />
    </>
  )
}

export default function DemoTwo15React() {
  const map = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.jump, keys: ['Space'] },
    ],
    []
  )

  const [anim, setAnim] = useState<Anim>(Anim.idle)

  return (
    <div>
      <Canvas shadows>
        <KeyboardControls
          map={map}
          onChange={(name, pressed, _state: any) => {
            // Test onChange by toggling the color.
            if ( canJump === true ) {
              _velocity.y += 350;
            }
            canJump = false;

            // 控制人物动画
            if (_state.forward || _state.back || _state.left || _state.right) {
              if (!moving) {
                setAnim(Anim.walk)
              }
              moving = true
            } else {
              if (moving) {
                setAnim(Anim.idle)
              }
              moving = false
            }
          }}
        >
          <Scene anim={anim} />
        </KeyboardControls>

        {/*<MyHelper size={20} unit={20} />*/}
        <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
          <GizmoViewport />
        </GizmoHelper>
      </Canvas>

      <div>
        <ol>
          <li>WASD控制人物移动</li>
          <li>鼠标控制镜头</li>
          <li>空格跳跃（暂未实现）</li>
        </ol>
      </div>
    </div>
  )
}
