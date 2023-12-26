import React, { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, Line, OrbitControls, PerspectiveCamera, useGLTF, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";
import { Line2 } from "three/examples/jsm/lines/Line2";
import { Switch } from "antd";

const gltfUrl = '/assets/model/cartoon_lowpoly_small_city_free_pack/scene.gltf'
useGLTF.preload(gltfUrl)


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

// 创建曲线
let curve:THREE.CatmullRomCurve3;

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

const points = curve.getPoints(250);


let cars:any[] = [];
// 创建两个向量用于路径计算
const carPosition = new THREE.Vector3();
const carTarget = new THREE.Vector3();

function BasicCityModel() {
  const scene = useThree((state) => state.scene)
  const lineRef = useRef<Line2>(null!);
  const gltf = useGLTF(gltfUrl) as any

  const root = gltf.scene as THREE.Scene

  // 加载完之后，我们需要开启所有物体的阴影
  root.traverse((obj) => {
    if (obj.castShadow !== undefined) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  // scene.remove(scene.getObjectByName('car_1_World_ap'))

  useEffect(() => {
    console.log('BasicCityModel.useEffect', gltf, cars)
    // 打印模型结构
    // console.log(dumpObject(root).join('\n'));

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
      // 将car模型追加到obj对象下作为子节点，那么car就不会挂载在原来的gltf模型内部了。
      obj.add(car);
      // 将obj添加到scene场景中，作为场景的直接子节点。控制obj的position来控制小车的位置。因为obj直接挂载在scene下，使用的是scene场景的世界坐标系。
      // 如果不是控制obj，而是直接控制car的位置，因为car挂载在gltf模型内部，自身的position是gltf内部的坐标系。将curve线段上的点（世界坐标系）直接应用到car上，会导致位置错误。
      // 所以需要使用car.matrixWorld来获取car的世界坐标系。
      scene.add(obj);
      cars.push(obj);
    }
    // 打印模型结构
    // console.log(dumpObject(root).join('\n'));
  }, [])

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    // console.log('cars', cars)
    const pathTime = time * .01;
    const targetOffset = 0.01;
    cars.forEach((car, ndx) => {
      // 一个介于 0 和 1 之间的数字，用于均匀间隔汽车
      const u = pathTime + ndx / cars.length;

      // 获取第一个点
      curve.getPointAt(u % 1, carPosition);
      carPosition.applyMatrix4(lineRef.current.matrixWorld);

      // 曲线再远点获取第二个点
      curve.getPointAt((u + targetOffset) % 1, carTarget);
      carTarget.applyMatrix4(lineRef.current.matrixWorld);

      // 把汽车放置在第一个点 （暂时的）
      car.position.copy(carPosition);
      // 汽车的第二个点
      car.lookAt(carTarget);

      // 放置小车在两个点中间
      car.position.lerpVectors(carPosition, carTarget, 0.5);
    });
  })


  return (
    <>
      <object3D scale={[0.01, 0.01, 0.01]}>
        <primitive object={gltf.scene}/>
      </object3D>
      <Line ref={lineRef} points={points} color={0xff0000} position={[0, -6.21, 0]} depthTest={true} renderOrder={1}/>
    </>
  )
}

function Scene() {
  const light2 = useRef<THREE.DirectionalLight>(null!)
  const camera = useRef<THREE.OrthographicCamera>(null!)
  // useHelper(light2, THREE.DirectionalLightHelper)
  // useHelper(camera, THREE.CameraHelper)

  const scene = useThree((state) => state.scene)

  return (
    <>
      <ambientLight intensity={0.8}/>
      <directionalLight
        ref={light2}
        position={[0, 5, 5]}
        color={0xFFFFFF}
        intensity={3}
        castShadow
        // onUpdate={light => {
        //   //Set up shadow properties for the light
        //   light.shadow.mapSize.width = 512; // default
        //   light.shadow.mapSize.height = 512; // default
        //   light.shadow.camera.near = 0.5; // default
        //   light.shadow.camera.far = 1500; // default
        //   light.shadow.camera.left = -10;
        //   light.shadow.camera.top = 10;
        //   light.shadow.camera.right = 10;
        //   light.shadow.camera.bottom = -10;
        //
        //   //Create a helper for the shadow camera (optional)
        //   // const helper = new THREE.CameraHelper( light.shadow.camera );
        //   // scene.add( helper );
        // }}
        shadow-mapSize={[1024, 1024]}
      >
        {/* 使用react-three-fiber的嵌套属性 */}
        <orthographicCamera ref={camera} attach="shadow-camera" args={[-20, 20, 20, -20]}/>
      </directionalLight>

      <BasicCityModel/>
    </>
  )
}

export default function DemoTwo09React() {
  const [load, setLoad] = useState(false)

  return (
    <div>
      <Canvas shadows>
        <PerspectiveCamera makeDefault fov={75} near={0.1} far={2000} position={[10, 10, 10]} />

        <Scene />

        {/*<MyHelper />*/}
        <OrbitControls />
        <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
          <GizmoViewport/>
        </GizmoHelper>
      </Canvas>

      <Switch checked={load} onChange={e => setLoad(e)} />
    </div>
  )
}
