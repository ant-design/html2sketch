import React from 'react';

import './Text.less';

/**
 *
 */
export default () => {
  return (
    <>
      左边
      <div style={{ width: 190, textAlign: 'right' }}>右边</div>
      <span style={{ display: 'block', width: 190, textAlign: 'center' }}>
        中间
      </span>
      <span
        style={{ display: 'inline-block', width: 190, textAlign: 'center' }}
      >
        中间
      </span>
    </>
  );
};
