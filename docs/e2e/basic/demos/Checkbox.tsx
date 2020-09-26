import React, { FC } from 'react';
import { Checkbox } from 'antd';
import { useElements, TestLayout } from '@docs-utils';

const SwitchDemo: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Checkbox checked>no checked</Checkbox>
        <Checkbox>Checkbox</Checkbox>
      </div>
    </TestLayout>
  );
};

export default SwitchDemo;
