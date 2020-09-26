import React, { FC } from 'react';
import { useElements, TestLayout } from '@e2e-utils';
// @ts-ignore
import { ReactComponent as Svg } from './svg/test.svg';

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
