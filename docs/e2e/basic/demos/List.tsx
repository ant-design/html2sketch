import React from 'react';
import { useElements, TestLayout } from '@docs-utils';
import './List.css';

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <div className="tea-tabs tea-tabs--vertical">
          前置对象
          <div className="tea-tabs__tabbar">
            <div className="tea-tabs__scroll-area">
              <ul className="tea-tabs__tablist">
                <li className="tea-tabs__tabitem">
                  <a className="tea-tabs__tab is-active">基本信息</a>
                </li>
                <li className="tea-tabs__tabitem">
                  <a className="tea-tabs__tab">弹性网卡</a>
                </li>
                <li className="tea-tabs__tabitem">
                  <a className="tea-tabs__tab is-disabled">安全组</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="tea-tabs__tabpanel">基本信息</div>
        </div>
      </div>
    </TestLayout>
  );
};
