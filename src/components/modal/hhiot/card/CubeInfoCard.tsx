import { CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';

export interface CubeInfoCardProps {
  no: string;
  name: string;
  status: string;
  temperature?: number;
  onClose: () => void;
}

/**
 * @author xu.pengfei
 * @date 2025-09-24 16:11:49
 */
export default function CubeInfoCard({no, name, status, temperature, onClose}: CubeInfoCardProps) {
  return (
    <div>
      <div>编号：{no}</div>
      <div>名称：{name}</div>
      <div>状态：{status}</div>
      <div>温度：{temperature || '-'}</div>

      <div style={{ position: 'absolute', top: 0, right: 0 }}>
        <Button type='text' icon={<CloseOutlined />} onClick={onClose} />
      </div>
    </div>
  );
}
