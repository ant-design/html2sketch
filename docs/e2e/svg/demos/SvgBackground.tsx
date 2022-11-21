import React, { FC } from 'react';
// @ts-ignore
import { ReactComponent as Svg } from './svg/background.svg';

/**
 * 插画解析 demos
 */
const SvgIllustration: FC = () => {
  return (
    <div style={{ background: '#1270cf' }}>
      <Svg />
    </div>
  );
};

export default SvgIllustration;
