import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ConfigProvider, DatePicker, Radio } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

// 国际化
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';
import Demo10Sparkles from "@/pages/threejs/Demo10Sparkles";
import Demo13Star from "@/pages/threejs/Demo13Star";
import Demo14WireframeScene from "@/pages/threejs/Demo14WireframeScene";
import Demo15UseMatcapTexture from "@/pages/threejs/Demo15UseMatcapTexture";
import Demo16UseNormalTexture from "@/pages/threejs/Demo16UseNormalTexture";
import Demo17Adaptive from "@/pages/threejs/Demo17Adaptive";
import Demo18BasicPointsBuffer from "@/pages/threejs/Demo18BasicPointsBuffer";
import Demo19BasicPointsInstances from "@/pages/threejs/Demo19BasicPointsInstances";
import Demo20BasicPointsInstancesSelection from "@/pages/threejs/Demo20BasicPointsInstancesSelection";
import Demo21Segments from "@/pages/threejs/Demo21Segments";
import Demo23FaceControls from "@/pages/threejs/Demo23FaceControls";
import Demo25KeyboardControls from "@/pages/threejs/Demo25KeyboardControls";
import Demo26MapControls from "@/pages/threejs/Demo26MapControls";
import Demo27Outlines from "@/pages/threejs/Demo27Outlines";
import Demo28Svg from "@/pages/threejs/Demo28Svg";
import Demo29UseAnimations from "@/pages/threejs/Demo29UseAnimations";
import Demo30Stats from "@/pages/threejs/Demo30Stats";
import Demo31StatsGl from "@/pages/threejs/Demo31StatsGl";
import Demo32GizmoHelper from "@/pages/threejs/Demo32GizmoHelper";
import Demo33MeshRefractionMaterial from "@/pages/threejs/Demo33MeshRefractionMaterial";
import Demo34FirstPersonControls2 from "@/pages/threejs/Demo34FirstPersonControls2";

