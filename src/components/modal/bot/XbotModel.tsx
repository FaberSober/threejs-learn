import { useAnimations, useGLTF } from "@react-three/drei";
import React from "react";
import * as THREE from "three";
import { Object3DNode } from "@react-three/fiber/dist/declarations/src/three-types";
import { GLTF } from "three-stdlib";

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

export default function XbotModel({ selAnim, ...props }: XbotModelProps) {
  const ybotRef = React.useRef<THREE.Group>(null!)
  const { animations, scene } = useGLTF(botUrl) as GLTF

  return (
    <>
      <primitive ref={ybotRef} {...props} object={scene}/>
      <AnimationController ybotRef={ybotRef} animations={animations} selAnim={selAnim}/>
    </>
  )
}
