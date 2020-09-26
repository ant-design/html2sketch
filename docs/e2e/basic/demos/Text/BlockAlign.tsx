import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';
import './Text.less';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        左边
        <div style={{ width: 190, textAlign: 'right' }}>右边</div>
        <span style={{ display: 'block', width: 190, textAlign: 'center' }}>
          中间
        </span>
        <span
          style={{ display: 'inline-block', width: 190, textAlign: 'center' }}
        >
          中间
        </span>
      </div>
    </TestLayout>
  );
};
