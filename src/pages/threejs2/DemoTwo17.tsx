import React, { useEffect } from 'react'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";


let _time = 0;
const clock = new THREE.Clock() // 时钟，

export default function DemoTwo17() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    // 1、创建场景
    const scene = new THREE.Scene();

    // 2、创建相机
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // 设置相机位置
    camera.position.set(10, 10, 10);
    scene.add(camera);


    // 创建一盏平行光。
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // wall
    const wall = createWall();
    scene.add(wall);

    function render(time:number) {
      const dt = clock.getDelta();
      _time += dt;
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  // 光墙光幕效果
  function createWall(): THREE.Mesh {
    // 定义光幕参数
    const wallData = {
      position: {
        x: 0,
        y: 0,
        z: 0
      },
      height: 4,
      radius: 5,
      maxRadius: 15,
      color: '#efad35',
      opacity: 0.4,
      period: 2,
    }

    const point1 = new THREE.Vector3()
    const point2 = point1.clone().setY(point1.y + wallData.height)
    const curve = new THREE.LineCurve3(point1, point2);
    const geometry = new THREE.TubeGeometry(curve, 20, wallData.radius, 220, false);
    // 确定光墙包围盒box
    geometry.computeBoundingBox();
    const max = geometry.boundingBox!.max;
    const min = geometry.boundingBox!.min

    // 顶点着色器
    const vertexShader = `
        varying vec2 vUv;
        varying vec3 fNormal;
        varying vec3 vPosition;
        void main(){
                vUv = uv;
                vPosition = position;
                vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
                gl_Position = projectionMatrix * mvPosition;
        }
    `;
    // 片元着色器
    const fragmentShader = `
        uniform float time;
        varying vec2 vUv;
        uniform sampler2D flowTexture;
        uniform sampler2D bgTexture;
        void main( void ) {
            vec2 position = vUv;
            vec4 colora = texture2D( flowTexture, vec2( vUv.x, fract(vUv.y - time )));
            vec4 colorb = texture2D( bgTexture , position.xy);
            gl_FragColor = colorb + colorb * colora;
        }
    `;

    // 创建材质
    const material = new THREE.ShaderMaterial({
      // color: wallData.color,
      opacity: wallData.opacity,
      transparent: true,
      side: THREE.DoubleSide, // 两面都渲染
      depthTest: false, // 关闭材质的深度测试
      uniforms: {
        uMax: {
          value: max
        },
        uMin: {
          value: min
        },
        uColor: {
          value: new THREE.Color(wallData.color)
        }
      },
      vertexShader: `
        varying vec4 vPosition;
        void main() {
          vPosition = modelMatrix * vec4(position,1.0);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor; // 光墙半径
        uniform vec3 uMax;
        uniform vec3 uMin;
        uniform mat4 modelMatrix; // 世界矩阵
        varying vec4 vPosition; // 接收顶点着色传递进来的位置数据


        void main() {
          // 转世界坐标
          vec4 uMax_world = modelMatrix * vec4(uMax,1.0);
          vec4 uMin_world = modelMatrix * vec4(uMin,1.0);
          // 根据像素点世界坐标的y轴高度,设置透明度
          float opacity =1.0 - (vPosition.y - uMin_world.y) / (uMax_world.y -uMin_world.y);

           gl_FragColor = vec4( uColor, opacity);
        }
      `,
    })

    // 创建wall
    const wall = new THREE.Mesh(geometry, material)
    wall.renderOrder = 1000 // 渲染顺序

    wall.name = 'wall'
    const {
      x,
      y,
      z
    } = wallData.position
    wall.position.set(x, y, z)
    wall.updateMatrix()

    // 解耦
    const originScale = wall.scale.clone()
    setInterval(() => {
      const time = _time
      const {
        period,
        radius,
        maxRadius
      } = wallData
      const rate = (time % period) / period
      const currRadius = rate * (maxRadius - radius) + radius
      const scaleRate = currRadius / radius
      const matrix = new THREE.Matrix4().makeScale(scaleRate, 1, scaleRate)

      wall.scale.copy(originScale.clone().applyMatrix4(matrix))
      wall.updateMatrix()
    }, 50)

    return wall;
  }

  useEffect(() => {
    if (loaded) {
      return;
    }
    main()
    setLoaded(true);
  }, [])

  return (
    <div>
      <h1>just use threejs</h1>
      <canvas id="three-container" style={{width: 700, height: 500}}/>
      <div id="info"></div>
      <button id="btn1">动画</button>
    </div>
  )
}
