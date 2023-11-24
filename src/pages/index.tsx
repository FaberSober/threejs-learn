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
          <Link to="/threejs/inner/Demo11Spotlight">threejs/demo11: Spotlight</Link>
          <br />
          <Link to="/threejs/inner/Demo12Stage">threejs/demo12: Spotlight</Link>
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
