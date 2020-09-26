import React from 'react';
import { useElements, TestLayout } from '@docs-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <span>
          共 <strong>2</strong> 条
        </span>
      </div>
    </TestLayout>
  );
};
