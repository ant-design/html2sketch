import React, { FC } from 'react';
import { Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { useElements, TestLayout } from '@docs-utils';

/**
 * Button demos
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
