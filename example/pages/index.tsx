import React, { useState } from 'react';
import { Button, Row, Col, Card, Tabs, Divider, Space, message } from 'antd';
import ReactJson from 'react-json-view';
import {
  SwitchSymbol,
  RadioSymbol,
  ButtonSymbol,
  IconSymbol,
  Ellipsis,
  Modal,
} from '../components';

import copy from 'copy-to-clipboard';
import {
  nodeToSketchSymbol,
  svgNodeToSvg,
  nodeToSketchGroup,
  SymbolMaster,
} from '../../lib/esm';
import {
  SMART_LAYOUT,
  RESIZING_CONSTRAINTS,
} from '../../lib/esm/helpers/layout';
import styles from './style.less';

const { TabPane } = Tabs;
export default () => {
  const [json, setJSON] = useState(undefined);
  const [showJSON, setShowJSON] = useState(false);
  const [activeKey, setActiveKey] = useState('modal');

  /**
   * 生成 symbol
   */
  const generateModalSymbol = (id: string) => {
    const el = document.getElementById(id);
    const adjustGroupLayer = (layer) => {
      if (layer.layers) {
        layer.layers.forEach(adjustGroupLayer);
      }
      if (layer.name === 'ant-modal-content') {
        layer.setResizingConstraint(
          // RESIZING_CONSTRAINTS.HEIGHT,
          RESIZING_CONSTRAINTS.TOP,
          RESIZING_CONSTRAINTS.BOTTOM,
        );
      }
      if (layer.class === 'svg') {
        layer.setResizingConstraint(
          RESIZING_CONSTRAINTS.HEIGHT,
          RESIZING_CONSTRAINTS.WIDTH,
          RESIZING_CONSTRAINTS.RIGHT,
          RESIZING_CONSTRAINTS.TOP,
        );
        console.log(layer);
      }
      if (layer.class === 'group') {
        if (layer.className === 'ant-modal-footer') {
          layer.setGroupLayout('RIGHT_TO_LEFT');
          layer.setResizingConstraint(
            RESIZING_CONSTRAINTS.HEIGHT,
            RESIZING_CONSTRAINTS.BOTTOM,
          );
        }
        if (layer.className === 'ant-modal-header') {
          layer.setGroupLayout('LEFT_TO_RIGHT');
          layer.setResizingConstraint(
            RESIZING_CONSTRAINTS.HEIGHT,
            RESIZING_CONSTRAINTS.TOP,
          );
        }
        if (
          typeof layer.className === 'string' &&
          layer?.className.includes('ant-btn')
        ) {
          layer.setResizingConstraint(
            RESIZING_CONSTRAINTS.WIDTH,
            RESIZING_CONSTRAINTS.RIGHT,
          );
        }
      }
    };

    const group = nodeToSketchGroup(el);

    console.log(group);

    const symbol = new SymbolMaster({
      x: group.x,
      y: group.y,
      width: group.width,
      height: group.height,
    });

    group.layers.forEach((layer) => {
      symbol.layers.push(layer);
    });
    // symbol.addLayer(group);
    adjustGroupLayer(symbol);

    const json = symbol.toSketchJSON();
    copy(JSON.stringify(json));
    message.success('转换成功🎉已复制到剪切板');

    setJSON(json);
  };

  /**
   * 生成 symbol
   */
  const generateSymbol = (classname: string) => {
    const els = document.getElementsByClassName(classname);
    const json: Object[] = [];

    Array.from(els).forEach((el) => {
      const smartLayout = el.getAttribute(
        'smartLayout',
      ) as keyof typeof SMART_LAYOUT;

      const switchObj = nodeToSketchSymbol(el, {
        smartLayout: smartLayout ? smartLayout : undefined,
      }).toSketchJSON();
      switchObj.name = el.getAttribute('symbolName') || 'symbol';

      json.push(switchObj);
    });

    copy(JSON.stringify(json));
    message.success('转换成功🎉已复制到剪切板');

    setJSON(json);
  };

  /**
   * 生成 Svg
   */
  const generateSvg = () => {
    const els = document.getElementsByTagName('svg');

    const json: Object[] = [];

    Array.from(els).map((el) => {
      const svg = svgNodeToSvg(el).toSketchJSON();
      console.log(svg);
      json.push(svg);
    });
    copy(JSON.stringify(json));
    message.success('转换成功🎉已复制到剪切板');

    setJSON(json);
  };

  /**
   * 生成 Group
   */
  const generateGroup = () => {
    try {
      const el = document.getElementById('x-modal');
      if (el) {
        const group = nodeToSketchGroup(el);
        console.log('-------转换结束--------');
        console.log(group);

        const data = group.toSketchJSON();
        copy(JSON.stringify(data));
      }
    } catch (e) {
      message.error('解析失败,配置项可能存在错误!');
      console.error(e);
    }
  };
  return (
    <div className={styles.container}>
      <Row gutter={[0, 24]}>
        <Col span={24}>
          <Card>
            <Tabs
              activeKey={activeKey}
              onChange={(key) => {
                setActiveKey(key);
              }}
              tabPosition={'left'}
            >
              <TabPane key={'modal'} tabKey={'Modal'} tab={'Modal'}>
                <Modal />
              </TabPane>{' '}
              <TabPane key={'ellipsis'} tabKey={'Ellipsis'} tab={'Ellipsis'}>
                <Ellipsis />
              </TabPane>
              <TabPane key={'button'} tabKey={'button'} tab={'Button'}>
                <ButtonSymbol />
              </TabPane>
              <TabPane key={'icon'} tabKey={'icon'} tab={'Icon'}>
                <IconSymbol />
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
                <Space style={{ zIndex: 999999 }}>
                  <Button onClick={() => generateSvg()}>解析 Svg</Button>
                  <Button onClick={() => generateGroup()}>转换为 Group</Button>
                  <Button
                    type={'primary'}
                    onClick={() => {
                      if (activeKey !== 'modal') {
                        generateSymbol(activeKey);
                      } else {
                        generateModalSymbol('x-modal');
                      }
                    }}
                  >
                    转换为Symbol
                  </Button>
                </Space>
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
        ) : null}
      </Row>
    </div>
  );
};
