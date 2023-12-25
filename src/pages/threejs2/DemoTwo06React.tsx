import React, { createContext, useContext, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Billboard, CycleRaycast, GizmoHelper, GizmoViewport, Html, OrbitControls, PerspectiveCamera, PointerLockControls, Text, useHelper } from "@react-three/drei";
import MyFactory from "@/components/modal/myFactory/MyFactory";
import { Checkbox, Radio, Space } from "antd";
import MyHelper from "@/components/modal/MyHelper";


function Scene() {
  const {cameraType, showHelper} = useContext(ConfigLayoutContext)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)
  const light1 = React.useRef<THREE.DirectionalLight>(null!)
  const light2 = React.useRef<THREE.DirectionalLight>(null!)

  useHelper(showHelper && cameraRef, THREE.CameraHelper)
  useHelper(showHelper && light1, THREE.DirectionalLightHelper)
  useHelper(showHelper && light2, THREE.DirectionalLightHelper)

  return (
    <>
      {/* 点光源1 */}
      <directionalLight ref={light1} color={0xffffff} intensity={1} position={[-20, 20, 20]} castShadow/>

      {/* 点光源2 */}
      <directionalLight ref={light2} color={0xffffff} intensity={1} position={[20, 10, 20]}/>

      <MyFactory showHelper={showHelper} />

      <CycleRaycast
        onChanged={(objects, cycle) => {
          console.log(objects, cycle)
          return null;
        }}
      />

      {/* 场景摄像机 */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault={cameraType === CameraType.Scene}
        position={[10, 10, 10]}
        fov={40}
        near={1}
        far={20}
      />
    </>
  )
}

enum CameraType {
  Global,
  Scene,
}

export interface ConfigLayoutContextProps {
  cameraType: CameraType;
  showHelper: boolean;
}

export const ConfigLayoutContext = createContext<ConfigLayoutContextProps>({} as any);

export default function DemoTwo06React() {
  const [controlType, setControlType] = useState<'Orbit' | 'PointerLock'>('Orbit')
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.Global)
  const [showHelper, setShowHelper] = useState(true)

  const contextValue: ConfigLayoutContextProps = {
    cameraType,
    showHelper,
  }

  return (
    <ConfigLayoutContext.Provider value={contextValue}>
      <div>
        <Canvas>
          <Scene/>

          {/* 全局摄像机 */}
          <PerspectiveCamera
            makeDefault={cameraType === CameraType.Global}
            position={[30, 30, 30]}
          />

          {controlType === 'Orbit' && <OrbitControls/>}
          {controlType === 'PointerLock' && <PointerLockControls/>}


          <GizmoHelper alignment='bottom-right' margin={[100, 100]}>
            <GizmoViewport/>
          </GizmoHelper>
        </Canvas>

        <div style={{marginTop: 12, display: 'flex', flexDirection: 'column'}}>
          <Space style={{marginTop: 12}}>
            <div>控制方式：</div>
            <Radio.Group value={controlType} onChange={e => setControlType(e.target.value)} buttonStyle="solid">
              <Radio.Button value='Orbit'>Orbit</Radio.Button>
              <Radio.Button value='PointerLock'>PointerLock</Radio.Button>
            </Radio.Group>
          </Space>

          <Space style={{marginTop: 12}}>
            <div>镜头选择：</div>
            <Radio.Group value={cameraType} onChange={e => setCameraType(e.target.value)} buttonStyle="solid">
              <Radio.Button value={CameraType.Global}>全局摄像机</Radio.Button>
              <Radio.Button value={CameraType.Scene}>场景摄像机</Radio.Button>
            </Radio.Group>
          </Space>

          <Space style={{marginTop: 12}}>
            <div>showHelper：</div>
            <Checkbox checked={showHelper} onChange={e => setShowHelper(e.target.checked)}>
              showHelper
            </Checkbox>
          </Space>
        </div>
      </div>
    </ConfigLayoutContext.Provider>
  )
}
