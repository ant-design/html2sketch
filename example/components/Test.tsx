import React, { FC } from 'react';
import { Radio, Button, Tag, Space } from 'antd';
import { UpCircleOutlined } from '@ant-design/icons';
// import { WelcomeHeader } from '@alipay/tech-ui';

/**
 *
 */
export const Test: FC = () => {
  return (
    <div>
      <Tag className="test" symbolName="1.Tag 标签/1.Default默认/1.Off关">
        内容
      </Tag>
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
