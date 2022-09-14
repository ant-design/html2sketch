import React from 'react';
import { useElements, TestLayout } from '@docs-utils';
import { Input } from 'antd';

const {TextArea} = Input

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <TextArea placeholder="测试 TextArea" />
      </div>
    </TestLayout>
  );
};
