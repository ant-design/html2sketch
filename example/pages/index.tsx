import React, { useState } from 'react';
import { Button, Row, Col, Card, Tabs, Divider, Space, message } from 'antd';
import ReactJson from 'react-json-view';
import { SwitchSymbol, RadioSymbol, ButtonSymbol } from '../components';
import { FooterToolBar } from '@alipay/tech-ui';
// import { nodeToSketchGroup, parserSymbol } from 'html2sketch';
import styles from './style.less';
import copy from 'copy-to-clipboard';

import { nodeToSketchGroup, parserSymbol } from '../../lib';

const { TabPane } = Tabs;
export default () => {
  const [json, setJSON] = useState(undefined);
  const [showJSON, setShowJSON] = useState(false);
  const [activeKey, setActiveKey] = useState('button');

  /**
   * 生成 symbol
   */
  const generateSymbol = (classname: string) => {
    const els = document.getElementsByClassName(classname);
    const json: JSON[] = [];

    Array.from(els).forEach(el => {
      const smartLayout = el.getAttribute('smartLayout');

      const switchObj = parserSymbol(el, {
        smartLayout: smartLayout ? smartLayout : undefined,
      }).toSketchJSON();
      switchObj.name = el.getAttribute('symbolName') || 'ceee';

      json.push(switchObj);
    });

    copy(JSON.stringify(json));
    message.success('转换成功🎉已复制到剪切板');

    setJSON(json);
  };

  return (
    <div className={styles.container}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card>
            <Tabs
              activeKey={activeKey}
              onChange={key => {
                setActiveKey(key);
              }}
              tabPosition={'left'}
            >
              <TabPane key={'button'} tabKey={'button'} tab={'Button'}>
                <ButtonSymbol />
              </TabPane>
              <TabPane key={'switch'} tabKey={'switch'} tab={'Switch'}>
                <SwitchSymbol />
              </TabPane>
              <TabPane key={'radio'} tabKey={'radio'} tab={'Radio'}>
                <RadioSymbol />
              </TabPane>
            </Tabs>
            <Divider dashed />
            <Row justify={'space-between'}>
              <Col>
                <Button
                  disabled={!json}
                  onClick={() => {
                    setShowJSON(!showJSON);
                  }}
                >
                  {showJSON ? '隐藏' : '显示'} JSON
                </Button>
              </Col>
              <Col>
                <Button
                  type={'primary'}
                  onClick={() => generateSymbol(activeKey)}
                >
                  转换为Symbol
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        {showJSON ? (
          <Col span={24}>
            <Card>
              <ReactJson src={json || {}} />
            </Card>
          </Col>
        ) : (
          undefined
        )}
      </Row>
    </div>
  );
};
