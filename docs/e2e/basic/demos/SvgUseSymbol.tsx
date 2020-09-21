import React, { FC } from 'react';
// @ts-ignore
import { ReactComponent as SvgLink } from './symbolLink.svg';
// @ts-ignore
import { ReactComponent as Svg } from './useSymbol.svg';

import { useElements, TestLayout } from '@e2e-utils';

const SvgIcons: FC = () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <SvgLink />
      <div
        ref={ref}
        style={{ background: '#3f3f3f', color: 'rgba(255,255,255,0.65)' }}
      >
        <Svg />
      </div>
    </TestLayout>
  );
};

export default SvgIcons;
