import { ThreeEvent } from "@react-three/fiber";
import { useState } from "react";

export default function useHover() {
  const [hovered, setHovered] = useState(false)

  function onPointerOver(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  function onPointerOut(e: ThreeEvent<PointerEvent>) {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = 'default'
  }

  return { hovered, setHovered, onPointerOver, onPointerOut }
}
