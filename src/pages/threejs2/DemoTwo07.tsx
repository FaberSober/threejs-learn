import React, { useEffect } from 'react'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";



export default function DemoTwo07() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    // 目标：掌握gsap设置各种动画效果

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
    camera.position.set(0, 0, 10);
    scene.add(camera);

    // 添加物体
    // 创建几何体
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    // 根据几何体和材质创建物体
    const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

    // 修改物体的位置
    // cube.position.set(5, 0, 0);
    // cube.position.x = 3;
    // 缩放
    // cube.scale.set(3, 2, 1);
    // cube.scale.x = 5;
    // 旋转
    cube.rotation.set(Math.PI / 4, 0, 0, "XZY");

    // 将几何体添加到场景中
    scene.add(cube);

    console.log(cube);


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
    // 设置时钟
    const clock = new THREE.Clock();

    // 设置动画
    var animate1 = gsap.to(cube.position, {
      x: 5,
      duration: 5,
      ease: "power1.inOut",
      //   设置重复的次数，无限次循环-1
      repeat: -1,
      //   往返运动
      yoyo: true,
      //   delay，延迟2秒运动
      delay: 2,
      onComplete: () => {
        console.log("动画完成");
      },
      onStart: () => {
        console.log("动画开始");
      },
    });
    gsap.to(cube.rotation, { x: 2 * Math.PI, duration: 5, ease: "power1.inOut" });

    window.document.getElementById("btn1")!.addEventListener("click", () => {
        console.log('dblclick', animate1);
      if (animate1.isActive()) {
        //   暂停
        animate1.pause();
        window.document.getElementById("btn1")!.innerHTML = "动画 暂停";
      } else {
        //   恢复
        animate1.resume();
        window.document.getElementById("btn1")!.innerHTML = "动画 恢复";
      }
    });


    // 让立方体旋转起来，以便更好的在三维环境中显示。为了让它动起来我们需要用到一个渲染循环函数 requestAnimationFrame.
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
