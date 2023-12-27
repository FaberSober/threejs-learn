import React from "react";

interface MyHelperProps {
  size?: number,
  unit?: number,
  helperVisible?: boolean,
}

/**
 * three.js 轴帮助
 * @param unit
 * @param helperVisible
 * @constructor
 */
export default function MyHelper({ size = 10, unit = 10, helperVisible }: MyHelperProps) {
  return (
    <>
      <gridHelper visible={helperVisible} args={[size, unit]} renderOrder={1} material-depthTest={false} />
      <axesHelper visible={helperVisible} renderOrder={2} material-depthTest={false} />
    </>
  )
}
