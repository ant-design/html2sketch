import React, { FC, useState } from 'react';
import { Button, Space, Row, Col, message } from 'antd';
import { StepForwardOutlined, UpCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';

import {
  AnyLayer,
  nodeToSketchGroup,
  nodeToSketchSymbol,
  SMART_LAYOUT,
} from 'html2sketch';
import Footer, { ActionType } from './Footer';
import { generateSymbolName } from './utils/symbolName';

/**
 * Button demo
 */
const ButtonSymbolDemo: FC = () => {
  const [json, setJSON] = useState<object>();
  const smartLayout = 'LEFT_TO_RIGHT';
  const typeList = [
    { type: 'default' },
    { type: 'primary' },
    { type: 'disabled' },
    { type: 'dashed' },
    { type: 'ghost' },
    { type: 'default', icon: <StepForwardOutlined /> },
    { type: 'primary', icon: <UpCircleOutlined /> },
    { type: 'text' },
    { type: 'link' },
    { type: 'primary', danger: true },
    { type: 'default', danger: true },
    { type: 'dashed', danger: true },
    { type: 'text', danger: true },
  ];

  const buttonList = [
    typeList.map((i) => ({ ...i, size: 'default' })),
    typeList.map((i) => ({ ...i, size: 'small' })),
    typeList.map((i) => ({ ...i, size: 'large' })),
  ];

  const transformFunc = (transferFn: (node: Element) => Object) => {
    try {
      const els = document.getElementsByClassName('button');
      const buttons: Object[] = [];

      Array.from(els).forEach((el) => {
        const sketchBtn = transferFn(el);
        buttons.push(sketchBtn);
      });
      console.log('-------转换结束--------');
      console.log(buttons);

      copy(JSON.stringify(buttons));
      message.success('转换成功🎉已复制到剪切板');
      setJSON(buttons);
    } catch (e) {
      message.error('解析失败,配置项可能存在错误!');
      console.error(e);
    }
  };

  const actionList: ActionType[] = [
    {
      text: '转换为 Group',
      type: 'default',
      onClick: () => {
        transformFunc((node) => {
          return nodeToSketchGroup(node).toSketchJSON();
        });
      },
    },
    {
      text: '转换为 Symbol',
      type: 'primary',
      onClick: () => {
        transformFunc((node) => {
          const symbolLayout = node.getAttribute(
            'smartLayout',
          ) as keyof typeof SMART_LAYOUT;

          return nodeToSketchSymbol({
            node,
            symbolLayout: symbolLayout ? symbolLayout : undefined,
            handleSymbol: (symbol) => {
              symbol.name = node.getAttribute('symbolName') || 'symbol';
              const renameBG = (layer: AnyLayer) => {
                if (layer.layers) {
                  layer.layers.forEach(renameBG);
                }

                if (layer?.name?.includes('ant-btn')) {
                  layer.name = '背景';
                }
              };
              symbol.layers.forEach(renameBG);
            },
          }).toSketchJSON();
        });
      },
    },
  ];

  return (
    <div>
      <Row gutter={[0, 12]}>
        {buttonList.map((list, sizeIndex) => (
          <Col span={24}>
            <Space>
              {list.map((button, index) => {
                const { type, size, danger, icon } = button;
                return (
                  <Button
                    className="button"
                    icon={icon}
                    symbolName={generateSymbolName({
                      type,
                      size,
                      typeIndex: index + 1,
                      sizeIndex: sizeIndex + 1,
                      component: 'button',
                      componentIndex: 1,
                      content: 'general',
                      contentIndex: 1,
                      suffix: danger ? '-Danger' : undefined,
                    })}
                    smartLayout={smartLayout}
                    // @ts-ignore
                    type={type}
                    danger={danger}
                    disabled={type === 'disabled'}
                    // @ts-ignore
                    size={size}
                  >
                    文本
                  </Button>
                );
              })}
            </Space>
          </Col>
        ))}
      </Row>
      <Footer json={json} actions={actionList} />
    </div>
  );
};

export default ButtonSymbolDemo;
