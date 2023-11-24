import React, { useState } from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";

import { Vector3 } from 'three'
import { GLTF } from 'three-stdlib'
import { useAnimations, useGLTF, useMatcapTexture } from "@react-three/drei";
import { Radio } from "antd";

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

function YBotModel({ selAnim, ...props }: JSX.IntrinsicElements['group']) {
  const ybotRef = React.useRef<THREE.Group>(null)
  const { nodes, animations } = useGLTF('/assets/model/ybot.glb') as GLTFResult
  const [matcapBody] = useMatcapTexture('293534_B2BFC5_738289_8A9AA7', 1024)
  const [matcapJoints] = useMatcapTexture('3A2412_A78B5F_705434_836C47', 1024)

  return (
    <>
      <group ref={ybotRef} {...props} dispose={null}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={[0.01, 0.01, 0.01]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh geometry={nodes.YB_Body.geometry} skeleton={nodes.YB_Body.skeleton}>
            <meshMatcapMaterial matcap={matcapBody} skinning />
          </skinnedMesh>
          <skinnedMesh geometry={nodes.YB_Joints.geometry} skeleton={nodes.YB_Joints.skeleton}>
            <meshMatcapMaterial matcap={matcapJoints} skinning />
          </skinnedMesh>
        </group>
      </group>

      <AnimationController ybotRef={ybotRef} animations={animations} selAnim={selAnim} />
    </>
  )
}

useGLTF.preload('/assets/model/ybot.glb')

function UseAnimationsScene({selAnim}:any) {
  return (
    <React.Suspense fallback={null}>
      <YBotModel position={[0, -1, 0]} selAnim={selAnim} />
    </React.Suspense>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:51
 */
export default function Demo29UseAnimations() {
  const [anim, setAnim] = useState('Dance')

  return (
    <div>
      <Radio.Group value={anim} onChange={e => setAnim(e.target.value)}>
        <Radio value="Dance">Dance</Radio>
        <Radio value="Idle">Idle</Radio>
        <Radio value="Strut">Strut</Radio>
      </Radio.Group>

      <ThreeCanvasLayout>
        <UseAnimationsScene selAnim={anim} />
      </ThreeCanvasLayout>
    </div>
  )
}
