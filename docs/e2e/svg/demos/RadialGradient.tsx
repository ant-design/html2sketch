import React, { FC } from 'react';
import { useElements, TestLayout } from '@docs-utils';
// @ts-ignore
import { ReactComponent as Svg } from './svg/radialGradient.svg';

/**
 * 插画解析 demos
 */
const SvgIllustration: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref} style={{ background: '#1270cf' }}>
        <Svg />
      </div>
    </TestLayout>
  );
};

export default SvgIllustration;
