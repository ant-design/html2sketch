import React, { FC } from 'react';
import { TestLayout, useElements } from '@e2e-utils';
import { UpCircleOutlined } from '@ant-design/icons';

const IconTest: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div id="icons" ref={ref}>
        <UpCircleOutlined />
      </div>
    </TestLayout>
  );
};
export default IconTest;
