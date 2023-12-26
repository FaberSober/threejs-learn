import React, { useEffect } from 'react'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";


const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();


export default function DemoTwo11() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    // 1、创建场景
    const scene = new THREE.Scene();
    // 设置背景为蓝色
    // scene.background = new THREE.Color('#DEFEFF');

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

    // 平行光
    const light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 0, 10, 0 ); //default; light shining from top
    scene.add( light );

    // 圆球标记射线检测的位置点
    const sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
    const sphereMaterial = new THREE.MeshStandardMaterial( { color: 0xff0000 } );
    const sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.set( 0, 0, 0 );
    scene.add( sphere );

    // 平面
    const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32, 32 );
    const planeMaterial = new THREE.MeshStandardMaterial( { color: 0xeeeeee } )
    const plane = new THREE.Mesh( planeGeometry, planeMaterial );
    plane.rotation.x = -0.5 * Math.PI;
    scene.add( plane );

    // 创建轨道控制器
    new OrbitControls(camera, renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    function onPointerMove(event: WindowEventMap["pointermove"]) {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components
      // console.log('event', event, event.clientX, event.clientY)
      const { left, top } = renderer.domElement.getBoundingClientRect()
      pointer.x = ( (event.clientX - left) / renderer.domElement.clientWidth ) * 2 - 1;
      pointer.y = - ( (event.clientY - top) / renderer.domElement.clientHeight ) * 2 + 1;

      camera.updateProjectionMatrix();
      // update the picking ray with the camera and pointer position
      // 使用相机和指针位置更新拾取光线
      raycaster.setFromCamera( pointer, camera );

      // calculate objects intersecting the picking ray
      // 计算与拾取射线相交的对象
      const intersects = raycaster.intersectObject(plane);
      if ( intersects.length > 0 ) {
        // console.log('intersects', intersects)
        sphere.position.copy(intersects[0].point);
      }
    }
    // 监听屏幕鼠标点移动事件
    window.addEventListener( 'pointermove', onPointerMove );

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
      <div id="info">
        射线追踪
      </div>
    </div>
  )
}
