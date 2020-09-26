import React from 'react';
import { useElements, TestLayout } from '@docs-utils';
import './Text.less';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <div
          style={{ width: 120, backgroundColor: 'cyan', textAlign: 'right' }}
        >
          <span className="label">右边是冒号</span>
        </div>
        <div style={{ width: 120, backgroundColor: 'cyan' }}>
          <span className="l-label">左边是冒号</span>
        </div>
      </div>
    </TestLayout>
  );
};
