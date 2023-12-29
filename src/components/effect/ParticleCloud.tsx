import React, { useMemo } from 'react'
import { useFrame } from "@react-three/fiber";
import { ShaderMaterial, Points } from 'three';


export default function ParticleCloud({ count }: { count: number}) {
  // 创建具有随机位置和速度的粒子
  const particles = useMemo(() => {
    const particleCount = count;
    const array = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      array[i * 3] = (Math.random() - 0.5) * 10;
      array[i * 3 + 1] = (Math.random() - 0.5) * 10;
      array[i * 3 + 2] = Math.random() * 10 - 5;
    }

    return array;
  }, [count]);

  // 自定义shader代码
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {},
        vertexShader: `
          void main() {
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = 5.0 * (1.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          void main() {
            gl_FragColor = vec4(1.0, 1.0, 1.0, 0.5);
          }
        `,
      }),
    []
  );

  // 使用useFrame调用粒子更新方法
  useFrame(({ clock }:any) => {
    const time = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const offset = i * 3;

      particles[offset] += Math.sin(time * 0.1);
      particles[offset + 1] += Math.cos(time * 0.1) * 0.5;
    }

    material.needsUpdate = true;
  });

  return (
    <points
      geometry={{ attributes: { position: { array: particles, itemSize: 3 } } }}
      material={material}
      depthWrite={false}
      transparent
    />
  );
}
