import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';
import { AppleOutlined } from '@ant-design/icons';
import './Text.less';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <span>
          <AppleOutlined />
          Tab 1
        </span>
        <div id="text">123</div>
        <div
          id="ellipsis"
          style={{
            paddingLeft: 8,
            width: 190,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          位全眼等越子亲作向下入第金社准。
        </div>
        <div style={{ width: 190, textAlign: 'right' }}>位全眼</div>
        <span style={{ display: 'block', width: 190, textAlign: 'right' }}>
          眼位全
        </span>
        <div style={{ width: 100, textAlign: 'right' }}>
          <span className="label">亲作向</span>
        </div>
        <span
          style={{
            display: 'flex',
            width: 100,
            height: 80,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          特别号
        </span>
        <div
          style={{
            display: 'flex',
            width: 200,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          1231253
        </div>
      </div>
    </TestLayout>
  );
};
