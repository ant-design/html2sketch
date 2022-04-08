import React from 'react';
import { useElements, TestLayout } from '@docs-utils';

import './Position.less';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <span className="ant-radio-inner" />
      </div>
    </TestLayout>
  );
};
