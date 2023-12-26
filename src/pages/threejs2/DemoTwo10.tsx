import React, { useEffect } from 'react'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



export default function DemoTwo09() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    // 开启阴影
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

    // 1、创建场景
    const scene = new THREE.Scene();
    // 设置背景为蓝色
    scene.background = new THREE.Color('#DEFEFF');

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

    //Create a DirectionalLight and turn on shadows for the light
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 0, 10, 0 ); //default; light shining from top
    light.castShadow = true; // default false
    scene.add( light );

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 512; // default
    light.shadow.mapSize.height = 512; // default

    const cam = light.shadow.camera;
    // cam.near = 0.5; // default
    // cam.far = 500; // default
    cam.near = 1;
    cam.far = 2000;
    // 摄像机画布范围
    cam.left = -10;
    cam.right = 10;
    cam.top = 10;
    cam.bottom = -10;

    //Create a sphere that cast shadows (but does not receive them)
    const sphereGeometry = new THREE.SphereGeometry( 1, 32, 32 );
    const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.castShadow = true; //default is false
    sphere.receiveShadow = false; //default
    sphere.position.set( 0, 5, 5 );
    scene.add( sphere );

    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0x00ff00 } )
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.receiveShadow = true;
    plane.rotation.x = -0.5 * Math.PI;
    scene.add( plane );

    //Create a helper for the shadow camera (optional)
    const helper = new THREE.CameraHelper( light.shadow.camera );
    scene.add( helper );

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);


    // 渲染循环函数 requestAnimationFrame.
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
