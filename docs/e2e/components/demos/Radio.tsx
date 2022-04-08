import React from 'react';
import { Radio } from 'antd';
import { useElements, TestLayout } from '@docs-utils';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Radio checked>单选项</Radio>
      </div>
    </TestLayout>
  );
};
