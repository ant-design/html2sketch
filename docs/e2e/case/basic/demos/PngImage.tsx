import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref} id="png-url">
        <img
          alt="Png"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{ width: 200, height: 200 }}
        />
        <img
          alt="Png"
          src="//zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          style={{ width: 200, height: 200 }}
        />
      </div>
    </TestLayout>
  );
};
