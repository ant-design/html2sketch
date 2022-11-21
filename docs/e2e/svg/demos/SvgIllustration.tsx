import React, { FC } from 'react';
// @ts-ignore
import { ReactComponent as Svg } from './svg/illustration.svg';

/**
 * 插画解析 demos
 */
const SvgIllustration: FC = () => {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Svg />
    </div>
  );
};

export default SvgIllustration;
