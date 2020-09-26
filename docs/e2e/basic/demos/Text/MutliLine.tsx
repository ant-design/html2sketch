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
        <div style={{ width: 200 }}>
          龙东何同三族府满于矿强更红表元组。 龙东何同三族府满于矿强更红表元组。
          龙东何同三族府满于矿强更红表元组。 龙东何同三族府满于矿强更红表元组。
        </div>
      </div>
    </TestLayout>
  );
};
