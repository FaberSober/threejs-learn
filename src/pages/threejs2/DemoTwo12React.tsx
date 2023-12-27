import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, MeshProps, useFrame } from "@react-three/fiber";
import { Box, OrbitControls, PerspectiveCamera, Plane, Sphere, useAnimations, useGLTF } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import { Radio, Space } from "antd";
import { GLTF } from "three-stdlib";
import { Object3DNode } from "@react-three/fiber/dist/declarations/src/three-types";


const botUrl = '/assets/model/Xbot.glb'
useGLTF.preload(botUrl)

enum Anim {
  idle,walk,run
}


type AnimationControllerProps = {
  ybotRef: React.MutableRefObject<THREE.Group | undefined | null>
  animations: THREE.AnimationClip[]
  selAnim: Anim;
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
    if (props.selAnim === Anim.idle) {
      setSelectedAction(actionOptions[2])
    } else if (props.selAnim === Anim.walk) {
      setSelectedAction(actionOptions[6])
    } else if (props.selAnim === Anim.run) {
      setSelectedAction(actionOptions[3])
    }

  }, [props.selAnim])

  React.useEffect(() => {
    actions[selectedAction]?.reset().fadeIn(blendDuration).play()
    return () => void actions[selectedAction]?.fadeOut(blendDuration)
  }, [actions, selectedAction, blendDuration])

  return null
}

interface XbotModelProps extends Object3DNode<any, any> {
  selAnim: Anim,
}

function XbotModel({ selAnim, ...props }: XbotModelProps) {
  const ybotRef = React.useRef<THREE.Group>(null!)
  const { animations, scene } = useGLTF(botUrl) as GLTF

  return (
    <>
      <primitive ref={ybotRef} {...props} object={scene}/>
      <AnimationController ybotRef={ybotRef} animations={animations} selAnim={selAnim}/>
    </>
  )
}

function Scene({anim}: { anim: Anim }) {
  const planeRef = useRef<THREE.Mesh>(null!);

  return (
    <>
      <Plane ref={planeRef} args={[20, 20]} rotation-x={Math.PI * -0.5}/>

      <React.Suspense fallback={null}>
        <XbotModel selAnim={anim} />
      </React.Suspense>
    </>
  )
}

export default function DemoTwo12React() {
  const [anim, setAnim] = useState<Anim>(Anim.idle)

  return (
    <div>
      <Canvas>
        <directionalLight position={[-1, 2, 4]} color={0xFFFFFF} intensity={1}/>
        <PerspectiveCamera makeDefault fov={75} position={[5, 5, 5]}/>

        <Scene anim={anim} />

        <OrbitControls />
        <MyHelper />
      </Canvas>

      <div style={{marginTop: 12}}>
        <Space>
          <div>动作：</div>
          <Radio.Group value={anim} onChange={e => setAnim(e.target.value)}>
            <Radio value={Anim.idle}>idle</Radio>
            <Radio value={Anim.walk}>walk</Radio>
            <Radio value={Anim.run}>run</Radio>
          </Radio.Group>
        </Space>
      </div>
    </div>
  )
}
