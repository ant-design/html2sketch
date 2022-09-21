import React from 'react';
import { Switch } from 'antdV5';
import { useElements, TestLayout } from '@docs-utils';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Switch checkedChildren="on" unCheckedChildren="off" />
      </div>
    </TestLayout>
  );
};
