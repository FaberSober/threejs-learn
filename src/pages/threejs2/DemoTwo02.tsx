import React, { useEffect } from 'react'
import * as THREE from 'three';
// 引入gui.js库
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js'


const gui = new GUI();

// 打开/关闭轴和网格的可见性
// lil-gui 要求一个返回类型为bool型的属性
// 来创建一个复选框，所以我们为 `visible`属性
// 绑定了一个setter 和 getter。 从而让lil-gui
// 去操作该属性.
class AxisGridHelper {
  grid;
  axes;
  _visible = true;

  constructor(node:any, units = 10) {
    const axes = new THREE.AxesHelper();
    axes.material.depthTest = false;
    axes.renderOrder = 2; // 在网格渲染之后再渲染
    node.add(axes);

    const grid = new THREE.GridHelper(units, units);
    grid.material.depthTest = false;
    grid.renderOrder = 1;
    node.add(grid);

    this.grid = grid;
    this.axes = axes;
    this.visible = false;
  }
  get visible() {
    return this._visible;
  }
  set visible(v) {
    this._visible = v;
    this.grid.visible = v;
    this.axes.visible = v;
  }
}

export default function DemoTwo02() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    const fov = 50;
    const aspect = width / height;  // 相机默认值
    const near = 0.1;
    const far = 2000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 50, 0);
    camera.up.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // 然后我们创建一个场景(Scene)。场景(Scene)是three.js的基本的组成部分
    const scene = new THREE.Scene();


    // 要更新旋转角度的对象数组
    const objects:any[] = [];

    // 一球多用
    const radius = 1;
    const widthSegments = 6;
    const heightSegments = 6;
    const sphereGeometry = new THREE.SphereGeometry(
      radius,
      widthSegments,
      heightSegments
    );

    // const sunMaterial = new THREE.MeshPhongMaterial({ emissive: 0xffff00 });
    // const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    // sunMesh.scale.set(5, 5, 5); // 扩大太阳的大小
    // scene.add(sunMesh);
    // objects.push(sunMesh);
    //
    // // 现在让我们把地球（earth）也加进去。
    // const earthMaterial = new THREE.MeshPhongMaterial({
    //   color: 0x2233ff,
    //   emissive: 0x112244,
    // });
    // const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    // earthMesh.position.x = 10;
    // scene.add(earthMesh);
    // objects.push(earthMesh);
    //
    // sunMesh.add(earthMesh);

    // 太阳系
    const solarSystem = new THREE.Object3D();
    scene.add(solarSystem);
    objects.push(solarSystem);

    // 太阳
    const sunMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});
    const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
    sunMesh.scale.set(5, 5, 5);
    solarSystem.add(sunMesh);
    objects.push(sunMesh);

    // 地球轨道
    const earthOrbit = new THREE.Object3D();
    earthOrbit.position.x = 10;
    solarSystem.add(earthOrbit);
    objects.push(earthOrbit);

    // 地球
    const earthMaterial = new THREE.MeshPhongMaterial({color: 0x2233FF, emissive: 0x112244});
    const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
    earthOrbit.add(earthMesh);
    objects.push(earthMesh);

    // 月球轨道
    const moonOrbit = new THREE.Object3D();
    moonOrbit.position.x = 2;
    earthOrbit.add(moonOrbit);

    // 月球
    const moonMaterial = new THREE.MeshPhongMaterial({color: 0x888888, emissive: 0x222222});
    const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
    moonMesh.scale.set(.5, .5, .5);
    moonOrbit.add(moonMesh);
    objects.push(moonMesh);

    // 为每个节点添加一个AxesHelper
    objects.forEach((node) => {
      const axes = new THREE.AxesHelper();
      axes.material.depthTest = false;
      axes.renderOrder = 1;
      node.add(axes);
    });

    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.PointLight(color, intensity);
    scene.add(light);

    // 之后将场景和摄像机传递给渲染器来渲染出整个场景。
    renderer.render(scene, camera);

    // 让立方体旋转起来，以便更好的在三维环境中显示。为了让它动起来我们需要用到一个渲染循环函数 requestAnimationFrame.
    function render(time:number) {
      time *= 0.001;  // 将时间单位变为秒

      objects.forEach((obj) => {
        obj.rotation.y = time;
      });

      renderer.render(scene, camera);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);

    function makeAxisGrid(node:any, label:any, units?:any) {
      const helper = new AxisGridHelper(node, units);
      gui.add(helper, 'visible').name(label);
    }

    makeAxisGrid(solarSystem, 'solarSystem', 25);
    makeAxisGrid(sunMesh, 'sunMesh');
    makeAxisGrid(earthOrbit, 'earthOrbit');
    makeAxisGrid(earthMesh, 'earthMesh');
    makeAxisGrid(moonOrbit, 'moonOrbit');
    makeAxisGrid(moonMesh, 'moonMesh');
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
    </div>
  )
}
