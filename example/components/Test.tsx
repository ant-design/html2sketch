import React, { FC } from 'react';
import { Radio, Button } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
import { WelcomeHeader } from '@alipay/tech-ui';

/**
 *
 */
export const Test: FC = () => {
  return (
    <div>
      <WelcomeHeader
        className="test"
        title="页面标题"
        description="我是一段页面描述"
      >
        <div style={{ padding: 16 }}>children header content</div>
      </WelcomeHeader>
    </div>
  );
};
