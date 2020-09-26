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
        <span className="inline-block">
          共 <strong>1000</strong> 条
        </span>
      </div>
    </TestLayout>
  );
};
