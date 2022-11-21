import React from 'react';

import './tooltip.less';

const Tooltip = () => (
  <div className="test-tooltip test-tooltip-placement-top">
    <div className="test-tooltip-content">
      <div className="test-tooltip-arrow">
        <span className="test-tooltip-arrow-content"></span>
      </div>
      <div className="test-tooltip-inner" role="tooltip">
        prompt text
      </div>
    </div>
  </div>
);

export default Tooltip;
