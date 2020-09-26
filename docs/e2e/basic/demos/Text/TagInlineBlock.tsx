import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <span
          style={{
            color: '#1890ff',
            background: '#e6f7ff',
            borderColor: '#91d5ff',
            padding: '0 7px',
            height: 22,
            display: 'inline-block',
            fontSize: 12,
            lineHeight: '20px',
            border: '1px solid #d9d9d9',
            borderRadius: 2,
          }}
        >
          蓝色
        </span>
      </div>
    </TestLayout>
  );
};