export default function App() {
  const [theme, setTheme] = useState('default');
  const [local, setLocal] = useState('enUS');

  useEffect(() => {
    setTheme('default');
  }, []);

  function changeTheme(v: string) {
    setTheme(v);

    ConfigProvider.config({
      theme: {
        primaryColor: v === 'default' ? '#1890FF' : '#25b864',
      },
    });
  }

  function changeLocal(v: string) {
    setLocal(v);
  }

  return (
    <ConfigProvider locale={local === 'zhCN' ? zhCN : enUS}>
      <div>
        <div className='fa-div-line'>
          <p>threejs2</p>
          <Link to="/threejs2/DemoTwo01">threejs2/DemoTwo01: 简单场景+旋转立方体</Link>
          <Link to="/threejs2/DemoTwo01React">threejs2/DemoTwo01React: 简单场景+旋转立方体（React实现）</Link>

          <Link to="/threejs2/DemoTwo02">threejs2/DemoTwo02: 太阳+地球+月球运行轨道</Link>

          <Link to="/threejs2/DemoTwo03">threejs2/DemoTwo03: 使用threejs坦克、固定路线移动、4个视角摄像机</Link>
        </div>
        <div>
          <p>index.tsx</p>
          <Link to="/threejs/demo01">threejs/demo01: just use threejs</Link>
          <br />
          <Link to="/threejs/demo02">threejs/demo02: use @react-three/fiber</Link>
          <br />
          <Link to="/threejs/demo03">threejs/demo03: use @react-three/fiber @react-three/drei</Link>
          <br />
          <Link to="/threejs/demo04">threejs/demo04: use @react-three/drei load gltf</Link>
          <br />
          <Link to="/threejs/Demo05">threejs/demo05: load monkey glb</Link>
          <br />
          <Link to="/threejs/Demo06">threejs/demo06: load simple-factory gltf</Link>
          <br />
          <Link to="/threejs/Demo07">threejs/demo07: drei</Link>
          <br />
          <Link to="/threejs/Demo08">threejs/demo08: Environment</Link>
          <br />
          <Link to="/threejs/Demo09">threejs/demo09: Sky</Link>
          <br />
          <Link to="/threejs/Demo10Sparkles">threejs/demo10: Sparkles</Link>
          <br />
          <Link to="/threejs/Demo11Spotlight">threejs/demo11: Spotlight</Link>
          <br />
          <Link to="/threejs/Demo12Stage">threejs/demo12: Spotlight</Link>
          <br />
          <Link to="/threejs/Demo13Star">threejs/demo13: Star</Link>
          <br />
          <Link to="/threejs/Demo14WireframeScene">threejs/demo14: WireframeScene</Link>
          <br />
          <Link to="/threejs/Demo15UseMatcapTexture">threejs/demo15: useMatcapTexture</Link>
          <br />
          <Link to="/threejs/Demo16UseNormalTexture">threejs/demo16: useNormalTexture</Link>
          <br />
          <Link to="/threejs/Demo17Adaptive">threejs/demo17: Adaptive</Link>
          <br />
          <Link to="/threejs/Demo18BasicPointsBuffer">threejs/Demo18: BasicPointsBuffer</Link>
          <br />
          <Link to="/threejs/Demo19BasicPointsInstances">threejs/Demo19: BasicPointsInstances</Link>
          <br />
          <Link to="/threejs/Demo20BasicPointsInstancesSelection">threejs/Demo20 - BasicPointsInstancesSelection</Link>
          <br />
          <Link to="/threejs/Demo21Segments">threejs/Demo21 - Segments</Link>
          <br />
          <Link to="/threejs/Demo22AnimatedSegments">threejs/Demo22 - AnimatedSegments</Link>
          <br />
          <Link to="/threejs/Demo23FaceControls">threejs/Demo23 - FaceControls</Link>
          <br />
          <Link to="/threejs/Demo24FirstPersonControls">threejs/Demo24 - FirstPersonControls</Link>
          <br />
          <Link to="/threejs/Demo25KeyboardControls">threejs/Demo25 - KeyboardControls</Link>
          <br />
          <Link to="/threejs/Demo26MapControls">threejs/Demo26 - MapControls</Link>
          <br />
          <Link to="/threejs/Demo27Outlines">threejs/Demo27 - Outlines</Link>
          <br />
          <Link to="/threejs/Demo28Svg">threejs/Demo28 - Svg</Link>
          <br />
          <Link to="/threejs/Demo29UseAnimations">threejs/Demo29 - UseAnimations</Link>
          <br />
          <Link to="/threejs/Demo30Stats">threejs/Demo30 - Stats</Link>
          <br />
          <Link to="/threejs/Demo31StatsGl">threejs/Demo31 - StatsGl</Link>
          <br />
          <Link to="/threejs/Demo32GizmoHelper">threejs/Demo32 - GizmoHelper</Link>
          <br />
          <Link to="/threejs/Demo33MeshRefractionMaterial">threejs/Demo33 - MeshRefractionMaterial</Link>
          <br />
          <Link to="/threejs/Demo34FirstPersonControls2">threejs/Demo34 - 第一人称</Link>
          <br />
          <Link to="/threejs/Demo35KeyboardControls2">threejs/Demo35 - 键盘控制角色</Link>
          <br />
          <Link to="/threejs/demo36">threejs/demo36 - 使用threejs坦克、固定路线移动、4个视角摄像机</Link>
          <br />
        </div>
        <div style={{ marginTop: 12 }}>
          <Radio.Group
            options={[
              { label: 'default', value: 'default' },
              { label: 'green', value: 'green' },
            ]}
            onChange={(e) => changeTheme(e.target.value)}
            value={theme}
            optionType="button"
            buttonStyle="solid"
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <Radio.Group
            options={[
              { label: 'English', value: 'enUS' },
              { label: '中文', value: 'zhCN' },
            ]}
            onChange={(e) => changeLocal(e.target.value)}
            value={local}
            optionType="button"
            buttonStyle="solid"
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <Button type="primary" icon={<HeartOutlined />}>
            Hello
          </Button>
        </div>

        <div style={{ marginTop: 12 }}>
          <DatePicker />
        </div>

        <div style={{ marginTop: 24 }}>
          <span className="foo">SCSS</span>
        </div>
      </div>
    </ConfigProvider>
  );
}
