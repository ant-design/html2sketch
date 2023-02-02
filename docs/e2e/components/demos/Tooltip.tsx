import { Tooltip } from 'antd';
import React from 'react';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureTooltip } = Tooltip;

const Demo = () => <PureTooltip title="prompt text" />;

export default Demo;
