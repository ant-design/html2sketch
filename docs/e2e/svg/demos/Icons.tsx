import React, { FC } from 'react';
import { useElements, TestLayout } from '@docs-utils';
import { DropboxOutlined, BehanceOutlined } from '@ant-design/icons';

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
