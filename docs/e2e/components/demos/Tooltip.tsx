import { useElements, TestLayout } from '@docs-utils';
import React from 'react';

import './tooltip.less';

const Tooltip = () => {
  const { elements, ref } = useElements();
  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
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
      </div>
    </TestLayout>
  );
};

export default Tooltip;
