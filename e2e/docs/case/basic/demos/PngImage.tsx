import React from 'react';
import { useElements, TestLayout } from '@test-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <img
          alt="Png"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{ width: 200, height: 200 }}
        />
      </div>
    </TestLayout>
  );
};