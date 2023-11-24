import React from 'react';
import ThreeCanvasLayout from "@/components/three/ThreeCanvasLayout";
import { MathUtils, Quaternion, Vector3 } from "three";
import { extend, useFrame, useThree } from '@react-three/fiber'
import { Point, Points, PointMaterial, shaderMaterial } from "@react-three/drei";
import * as buffer from 'maath/buffer'
import * as misc from 'maath/misc'
import '@/components/material/MyPointsMaterial'


const rotationAxis = new Vector3(0, 1, 0).normalize()
const q = new Quaternion()


// @ts-ignore
const makeBuffer = (...args) => Float32Array.from(...args)

function BasicPointsBuffer() {
  const n = 10_000
  const [positionA] = React.useState(() => makeBuffer({ length: n * 3 }, () => MathUtils.randFloatSpread(5)))
  const [positionB] = React.useState(() => makeBuffer({ length: n * 3 }, () => MathUtils.randFloatSpread(10)))
  const [positionFinal] = React.useState(() => positionB.slice(0))
  const [color] = React.useState(() => makeBuffer({ length: n * 3 }, () => Math.random()))
  const [size] = React.useState(() => makeBuffer({ length: n }, () => Math.random() * 0.2))

  useFrame(({ clock }) => {
    // 获取clock从创建开始经过的时间
    const et = clock.getElapsedTime()
    // 获取当前时间的正弦值，并且从[-1,1]映射到[0,1]
    const t = misc.remap(Math.sin(et), [-1, 1], [0, 1])

    // 沿Y轴，旋转颜色
    buffer.rotate(color, { q: q.setFromAxisAngle(rotationAxis, t * 0.01) })

    buffer.lerp(positionA, positionB, positionFinal, t)
    buffer.rotate(positionB, {
      q: q.setFromAxisAngle(rotationAxis, t * t * 0.1),
    })
  })

  return (
    <Points positions={positionFinal} colors={color} sizes={size}>
      {/* @ts-ignore */}
      <myPointsMaterial />
    </Points>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 14:43
 */
export default function Demo18BasicPointsBuffer() {

  return (
    <ThreeCanvasLayout>
      <BasicPointsBuffer />
    </ThreeCanvasLayout>
  )
}
