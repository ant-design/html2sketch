import React from 'react';
import { Radio } from 'antd';
import { useElements, TestLayout } from '@docs-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div
        ref={ref}
        className="radio"
        symbol-name="10.Radio单选框/1.Default默认/1.Off关"
      >
        <Radio>内容</Radio>
      </div>
    </TestLayout>
  );
};
