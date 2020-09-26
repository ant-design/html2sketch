import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <input type="text" value="123456" style={{ textAlign: 'center' }} />
      </div>
    </TestLayout>
  );
};
