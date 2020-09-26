import React from 'react';
import { useElements, TestLayout } from '@docs-utils';

export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <div>
          <input type="text" value="左" style={{ textAlign: 'left' }} />
        </div>
        <div>
          <input type="text" value="中" style={{ textAlign: 'center' }} />
        </div>
        <div>
          <input type="text" value="右" style={{ textAlign: 'right' }} />
        </div>
      </div>
    </TestLayout>
  );
};
