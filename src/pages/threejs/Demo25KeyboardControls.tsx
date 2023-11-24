import React, { useMemo, useRef } from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { Box, Cone, FirstPersonControls, KeyboardControls, KeyboardControlsEntry, useKeyboardControls } from "@react-three/drei";
import { MathUtils, Mesh, Vector3 } from "three";
import { useFrame } from "@react-three/fiber";


const _velocity = new Vector3()
const speed = 10

type PlayerProps = { color: string }

const Player = ({ color }: PlayerProps) => {
  const ref = useRef<Mesh>(null)
  const [, get] = useKeyboardControls<Controls>()

  useFrame((_s, dl) => {
    if (!ref.current) return
    const state = get()
    if (state.left && !state.right) _velocity.x = -1
    if (state.right && !state.left) _velocity.x = 1
    if (!state.left && !state.right) _velocity.x = 0

    if (state.forward && !state.back) _velocity.z = -1
    if (state.back && !state.forward) _velocity.z = 1
    if (!state.forward && !state.back) _velocity.z = 0

    ref.current.position.addScaledVector(_velocity, speed * dl)

    ref.current.rotateY(4 * dl * _velocity.x)
  })

  return (
    <Cone ref={ref} args={[1, 3, 4]} rotation={[-90 * MathUtils.DEG2RAD, 0, 0]}>
      <meshLambertMaterial color={color} />
    </Cone>
  )
}

enum Controls {
  forward = 'forward',
  left = 'left',
  right = 'right',
  back = 'back',
  color = 'color',
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:21
 */
export default function Demo25KeyboardControls() {
  const map = useMemo<KeyboardControlsEntry[]>(
    () => [
      { name: Controls.forward, keys: ['ArrowUp', 'KeyW'] },
      { name: Controls.back, keys: ['ArrowDown', 'KeyS'] },
      { name: Controls.left, keys: ['ArrowLeft', 'KeyA'] },
      { name: Controls.right, keys: ['ArrowRight', 'KeyD'] },
      { name: Controls.color, keys: ['Space'] },
    ],
    []
  )

  const [color, setColor] = React.useState('green')

  return (
    <ThreeCanvasLayout>
      <KeyboardControls
        map={map}
        onChange={(name, pressed, _state) => {
          // Test onChange by toggling the color.
          if (name === Controls.color && pressed) {
            setColor((color) => (color === 'green' ? 'red' : 'green'))
          }
        }}
      >
        <Player color={color} />
      </KeyboardControls>

      <Box>
        <meshBasicMaterial wireframe />
      </Box>
    </ThreeCanvasLayout>
  )
}
