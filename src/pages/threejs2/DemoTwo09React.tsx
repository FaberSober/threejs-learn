import React, { useRef } from 'react'
import * as THREE from 'three';
import { Canvas, useThree } from "@react-three/fiber";
import { GizmoHelper, GizmoViewport, Line, OrbitControls, PerspectiveCamera, useGLTF, useHelper } from "@react-three/drei";
import MyHelper from "@/components/modal/MyHelper";

const gltfUrl = '/assets/model/cartoon_lowpoly_small_city_free_pack/scene.gltf'
useGLTF.preload(gltfUrl)

function Model(props:any) {
  const { nodes, materials } = useGLTF(gltfUrl) as any

  return (
    <group {...props} dispose={null}>
      <group position={[-369.069, -90.704, -920.159]}>
        <mesh geometry={nodes.CAR_03_1_World_ap_0.geometry} material={materials.World_ap} position={[22.131, 14.663, -475.071]} rotation={[-Math.PI, 0.732, Math.PI]} scale={1.5} />
        <mesh geometry={nodes.CAR_03_World_ap_0.geometry} material={materials.World_ap} position={[-281.155, 14.663, 108.452]} rotation={[Math.PI, 1.544, -Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_04_World_ap_0.geometry} material={materials.World_ap} position={[-302.703, 21.45, 233.836]} rotation={[0, 1.57, 0]} scale={1.5} />
        <mesh geometry={nodes.CAR_03_2_World_ap_0.geometry} material={materials.World_ap} position={[-478.53, 14.663, 1463.236]} rotation={[Math.PI, -1.457, Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_04_1_World_ap_0.geometry} material={materials.World_ap} position={[-445.674, 21.45, -438.269]} rotation={[0, 1.57, 0]} scale={1.5} />
        <mesh geometry={nodes.Car_04_2_World_ap_0.geometry} material={materials.World_ap} position={[-1097.654, 21.45, 1123.555]} rotation={[Math.PI, -0.007, Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_04_3_World_ap_0.geometry} material={materials.World_ap} position={[449.954, 21.45, 544.783]} rotation={[Math.PI, -1.57, Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_04_4_World_ap_0.geometry} material={materials.World_ap} position={[780.424, 21.45, -35.692]} rotation={[Math.PI, 0.001, -Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_08_4_World_ap8_0.geometry} material={materials['World_ap.8']} position={[938.82, -12.941, 754.086]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={1.5} />
        <mesh geometry={nodes.Car_08_3_World_ap9_0.geometry} material={materials['World_ap.9']} position={[187.866, -12.941, 1351.539]} rotation={[Math.PI / 2, 0, 3.105]} scale={1.5} />
        <mesh geometry={nodes.Car_04_1_2_World_ap_0.geometry} material={materials.World_ap} position={[-719.822, 21.45, 374.476]} rotation={[0, 1.546, 0]} scale={1.5} />
        <mesh geometry={nodes.Car_08_2_World_ap11_0.geometry} material={materials['World_ap.11']} position={[-271.222, -14.732, -95.644]} rotation={[Math.PI / 2, 0, -0.215]} scale={1.5} />
        <mesh geometry={nodes.CAR_03_1_2_World_ap_0.geometry} material={materials.World_ap} position={[81.423, 14.663, 401.827]} rotation={[-Math.PI, 1.558, Math.PI]} scale={1.5} />
        <mesh geometry={nodes.CAR_03_2_2_World_ap_0.geometry} material={materials.World_ap} position={[-661.168, 8.745, 533.575]} rotation={[Math.PI, -1.43, Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_04_2_2_World_ap_0.geometry} material={materials.World_ap} position={[574.365, 21.45, -216.992]} rotation={[Math.PI, 1.355, -Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_08_1_World_ap15_0.geometry} material={materials['World_ap.15']} position={[-581.172, -14.732, -559.034]} rotation={[Math.PI / 2, 0, -Math.PI]} scale={1.5} />
        <mesh geometry={nodes.Car_08_World_ap16_0.geometry} material={materials['World_ap.16']} position={[-6.17, -13.296, 785.616]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={1.5} />
        <mesh geometry={nodes.Car_08_5_World_ap17_0.geometry} material={materials['World_ap.17']} position={[565.849, -12.941, -425.914]} rotation={[Math.PI / 2, 0, -0.037]} scale={1.5} />
        <mesh geometry={nodes.CAR_03_2_3_World_ap_0.geometry} material={materials.World_ap} position={[-932.317, 14.663, -406.065]} rotation={[0, -1.114, 0]} scale={1.5} />
        <mesh geometry={nodes.Car_08_6_World_ap19_0.geometry} material={materials['World_ap.19']} position={[-6.17, -13.296, 1020.423]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={1.5} />
        <mesh geometry={nodes.CAR_03_3_World_ap_0.geometry} material={materials.World_ap} position={[940.966, 14.663, -243.449]} rotation={[0, 0.098, 0]} scale={1.5} />
      </group>
      <group position={[-858.07, -53.779, 24.514]} rotation={[0, Math.PI / 2, 0]}>
        <group position={[-152.772, -44.68, -137.839]}>
          <mesh geometry={nodes.traffic_light_World_ap_0.geometry} material={materials.World_ap} position={[474.599, 66.934, -256.178]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_3_World_ap_0.geometry} material={materials.World_ap} position={[403.842, -14.34, 382.062]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_2_World_ap_0.geometry} material={materials.World_ap} position={[-82.277, -14.34, 382.062]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_1_World_ap_0.geometry} material={materials.World_ap} position={[403.841, -14.34, -257.04]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_World_ap_0.geometry} material={materials.World_ap} position={[-82.277, -14.34, -257.04]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.traffic_light_1_World_ap_0.geometry} material={materials.World_ap} position={[-160.492, 66.934, -256.178]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.traffic_light_2_World_ap_0.geometry} material={materials.World_ap} position={[474.599, 66.934, 379.607]} rotation={[0, -Math.PI / 2, 0]} />
        </group>
        <group position={[1.901, -22.362, -74.237]}>
          <mesh geometry={nodes.Floor_4_World_ap_0.geometry} material={materials.World_ap} position={[0, -2.843, 0]} />
          <mesh geometry={nodes.Floor_World_ap_0.geometry} material={materials.World_ap} position={[0, 2.843, 0]} />
        </group>
        <group position={[-194.202, -41.068, -31.506]}>
          <mesh geometry={nodes.Bed_World_ap_0.geometry} material={materials.World_ap} position={[3.142, -17.393, -42.033]} rotation={[-Math.PI, 0, -Math.PI]} />
          <mesh geometry={nodes.Bushes_3_World_ap_0.geometry} material={materials.World_ap} position={[-1.047, 5.798, -183.504]} rotation={[-1.382, -1.399, -0.042]} />
        </group>
        <group position={[263.144, -41.068, -31.506]}>
          <mesh geometry={nodes.Bed_2_World_ap_0.geometry} material={materials.World_ap} position={[3.142, -17.393, -42.033]} rotation={[-Math.PI, 0, -Math.PI]} />
          <mesh geometry={nodes.Bushes_3_2_World_ap_0.geometry} material={materials.World_ap} position={[-1.047, 5.798, -183.504]} rotation={[-1.382, -1.399, -0.042]} />
        </group>
        <mesh geometry={nodes.House_World_ap_0.geometry} material={materials.World_ap} position={[0, 104.499, 143.579]} rotation={[Math.PI / 2, 0, 0]} />
      </group>
      <group position={[84.723, -88.642, 8.453]}>
        <group position={[-201.533, -9.817, -54.041]}>
          <mesh geometry={nodes.Light_3_2_World_ap_0.geometry} material={materials.World_ap} position={[342.307, -14.34, 382.062]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_2_2_World_ap_0.geometry} material={materials.World_ap} position={[-82.277, -14.34, 382.062]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_1_2_World_ap_0.geometry} material={materials.World_ap} position={[342.307, -14.34, -262.326]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_2_3_World_ap_0.geometry} material={materials.World_ap} position={[-82.277, -14.34, -262.326]} rotation={[0, -Math.PI / 2, 0]} />
        </group>
        <group position={[-66.162, 12.501, 7.296]}>
          <mesh geometry={nodes.Floor_4_2_World_ap_0.geometry} material={materials.World_ap} position={[0, -0.857, 0]} />
          <mesh geometry={nodes.Floor_2_World_ap_0.geometry} material={materials.World_ap} position={[0, 4.828, 0]} />
        </group>
        <group position={[-73.047, -36.012, -229.552]} rotation={[0, -Math.PI / 2, 0]}>
          <mesh geometry={nodes.Firtree_47_World_ap_0.geometry} material={materials.World_ap} position={[-9.323, -17.955, 195.551]} />
          <mesh geometry={nodes.Firtree_3_World_ap_0.geometry} material={materials.World_ap} position={[8.994, 9.329, 112.135]} />
          <mesh geometry={nodes.Firtree_2_World_ap_0.geometry} material={materials.World_ap} position={[4.295, 1.084, 31.603]} />
          <mesh geometry={nodes.Firtree_1_World_ap_0.geometry} material={materials.World_ap} position={[-9.614, -11.245, -45.045]} />
          <mesh geometry={nodes.Firtree_World_ap_0.geometry} material={materials.World_ap} position={[-3.046, -11.96, -133.056]} />
          <mesh geometry={nodes.Cube_7_World_ap_0.geometry} material={materials.World_ap} position={[-19.841, 13.996, -8.476]} />
          <mesh geometry={nodes.Firtree_4_World_ap_0.geometry} material={materials.World_ap} position={[8.208, -0.782, -227.081]} rotation={[0, 0.815, 0]} />
        </group>
        <mesh geometry={nodes.Bench_1_World_ap_0.geometry} material={materials.World_ap} position={[138.129, -19.652, 19.72]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
        <mesh geometry={nodes.House_2_World_ap_0.geometry} material={materials.World_ap} position={[131.582, -47.962, 121.885]} rotation={[0, -Math.PI / 2, 0]} />
        <mesh geometry={nodes.Bench_World_ap_0.geometry} material={materials.World_ap} position={[138.129, -19.652, -109.696]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
      </group>
      <group position={[77.486, -88.642, -941.285]}>
        <group position={[-201.533, -9.817, -54.041]}>
          <mesh geometry={nodes.Light_3_3_World_ap_0.geometry} material={materials.World_ap} position={[342.307, -14.34, 382.062]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_2_4_World_ap_0.geometry} material={materials.World_ap} position={[-82.277, -14.34, 382.062]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_1_3_World_ap_0.geometry} material={materials.World_ap} position={[342.307, -14.34, -262.326]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_3_4_World_ap_0.geometry} material={materials.World_ap} position={[-82.277, -14.34, -262.326]} rotation={[0, -Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_4_World_ap_0.geometry} material={materials.World_ap} position={[456.327, -14.34, 37.562]} rotation={[-Math.PI, 0, Math.PI]} />
          <mesh geometry={nodes.Light_5_World_ap_0.geometry} material={materials.World_ap} position={[456.327, -14.34, 1034.844]} rotation={[-Math.PI, 0, Math.PI]} />
        </group>
        <group position={[-66.162, 12.501, 7.296]}>
          <mesh geometry={nodes.Floor_4_3_World_ap_0.geometry} material={materials.World_ap} position={[0, -0.857, 0]} />
          <mesh geometry={nodes.Floor_3_World_ap_0.geometry} material={materials.World_ap} position={[0, 4.828, 0]} />
        </group>
        <group position={[-305.467, -36.012, 2.868]}>
          <mesh geometry={nodes.Firtree_47_2_World_ap_0.geometry} material={materials.World_ap} position={[-9.322, -17.955, 195.551]} />
          <mesh geometry={nodes.Firtree_3_2_World_ap_0.geometry} material={materials.World_ap} position={[8.994, 9.329, 112.135]} />
          <mesh geometry={nodes.Firtree_2_2_World_ap_0.geometry} material={materials.World_ap} position={[4.295, 1.084, 31.603]} />
          <mesh geometry={nodes.Firtree_1_2_World_ap_0.geometry} material={materials.World_ap} position={[-9.614, -11.245, -45.045]} />
          <mesh geometry={nodes.Firtree_2_3_World_ap_0.geometry} material={materials.World_ap} position={[-3.046, -11.96, -133.056]} />
          <mesh geometry={nodes.Cube_7_2_World_ap_0.geometry} material={materials.World_ap} position={[-18.899, 13.996, -1.578]} />
          <mesh geometry={nodes.Firtree_4_2_World_ap_0.geometry} material={materials.World_ap} position={[8.208, -0.782, -227.081]} rotation={[0, 0.815, 0]} />
        </group>
        <mesh geometry={nodes.Muff_1_World_ap_0.geometry} material={materials.World_ap} position={[111.523, 20.053, 89.049]} />
        <mesh geometry={nodes.Muff_World_ap_0.geometry} material={materials.World_ap} position={[111.523, 20.053, 188.913]} />
        <mesh geometry={nodes.Bench_2_World_ap_0.geometry} material={materials.World_ap} position={[-186.916, -19.652, -230.343]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Behch_World_ap_0.geometry} material={materials.World_ap} position={[-186.916, -19.652, -152.012]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.House_3_World_ap_0.geometry} material={materials.World_ap} position={[-82.285, 5.958, -23.08]} />
      </group>
      <group position={[-938.463, -88.642, -995.244]} rotation={[0, Math.PI / 2, 0]}>
        <group position={[-201.533, -9.817, -54.041]}>
          <mesh geometry={nodes.Light_3_5_World_ap_0.geometry} material={materials.World_ap} position={[413.754, -15.934, 144.867]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_2_5_World_ap_0.geometry} material={materials.World_ap} position={[-134.675, -15.934, 145.283]} rotation={[0, Math.PI / 2, 0]} />
          <mesh geometry={nodes.Light_4_2_World_ap_0.geometry} material={materials.World_ap} position={[154.508, -15.934, -264.629]} rotation={[0, -Math.PI / 2, 0]} />
        </group>
        <group position={[-66.162, 12.501, 7.296]}>
          <mesh geometry={nodes.Floor_4_4_World_ap_0.geometry} material={materials.World_ap} position={[0, 5.03, 0]} />
          <mesh geometry={nodes.Floor_4_5_World_ap_0.geometry} material={materials.World_ap} position={[70.759, 3.391, 277.502]} />
        </group>
        <group position={[-356.014, -14.546, -70.984]} rotation={[Math.PI, 0, Math.PI]}>
          <mesh geometry={nodes.Bed_3_World_ap_0.geometry} material={materials.World_ap} position={[2.856, -15.812, -38.212]} rotation={[-Math.PI, 0, Math.PI]} />
          <mesh geometry={nodes.Bushes_15_World_ap_0.geometry} material={materials.World_ap} position={[-0.952, 5.271, 177.883]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Bushes_2_World_ap_0.geometry} material={materials.World_ap} position={[-0.952, 5.271, -52.62]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Bushes_2_2_World_ap_0.geometry} material={materials.World_ap} position={[-0.952, 5.271, 49.297]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Tree_1_World_ap_0.geometry} material={materials.World_ap} position={[-20.425, -28.776, -82.21]} rotation={[-2.971, -0.123, -1.782]} />
          <mesh geometry={nodes.Tree_2_World_ap_0.geometry} material={materials.World_ap} position={[-26.521, -46.038, 12.043]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Tree_3_World_ap_0.geometry} material={materials.World_ap} position={[-39.243, -27.908, 158.025]} rotation={[-0.171, -0.162, 1.31]} />
        </group>
        <group position={[180.931, -14.546, -70.984]} rotation={[Math.PI, 0, Math.PI]}>
          <mesh geometry={nodes.Bed_4_World_ap_0.geometry} material={materials.World_ap} position={[2.856, -15.812, -38.212]} rotation={[-Math.PI, 0, Math.PI]} />
          <mesh geometry={nodes.Bushes_15_2_World_ap_0.geometry} material={materials.World_ap} position={[-0.952, 5.271, 177.883]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Bushes_2_3_World_ap_0.geometry} material={materials.World_ap} position={[-0.952, 5.271, -52.62]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Bushes_4_World_ap_0.geometry} material={materials.World_ap} position={[-0.952, 5.271, 49.297]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Tree_1_2_World_ap_0.geometry} material={materials.World_ap} position={[-20.425, -28.776, -82.21]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Tree_2_2_World_ap_0.geometry} material={materials.World_ap} position={[-34.946, -27.908, 12.043]} rotation={[-1.382, -1.399, -0.042]} />
          <mesh geometry={nodes.Tree_3_2_World_ap_0.geometry} material={materials.World_ap} position={[-29.61, -27.908, 158.025]} rotation={[-0.171, -0.162, 1.31]} />
        </group>
        <mesh geometry={nodes.Shop_World_ap_0.geometry} material={materials.World_ap} position={[-65.336, -36.633, -123.335]} rotation={[Math.PI / 2, 0, 0]} />
        <mesh geometry={nodes.Trash_World_ap_0.geometry} material={materials.World_ap} position={[46.263, -28.068, 47.978]} rotation={[Math.PI, 0, 0]} />
        <mesh geometry={nodes.Trash_2_World_ap_0.geometry} material={materials.World_ap} position={[-82.156, -28.068, 47.978]} rotation={[Math.PI, 0, 0]} />
      </group>
      <group position={[-549.038, -127.662, -453.774]} rotation={[Math.PI / 2, 0, -Math.PI]}>
        <mesh geometry={nodes.ROAD_World_ap_0.geometry} material={materials.World_ap} />
        <mesh geometry={nodes.traffic_light_2_2_World_ap_0.geometry} material={materials.World_ap} position={[-878.585, -144.633, -92.938]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
        <mesh geometry={nodes.traffic_light_1_2_World_ap_0.geometry} material={materials.World_ap} position={[-241.852, -144.633, -92.938]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
        <mesh geometry={nodes.traffic_light_2_3_World_ap_0.geometry} material={materials.World_ap} position={[-878.585, 175.529, -92.938]} rotation={[-Math.PI / 2, Math.PI / 2, 0]} />
        <mesh geometry={nodes.ROAD_Lines_12_World_ap_0.geometry} material={materials.World_ap} position={[-106.277, -127.72, -0.404]} />
      </group>
      <mesh geometry={nodes.Floor_6_World_ap_0.geometry} material={materials.World_ap} position={[-434.044, -237.443, -451.909]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} />
    </group>
  )
}

// 创建曲线
let curve:THREE.CatmullRomCurve3;
let curveObject:THREE.Line;

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

function Curve() {
  return (
    <Line points={points} color={0xff0000} position={[0,-6.21,0]} depthTest={true} renderOrder={1} />
  )
}

function BasicCityModel() {
  const gltf = useGLTF(gltfUrl) as any

  // 删除场景里的小车
  const root = gltf.scene as THREE.Scene

  const loadedCars = root.getObjectByName('Cars') as THREE.Object3D;
  root.updateMatrixWorld();
  for (const car of loadedCars.children.slice()) {

  }

  // 加载完之后，我们需要开启所有物体的阴影
  root.traverse((obj) => {
    if (obj.castShadow !== undefined) {
      obj.castShadow = true;
      obj.receiveShadow = true;
    }
  });

  // scene.remove(scene.getObjectByName('car_1_World_ap'))

  return <primitive object={gltf.scene}/>
}

function Scene() {
  const light2 = useRef<THREE.DirectionalLight>(null!)
  useHelper(light2, THREE.DirectionalLightHelper)

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
        onUpdate={light => {
          //Set up shadow properties for the light
          light.shadow.mapSize.width = 512; // default
          light.shadow.mapSize.height = 512; // default
          light.shadow.camera.near = 0.5; // default
          light.shadow.camera.far = 1500; // default
          light.shadow.camera.left = -10;
          light.shadow.camera.top = 10;
          light.shadow.camera.right = 10;
          light.shadow.camera.bottom = -10;

          //Create a helper for the shadow camera (optional)
          // const helper = new THREE.CameraHelper( light.shadow.camera );
          // scene.add( helper );
        }}
      />

      <object3D scale={[0.01, 0.01, 0.01]}>
        <BasicCityModel />
      </object3D>

      <Curve />
    </>
  )
}

export default function DemoTwo09React() {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault fov={75} near={0.1} far={2000} position={[10, 10, 10]} />

      <Scene />

      <MyHelper />
      <OrbitControls />
      <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
        <GizmoViewport/>
      </GizmoHelper>
    </Canvas>
  )
}
