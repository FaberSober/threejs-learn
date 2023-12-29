import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ConfigProvider, DatePicker, Radio } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import enUS from 'antd/es/locale/en_US';
import zhCN from 'antd/es/locale/zh_CN';

// 国际化
import 'dayjs/locale/en';
import 'dayjs/locale/zh-cn';

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
          <p>threejs2 综合功能</p>

          <Link to="/threejs2/DemoTwo06React">threejs2/DemoTwo06: 锁定点控制（React实现）</Link>
          <Link to="/threejs2/DemoTwo16React">threejs2/DemoTwo16: 场站综合功能（React实现）</Link>
        </div>
        <div className='fa-div-line'>
          <p>threejs2</p>
          <Link to="/threejs2/DemoTwo01">threejs2/DemoTwo01: 简单场景+旋转立方体</Link>
          <Link to="/threejs2/DemoTwo01React">threejs2/DemoTwo01: 简单场景+旋转立方体（React实现）</Link>

          <Link to="/threejs2/DemoTwo02">threejs2/DemoTwo02: 太阳+地球+月球运行轨道</Link>
          <Link to="/threejs2/DemoTwo02React">threejs2/DemoTwo02: 太阳+地球+月球运行轨道（React实现）</Link>

          <Link to="/threejs2/DemoTwo03">threejs2/DemoTwo03: 使用threejs坦克、固定路线移动、4个视角摄像机</Link>
          <Link to="/threejs2/DemoTwo03React">threejs2/DemoTwo03: 使用threejs坦克、固定路线移动、4个视角摄像机（React实现）</Link>

          <Link to="/threejs2/DemoTwo04">threejs2/DemoTwo04: 材质详解</Link>
          <Link to="/threejs2/DemoTwo04React">threejs2/DemoTwo04: 材质详解（React实现）</Link>

          <Link to="/threejs2/DemoTwo05">threejs2/DemoTwo05: 纹理</Link>
          <Link to="/threejs2/DemoTwo05React">threejs2/DemoTwo05: 纹理（React实现）</Link>

          <Link to="/threejs2/DemoTwo06React">threejs2/DemoTwo06: 锁定点控制（React实现）</Link>

          <Link to="/threejs2/DemoTwo07">threejs2/DemoTwo07: Gsap动画库基本使用</Link>
          <Link to="/threejs2/DemoTwo07React">threejs2/DemoTwo07: Gsap动画库基本使用（React实现）</Link>

          <Link to="/threejs2/DemoTwo08React">threejs2/DemoTwo08: React Spring动画库基本使用（React实现）</Link>

          <Link to="/threejs2/DemoTwo09">threejs2/DemoTwo09: GLTF动态城市</Link>
          <Link to="/threejs2/DemoTwo09React">threejs2/DemoTwo09: GLTF动态城市（React实现）</Link>

          <Link to="/threejs2/DemoTwo10">threejs2/DemoTwo10: shadow阴影</Link>

          <Link to="/threejs2/DemoTwo11">threejs2/DemoTwo11: Raycaster射线检测</Link>
          <Link to="/threejs2/DemoTwo11React">threejs2/DemoTwo11: Raycaster射线检测（React实现）</Link>

          <Link to="/threejs2/DemoTwo12">threejs2/DemoTwo12: 人物动画</Link>
          <Link to="/threejs2/DemoTwo12React">threejs2/DemoTwo12: 人物动画（React实现）</Link>

          <Link to="/threejs2/DemoTwo13React">threejs2/DemoTwo13: Raycaster射线检测，控制方块移动（React实现）</Link>

          <Link to="/threejs2/DemoTwo14React">threejs2/DemoTwo14: Raycaster射线检测，控制人物移动（React实现）</Link>

          <Link to="/threejs2/DemoTwo15React">threejs2/DemoTwo15: 第三人称实现：PointLockControl，键盘控制人物移动（React实现）</Link>

          <Link to="/threejs2/DemoTwo16React">threejs2/DemoTwo16: 场站综合功能（React实现）</Link>

          <Link to="/threejs2/DemoTwo17">threejs2/DemoTwo17: 光墙光幕效果</Link>
          <Link to="/threejs2/DemoTwo17React">threejs2/DemoTwo17: 光墙光幕效果（React实现）</Link>
        </div>
        <div>
          <p>index.tsx</p>
          <Link to="/threejs/demo01">threejs/demo01: just use threejs</Link>
          <br/>
          <Link to="/threejs/demo02">threejs/demo02: use @react-three/fiber</Link>
          <br/>
          <Link to="/threejs/demo03">threejs/demo03: use @react-three/fiber @react-three/drei</Link>
          <br/>
          <Link to="/threejs/demo04">threejs/demo04: use @react-three/drei load gltf</Link>
          <br/>
          <Link to="/threejs/Demo05">threejs/demo05: load monkey glb</Link>
          <br/>
          <Link to="/threejs/Demo06">threejs/demo06: load simple-factory gltf</Link>
          <br/>
          <Link to="/threejs/Demo07">threejs/demo07: drei</Link>
          <br/>
          <Link to="/threejs/Demo08">threejs/demo08: Environment</Link>
          <br/>
          <Link to="/threejs/Demo09">threejs/demo09: Sky</Link>
          <br/>
          <Link to="/threejs/Demo10Sparkles">threejs/demo10: Sparkles</Link>
          <br/>
          <Link to="/threejs/Demo11Spotlight">threejs/demo11: Spotlight</Link>
          <br/>
          <Link to="/threejs/Demo12Stage">threejs/demo12: Spotlight</Link>
          <br/>
          <Link to="/threejs/Demo13Star">threejs/demo13: Star</Link>
          <br/>
          <Link to="/threejs/Demo14WireframeScene">threejs/demo14: WireframeScene</Link>
          <br/>
          <Link to="/threejs/Demo15UseMatcapTexture">threejs/demo15: useMatcapTexture</Link>
          <br/>
          <Link to="/threejs/Demo16UseNormalTexture">threejs/demo16: useNormalTexture</Link>
          <br/>
          <Link to="/threejs/Demo17Adaptive">threejs/demo17: Adaptive</Link>
          <br/>
          <Link to="/threejs/Demo18BasicPointsBuffer">threejs/Demo18: BasicPointsBuffer</Link>
          <br/>
          <Link to="/threejs/Demo19BasicPointsInstances">threejs/Demo19: BasicPointsInstances</Link>
          <br/>
          <Link to="/threejs/Demo20BasicPointsInstancesSelection">threejs/Demo20 - BasicPointsInstancesSelection</Link>
          <br/>
          <Link to="/threejs/Demo21Segments">threejs/Demo21 - Segments</Link>
          <br/>
          <Link to="/threejs/Demo22AnimatedSegments">threejs/Demo22 - AnimatedSegments</Link>
          <br/>
          <Link to="/threejs/Demo23FaceControls">threejs/Demo23 - FaceControls</Link>
          <br/>
          <Link to="/threejs/Demo24FirstPersonControls">threejs/Demo24 - FirstPersonControls</Link>
          <br/>
          <Link to="/threejs/Demo25KeyboardControls">threejs/Demo25 - KeyboardControls</Link>
          <br/>
          <Link to="/threejs/Demo26MapControls">threejs/Demo26 - MapControls</Link>
          <br/>
          <Link to="/threejs/Demo27Outlines">threejs/Demo27 - Outlines</Link>
          <br/>
          <Link to="/threejs/Demo28Svg">threejs/Demo28 - Svg</Link>
          <br/>
          <Link to="/threejs/Demo29UseAnimations">threejs/Demo29 - UseAnimations</Link>
          <br/>
          <Link to="/threejs/Demo30Stats">threejs/Demo30 - Stats</Link>
          <br/>
          <Link to="/threejs/Demo31StatsGl">threejs/Demo31 - StatsGl</Link>
          <br/>
          <Link to="/threejs/Demo32GizmoHelper">threejs/Demo32 - GizmoHelper</Link>
          <br/>
          <Link to="/threejs/Demo33MeshRefractionMaterial">threejs/Demo33 - MeshRefractionMaterial</Link>
          <br/>
          <Link to="/threejs/Demo34FirstPersonControls2">threejs/Demo34 - 第一人称</Link>
          <br/>
          <Link to="/threejs/Demo35KeyboardControls2">threejs/Demo35 - 键盘控制角色</Link>
          <br/>
          <Link to="/threejs/demo36">threejs/demo36 - 使用threejs坦克、固定路线移动、4个视角摄像机</Link>
          <br/>
        </div>
        <div style={{marginTop: 12}}>
          <Radio.Group
            options={[
              {label: 'default', value: 'default'},
              {label: 'green', value: 'green'},
            ]}
            onChange={(e) => changeTheme(e.target.value)}
            value={theme}
            optionType="button"
            buttonStyle="solid"
          />
        </div>

        <div style={{marginTop: 12}}>
          <Radio.Group
            options={[
              {label: 'English', value: 'enUS'},
              {label: '中文', value: 'zhCN'},
            ]}
            onChange={(e) => changeLocal(e.target.value)}
            value={local}
            optionType="button"
            buttonStyle="solid"
          />
        </div>

        <div style={{marginTop: 12}}>
          <Button type="primary" icon={<HeartOutlined/>}>
            Hello
          </Button>
        </div>

        <div style={{marginTop: 12}}>
          <DatePicker/>
        </div>

        <div style={{marginTop: 24}}>
          <span className="foo">SCSS</span>
        </div>
      </div>
    </ConfigProvider>
  );
}
