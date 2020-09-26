import React, { FC } from 'react';
import { TestLayout, useElements } from '@docs-utils';
import { PlusOutlined } from '@ant-design/icons';

const IconTest: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div id="icons" ref={ref}>
        <PlusOutlined />
      </div>
    </TestLayout>
  );
};
export default IconTest;
