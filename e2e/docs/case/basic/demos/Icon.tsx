import React, { FC } from 'react';

import { UpCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { TestLayout, useElements } from '@test-utils';

const IconTest: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div id="icons" ref={ref}>
        <UpCircleOutlined />
        <PlusOutlined />
      </div>
    </TestLayout>
  );
};
export default IconTest;
