import React from 'react';
import { useElements, TestLayout } from '@docs-utils';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <div>
          <input type="text" placeholder="垂直居中" style={{ lineHeight: 3 }} />
        </div>
      </div>
    </TestLayout>
  );
};
