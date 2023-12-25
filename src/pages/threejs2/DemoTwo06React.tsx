import React, { createContext, useContext, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, PointerLockControls, useHelper } from "@react-three/drei";
import MyFactory from "@/components/modal/MyFactory";
import { Radio, Space } from "antd";


function Scene() {
  const {cameraType} = useContext(ConfigLayoutContext)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  useHelper(cameraRef, THREE.CameraHelper)

  return (
    <>
      <MyFactory showHelper/>

      {/* 场景摄像机 */}
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault={cameraType === CameraType.Scene}
        position={[10, 10, 10]}
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
}

export const ConfigLayoutContext = createContext<ConfigLayoutContextProps>({} as any);

export default function DemoTwo06React() {
  const [controlType, setControlType] = useState<'Orbit' | 'PointerLock'>('Orbit')
  const [cameraType, setCameraType] = useState<CameraType>(CameraType.Global)

  const contextValue: ConfigLayoutContextProps = {
    cameraType,
  }

  return (
    <ConfigLayoutContext.Provider value={contextValue}>
      <div>
        <Canvas>
          <Scene/>

          {/* 全局摄像机 */}
          <PerspectiveCamera
            makeDefault={cameraType === CameraType.Global}
            position={[10, 10, 10]}
          />

          {controlType === 'Orbit' && <OrbitControls/>}
          {controlType === 'PointerLock' && <PointerLockControls/>}
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
        </div>
      </div>
    </ConfigLayoutContext.Provider>
  )
}
