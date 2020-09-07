import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';
import { Input } from 'antd';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Input placeholder="测试输入框" />
      </div>
    </TestLayout>
  );
};
