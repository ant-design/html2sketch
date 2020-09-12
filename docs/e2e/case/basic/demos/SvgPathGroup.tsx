import React, { FC } from 'react';

import { UpCircleOutlined } from '@ant-design/icons';
import { TestLayout, useElements } from '@e2e-utils';

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
