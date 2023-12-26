import React, { useEffect } from 'react'
import * as THREE from 'three';
// 导入轨道控制器
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 导入动画库
import gsap from "gsap";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";



function dumpObject(obj:THREE.Object3D, lines:string[] = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

export default function DemoTwo09() {
  const [loaded, setLoaded] = React.useState(false);

  function main() {
    const width = 700, height = 500;

    const canvas = document.querySelector('#three-container') as HTMLCanvasElement;
    const renderer = new THREE.WebGLRenderer({canvas: canvas});
    renderer.setSize( width, height );

    // 开启阴影
    renderer.shadowMap.enabled = true;

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

    // 创建一盏平行光。
    // const color = 0xFFFFFF;
    // const intensity = 3;
    // const light = new THREE.DirectionalLight(color, intensity);
    // light.position.set(10, 10, 10);
    // scene.add(light);

    {
      const color = 0xFFFFFF;
      const intensity = 1;
      const light = new THREE.DirectionalLight(color, intensity);
      light.castShadow = true;
      light.position.set(-2.5, 8, -8.5);
      light.target.position.set(-5.5, 0.4, -4.5);

      light.shadow.bias = -0.004;
      light.shadow.mapSize.width = 2048;
      light.shadow.mapSize.height = 2048;

      scene.add(light);
      scene.add(light.target);
      const cam = light.shadow.camera;
      cam.near = 1;
      cam.far = 2000;
      cam.left = -1500;
      cam.right = 1500;
      cam.top = 1500;
      cam.bottom = -1500;
    }

    let cars:any[] = [];

    const gltfLoader = new GLTFLoader();
    const url = '/assets/model/cartoon_lowpoly_small_city_free_pack/scene.gltf';
    gltfLoader.load(url, (gltf) => {
      const root = gltf.scene;
      root.scale.set(0.01, 0.01, 0.01);
      scene.add(root)

      // 加载完之后，我们需要开启所有物体的阴影
      root.traverse((obj) => {
        if (obj.castShadow !== undefined) {
          obj.castShadow = true;
          obj.receiveShadow = true;
        }
      });

      // 打印模型结构
      console.log(dumpObject(root).join('\n'));

      // 获取模型中的car
      // cars = root.getObjectByName('Cars');
      // console.log('cars', cars)

      const loadedCars = root.getObjectByName('Cars') as THREE.Object3D;
      const fixes:{ prefix:string, y:number, rot:[number, number, number]}[] = [
        { prefix: 'Car_08', y: 0,  rot: [Math.PI * .5, 0, Math.PI * .5], },
        { prefix: 'CAR_03', y: 0.33, rot: [0, Math.PI, 0], },
        { prefix: 'Car_04', y: 0.40, rot: [0, Math.PI, 0], },
      ];

      root.updateMatrixWorld();
      for (const car of loadedCars.children.slice()) {
        const fix = fixes.find(fix => car.name.startsWith(fix.prefix))!;
        const obj = new THREE.Object3D();
        car.getWorldPosition(obj.position);
        car.position.set(0, fix.y, 0);
        car.rotation.set(...fix.rot);
        car.scale.set(0.01, 0.01, 0.01);
        obj.add(car);
        scene.add(obj);
        cars.push(obj);
      }
    });

    // 创建曲线
    let curve:THREE.CatmullRomCurve3;
    let curveObject:THREE.Line;
    {
      const controlPoints:[number, number, number][] = [
        [1.118281, 5.115846, -3.681386],
        [3.948875, 5.115846, -3.641834],
        [3.960072, 5.115846, -0.240352],
        [3.985447, 5.115846, 4.585005],
        [-3.793631, 5.115846, 4.585006],
        [-3.826839, 5.115846, -14.736200],
        [-14.542292, 5.115846, -14.765865],
        [-14.520929, 5.115846, -3.627002],
        [-5.452815, 5.115846, -3.634418],
        [-5.467251, 5.115846, 4.549161],
        [-13.266233, 5.115846, 4.567083],
        [-13.250067, 5.115846, -13.499271],
        [4.081842, 5.115846, -13.435463],
        [4.125436, 5.115846, -5.334928],
        [-14.521364, 5.115846, -5.239871],
        [-14.510466, 5.115846, 5.486727],
        [5.745666, 5.115846, 5.510492],
        [5.787942, 5.115846, -14.728308],
        [-5.423720, 5.115846, -14.761919],
        [-5.373599, 5.115846, -3.704133],
        [1.004861, 5.115846, -3.641834],
      ];
      const p0 = new THREE.Vector3();
      const p1 = new THREE.Vector3();
      curve = new THREE.CatmullRomCurve3(
        controlPoints.map((p, ndx) => {
          p0.set(...p);
          p1.set(...controlPoints[(ndx + 1) % controlPoints.length]);
          return [
            (new THREE.Vector3()).copy(p0),
            (new THREE.Vector3()).lerpVectors(p0, p1, 0.1),
            (new THREE.Vector3()).lerpVectors(p0, p1, 0.9),
          ];
        }).flat(),
        true,
      );
      {
        const points = curve.getPoints(250);
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({color: 0xff0000});
        curveObject = new THREE.Line(geometry, material);
        curveObject.position.y = -6.21;
        material.depthTest = false;
        curveObject.renderOrder = 1;
        scene.add(curveObject);
      }
    }

    // 创建轨道控制器
    const controls = new OrbitControls(camera, renderer.domElement);

    // 添加坐标轴辅助器
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // 创建两个向量用于路径计算
    const carPosition = new THREE.Vector3();
    const carTarget = new THREE.Vector3();

    // 渲染循环函数 requestAnimationFrame.
    function render(time:number) {
      time *= 0.001;  // convert to seconds

      // if (cars) {
      //   for (const car of cars) {
      //     car.rotation.y = time;
      //   }
      // }

      {
        const pathTime = time * .01;
        const targetOffset = 0.01;
        cars.forEach((car, ndx) => {
          // 一个介于 0 和 1 之间的数字，用于均匀间隔汽车
          const u = pathTime + ndx / cars.length;

          // 获取第一个点
          curve.getPointAt(u % 1, carPosition);
          carPosition.applyMatrix4(curveObject.matrixWorld);

          // 曲线再远点获取第二个点
          curve.getPointAt((u + targetOffset) % 1, carTarget);
          carTarget.applyMatrix4(curveObject.matrixWorld);

          // 把汽车放置在第一个点 （暂时的）
          car.position.copy(carPosition);
          // 汽车的第二个点
          car.lookAt(carTarget);

          // 放置小车在两个点中间
          car.position.lerpVectors(carPosition, carTarget, 0.5);
        });
      }

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
