import React from 'react';
import { Box3, Sphere, Vector3 } from "three";
import { Canvas, useLoader } from "@react-three/fiber";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { MapControls } from "@react-three/drei";


const Cell = ({ color, shape, fillOpacity }:any) => (
  <mesh>
    <meshBasicMaterial color={color} opacity={fillOpacity} depthWrite={false} transparent />
    <shapeGeometry args={[shape]} />
  </mesh>
)

function Svg() {
  const [center, setCenter] = React.useState(() => new Vector3(0, 0, 0))
  const ref = React.useRef<THREE.Group>(null!)

  const { paths } = useLoader(SVGLoader, '/assets/map.svg')

  const shapes = React.useMemo(
    () =>
      paths.flatMap((p) =>
        p.toShapes(true).map((shape) =>
          //@ts-expect-error this issue has been raised https://github.com/mrdoob/three.js/pull/21059
          ({ shape, color: p.color, fillOpacity: p.userData.style.fillOpacity })
        )
      ),
    [paths]
  )

  React.useEffect(() => {
    const box = new Box3().setFromObject(ref.current)
    const sphere = new Sphere()
    box.getBoundingSphere(sphere)
    setCenter((vec) => vec.set(-sphere.center.x, -sphere.center.y, 0))
  }, [])

  return (
    <group position={center} ref={ref}>
      {shapes.map((props) => (
        // @ts-expect-error this issue has been raised https://github.com/mrdoob/three.js/pull/21058
        <Cell key={props.shape.uuid} {...props} />
      ))}
    </group>
  )
}

/**
 * @author xu.pengfei
 * @date 2023/11/24 15:31
 */
export default function Demo26MapControls() {
  return (
    <Canvas orthographic camera={{ position: [0, 0, 50], zoom: 10, up: [0, 0, 1], far: 10000 }}>
      <color attach="background" args={[243, 243, 243]} />
      <React.Suspense fallback={null}>
        <Svg />
      </React.Suspense>
      <MapControls />
      <axesHelper />
    </Canvas>
  )
}
