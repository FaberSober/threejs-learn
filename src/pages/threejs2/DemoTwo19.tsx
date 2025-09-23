import React, { useEffect } from 'react'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CrossGridMaterial, HexGridMaterial } from "@masatomakino/threejs-shader-materials";


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
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    //
    const geo = new THREE.SphereGeometry(10, 64, 64);
    // const geo = new THREE.BoxGeometry(1, 1, 1)
    const mat = new HexGridMaterial();
    mat.color = new THREE.Color(0x66c4ff)
    mat.gridWeight = 0.1
    mat.uniformOpacity = 1
    mat.isAnimate = true
    mat.division = 60
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    function render(time:number) {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
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
