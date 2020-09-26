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
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 300,
          backgroundColor: 'cyan',
        }}
      >
        左边
        <div style={{ alignSelf: 'flex-end' }}>右边</div>
        <span style={{ textAlign: 'center' }}>中间</span>
      </div>
    </TestLayout>
  );
};
