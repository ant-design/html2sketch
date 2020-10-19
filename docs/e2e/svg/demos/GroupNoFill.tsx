import React, { FC } from 'react';
import { useElements, TestLayout } from '@docs-utils';
// @ts-ignore
import { ReactComponent as Svg } from './svg/noFill.svg';

const GroupNoFill: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Svg />
      </div>
    </TestLayout>
  );
};

export default GroupNoFill;
