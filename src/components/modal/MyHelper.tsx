import React from "react";

interface MyHelperProps {
  unit?: number,
  helperVisible?: boolean,
}

/**
 * three.js 轴帮助
 * @param unit
 * @param helperVisible
 * @constructor
 */
export default function MyHelper({ unit = 10, helperVisible }: MyHelperProps) {
  return (
    <>
      <gridHelper visible={helperVisible} args={[unit, unit]} renderOrder={1} onUpdate={self => self.material.depthTest = false}/>
      <axesHelper visible={helperVisible} renderOrder={2} onUpdate={self => self.material.depthTest = false}/>
    </>
  )
}
