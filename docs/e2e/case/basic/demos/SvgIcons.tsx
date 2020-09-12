import React, { FC } from 'react';
import { DropboxOutlined, BehanceOutlined } from '@ant-design/icons';

import { useElements, TestLayout } from '@e2e-utils';

const SvgIcons: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <DropboxOutlined />
        <BehanceOutlined />
      </div>
    </TestLayout>
  );
};

export default SvgIcons;
