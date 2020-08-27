import React from 'react';
import TestLayout from './utils/TestLayout';
import useElements from './utils/useElements';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <img
          alt="Ant Design"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
      </div>
    </TestLayout>
  );
};
