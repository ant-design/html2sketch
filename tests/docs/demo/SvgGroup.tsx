import React, { FC } from 'react';
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';

import TestLayout from './utils/TestLayout';
import useElements from './utils/useElements';

/**
 * Button demo
 */
const SvgGroupCase: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <Button ref={ref} id="button" icon={<UpCircleOutlined />} type="primary">
        文本
      </Button>
    </TestLayout>
  );
};

export default SvgGroupCase;
