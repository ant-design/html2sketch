import { UpCircleOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React, { FC } from 'react';

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
