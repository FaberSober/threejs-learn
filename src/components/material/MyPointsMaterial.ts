import { shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";

const MyPointsMaterial = shaderMaterial(
  {
    u: 1,
  },
  /* glsl */ `
    attribute float size;
    attribute vec3 color;

    varying vec3 vColor;

    void main() {
      vColor = color;
      vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
      gl_PointSize = size * ( 300.0 / -mvPosition.z );
      gl_Position = projectionMatrix * mvPosition;
    }

  `,
  /* glsl */ `
    varying vec3 vColor;

    void main() {
      gl_FragColor = vec4( vColor, 1.0 );

      #include <tonemapping_fragment>
      #include <encodings_fragment>
    }
  `
)

extend({ MyPointsMaterial })
