import React, { FC } from 'react';
import { Radio, Button, Tag, Space } from 'antd';
import styles from './test.less';

/**
 *
 */
export const Test: FC = () => {
  return (
    <div id={'x-tag'}>
      <label htmlFor="0" className={styles.label} title="Header 1">
        Header 1
      </label>

      <div className="ant-space ant-space-horizontal ant-space-align-center">
        <div className="ant-space-item" style={{ marginRight: 8 }}>
          <button type="button" className="ant-btn">
            <span>重 置</span>
          </button>
        </div>
        <div className="ant-space-item" style={{ marginRight: 8 }}>
          <button type="submit" className="ant-btn ant-btn-primary">
            <span>查 询</span>
          </button>
        </div>
        <div className="ant-space-item" style={{ textAlign: 'right' }}>
          <a>
            展开
            <span
              role="img"
              aria-label="down"
              className="anticon anticon-down"
              style={{ marginLeft: '0.5em', transform: 'rotate(0turn)' }}
            >
              <svg
                viewBox="64 64 896 896"
                focusable="false"
                className=""
                data-icon="down"
                width="1em"
                height="1em"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
              </svg>
            </span>
          </a>
        </div>
      </div>
      {/*<WelcomeHeader*/}
      {/*  className="test"*/}
      {/*  title="页面标题"*/}
      {/*  description="我是一段页面描述"*/}
      {/*>*/}
      {/*  <div style={{ padding: 16 }}>children header content</div>*/}
      {/*</WelcomeHeader>*/}
    </div>
  );
};
