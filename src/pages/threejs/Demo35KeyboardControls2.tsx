import React, { Suspense, useMemo, useRef } from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import {
  Box, CameraControls,
  Cone,
  FirstPersonControls,
  GizmoHelper,
  GizmoViewcube,
  GizmoViewport,
  KeyboardControls,
  KeyboardControlsEntry,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  useAnimations,
  useGLTF,
  useKeyboardControls
} from "@react-three/drei";
import { MathUtils, Mesh, Vector3 } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { GLTF } from "three-stdlib";
import { GroupProps } from "@react-three/fiber/dist/declarations/src/three-types";



type GLTFResult = GLTF & {
  nodes: {
    YB_Body: THREE.SkinnedMesh
    YB_Joints: THREE.SkinnedMesh
    mixamorigHips: THREE.Bone
  }
  materials: {
    YB_Body: THREE.MeshStandardMaterial
    YB_Joints: THREE.MeshStandardMaterial
  }
}

type AnimationControllerProps = {
  ybotRef: React.MutableRefObject<THREE.Group | undefined | null>
  animations: THREE.AnimationClip[]
  selAnim: string;
}

function AnimationController(props: AnimationControllerProps) {
  const { actions } = useAnimations(props.animations, props.ybotRef)
  console.log('props.animations', props.animations)

  // Storybook Knobs
  const actionOptions = Object.keys(actions)
  // const selectedAction = select('Animation', actionOptions, actionOptions[2])
  const [selectedAction, setSelectedAction] = React.useState(actionOptions[2]); // Animation
  const blendDuration = 0.5; // Blend duration

  React.useEffect(() => {
    if (props.selAnim === 'Dance') {
      setSelectedAction(actionOptions[0])
    } else if (props.selAnim === 'Idle') {
      setSelectedAction(actionOptions[1])
    } else if (props.selAnim === 'Strut') {
      setSelectedAction(actionOptions[2])
    }
  }, [props.selAnim])

  React.useEffect(() => {
    actions[selectedAction]?.reset().fadeIn(blendDuration).play()
    return () => void actions[selectedAction]?.fadeOut(blendDuration)
  }, [actions, selectedAction, blendDuration])

  return null
}

const _velocity = new Vector3()
const speed = 1

interface YBotModelProps extends GroupProps {
  selAnim: 'Strut'|'Idle'|'Dance'
}

function YBotModel({ selAnim, ...props }: YBotModelProps) {
  const ybotRef = React.useRef<THREE.Group>(null)
  const cameraRef = React.useRef<THREE.PerspectiveCamera>(null)
  const { nodes, materials, animations } = useGLTF('/assets/model/ybot.glb') as GLTFResult

  const [, get] = useKeyboardControls<Controls>()

  useFrame((_s, dl) => {
    if (cameraRef.current) {
      // cameraRef.current.lookAt(new Vector3(0,0,1))
      // cameraRef.current.position.set(0, 20, -30)
    }

    if (!ybotRef.current) return

    ybotRef.current.add(cameraRef.current)

    const state = get()
    if (state.left && !state.right) _velocity.x = -1
    if (state.right && !state.left) _velocity.x = 1
    if (!state.left && !state.right) _velocity.x = 0

    if (state.forward && !state.back) _velocity.z = -1
    if (state.back && !state.forward) _velocity.z = 1
    if (!state.forward && !state.back) _velocity.z = 0

    ybotRef.current.position.addScaledVector(_velocity, speed * dl)
  })

  return (
    <>
      <group ref={ybotRef} {...props} dispose={null} position={[0, 0, 0]} rotation={[0, -Math.PI, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
          <primitive object={nodes.mixamorigHips}/>
            <skinnedMesh name="YB_Body" geometry={nodes.YB_Body.geometry} material={materials.YB_Body} skeleton={nodes.YB_Body.skeleton}/>

          <skinnedMesh name="YB_Joints" geometry={nodes.YB_Joints.geometry} material={materials.YB_Joints} skeleton={nodes.YB_Joints.skeleton}/>
        </group>
      </group>

      <PerspectiveCamera ref={cameraRef} makeDefault fov={75} position={[0,2,-3]}>
      </PerspectiveCamera>

      <AnimationController ybotRef={ybotRef} animations={animations} selAnim={selAnim}/>
    </>
  )
}

useGLTF.preload('/assets/model/ybot.glb')
useGLTF.preload('/assets/model/simple-factory.gltf')


enum Controls {
  forward = 'forward',
  left = 'left',
  right = 'right',
  back = 'back',
  color = 'color',
}


function Model(props: any) {
  const gltf = useGLTF('/assets/model/simple-factory.gltf') as any
  // const gltf = useGLTF('/assets/model/001.glb') as any
  // const gltf = useGLTF('/assets/model/monkey.glb')
  // console.log('gltf', gltf)
  gltf.scene.traverse((child:any)=>{
    console.log("name:",child?.name);
  })
  return <primitive {...props} object={gltf.scene} />
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:21
 */
export default function Demo35KeyboardControls2() {
  const map = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
    ],
    []
  )

  return (
    <Canvas shadows>
      {/* 灯光 */}
      <ambientLight intensity={0.8}/>
      <pointLight position={[0, 6, 0]} intensity={700} distance={10}/>

      {/* 天空盒 */}
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />

      {/* 场站模型 */}
      <Suspense>
        <Model />
      </Suspense>

      {/* 键盘控制 */}
      <KeyboardControls
        map={map}
        onChange={(name, pressed, _state) => {
        }}
      >
        <YBotModel selAnim="Strut" />
      </KeyboardControls>

      {/* 轨道控制 */}
      <OrbitControls enableZoom={false} enablePan={false} />

      {/* 轴显 */}
      <axesHelper />

      {/*<PerspectiveCamera fov={75} position={[0, 0, 10]} />*/}

      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport />
      </GizmoHelper>
    </Canvas>
  )
}
