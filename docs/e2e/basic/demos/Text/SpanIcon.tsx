import React from 'react';
import { useElements, TestLayout } from '@docs-utils';
import { AppleOutlined } from '@ant-design/icons';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <span>
          <AppleOutlined />
          Tab 1
        </span>
      </div>
    </TestLayout>
  );
};
