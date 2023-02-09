import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';
import React from 'react';

const { TabPane } = Tabs;

export default () => (
  <Tabs defaultActiveKey="2">
    <TabPane
      tab={
        <span>
          <AppleOutlined />
          Tab 1
        </span>
      }
      key="1"
    >
      Tab 1
    </TabPane>
    <TabPane
      tab={
        <span>
          <AndroidOutlined />
          Tab 2
        </span>
      }
      key="2"
    >
      Tab 2
    </TabPane>
  </Tabs>
);
