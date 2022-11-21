import React, { FC } from 'react';
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

/**
 * Button demos
 */
const SvgGroupCase: FC = () => {
  return (
    <Button id="button" icon={<UpCircleOutlined />} type="primary">
      文本
    </Button>
  );
};

export default SvgGroupCase;
