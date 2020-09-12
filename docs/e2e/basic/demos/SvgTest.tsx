import React, { FC } from 'react';
// @ts-ignore
import { ReactComponent as Svg } from './test.svg';

import { useElements, TestLayout } from '@e2e-utils';

const SvgIcons: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Svg />
      </div>
    </TestLayout>
  );
};

export default SvgIcons;
