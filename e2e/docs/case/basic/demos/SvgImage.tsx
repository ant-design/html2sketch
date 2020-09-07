import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <img
          alt="Ant Design"
          src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
        />
        <div style={{ background: '#F23325' }}>
          <img
            src="https://gw.alipayobjects.com/zos/basement_prod/6442ab44-2cb7-4d30-ba0e-ebce4ecf6116.svg"
            alt="12"
            style={{ marginRight: 5, marginTop: -2, marginLeft: 12 }}
          />
          开启引导
          <img
            src="https://gw.alipayobjects.com/zos/antfincdn/Cd6p2pUocY/path.svg"
            alt="12"
            style={{ marginRight: 5, marginTop: -2, marginLeft: 12 }}
          />
        </div>
      </div>
    </TestLayout>
  );
};
