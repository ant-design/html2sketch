import React, { FC, useState, Fragment } from 'react';
import { Button, Divider, Row, Col, message, Space } from 'antd';
import { StepForwardOutlined, UpCircleOutlined } from '@ant-design/icons';
import copy from 'copy-to-clipboard';
import {
  AnyLayer,
  nodeToSketchGroup,
  nodeToSketchSymbol,
  GroupLayoutType,
} from 'html2sketch';
import Footer, { ActionType } from './Footer';
import { generateSymbolName } from './utils/symbolName';

/**
 * Button demo
 */
const ButtonSymbolDemo: FC = () => {
  const [json, setJSON] = useState<object>();
  const groupLayout = 'LEFT_TO_RIGHT';
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
          const symbolLayout = node.getAttribute('layout') as GroupLayoutType;

          return nodeToSketchSymbol(node, {
            symbolLayout: symbolLayout || undefined,
            handleSymbol: (symbol) => {
              symbol.name = node.getAttribute('symbol-name') || 'symbol';
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

  const group = ['默认', '小', '大'];
  return (
    <div>
      <Row>
        {buttonList.map((list, sizeIndex) => {
          return (
            <Fragment key={sizeIndex}>
              <Col key={sizeIndex}>
                <Space align="start">
                  <div style={{ width: 32 }}>{group[sizeIndex]}</div>
                  <Row gutter={[8, 12]}>
                    {list.map((button, index) => {
                      const { type, size, danger, icon } = button;
                      return (
                        <Col key={index}>
                          <Button
                            className="button"
                            icon={icon}
                            symbol-name={generateSymbolName({
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
                            layout={groupLayout}
                            // @ts-ignore
                            type={type}
                            danger={danger}
                            disabled={type === 'disabled'}
                            // @ts-ignore
                            size={size}
                          >
                            文本
                          </Button>
                        </Col>
                      );
                    })}
                  </Row>
                </Space>
              </Col>
              {sizeIndex === buttonList.length - 1 ? null : <Divider dashed />}
            </Fragment>
          );
        })}
      </Row>
      <Footer json={json} actions={actionList} />
    </div>
  );
};

export default ButtonSymbolDemo;
