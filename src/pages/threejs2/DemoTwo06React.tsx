import React, { createContext, useContext, useRef, useState } from 'react'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { Billboard, Html, OrbitControls, PerspectiveCamera, PointerLockControls, Text, useHelper } from "@react-three/drei";
import MyFactory from "@/components/modal/myFactory/MyFactory";
import { Checkbox, Radio, Space } from "antd";
import MyHelper from "@/components/modal/MyHelper";


function Scene() {
  const {cameraType, showHelper} = useContext(ConfigLayoutContext)
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!)

  useHelper(showHelper && cameraRef, THREE.CameraHelper)

  return (
    <>
      <MyFactory showHelper={showHelper} />

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


          {/* 标志广告牌 */}
          <Billboard follow={true} lockY={false} position={[-12, 12, -12]}>
            {/*<Plane args={[10,10]} material-color="red" />*/}
            {/*<Text fontSize={1} color={'#EC2D2D'}>摄像头</Text>*/}
            <Html center>
              <div style={{ background: '#FFFFFF', color: '#333', padding: 2, borderRadius: 2, width: 50, cursor: 'pointer' }} onClick={() => console.log('click div')}>
                <span>摄像头</span>
              </div>
            </Html>
          </Billboard>

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
