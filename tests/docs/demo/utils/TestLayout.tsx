/* eslint-disable import/no-unresolved */
import React, { FC, useState } from 'react';
import { Button, Row, Col, Card, Divider, Space, message } from 'antd';
import ReactJson from 'react-json-view';

import copy from 'copy-to-clipboard';
import {
  AnyLayer,
  Group,
  GroupLayoutType,
  nodeToGroup,
  nodeToSketchSymbol,
  SymbolMaster,
} from 'html2sketch';

interface FooterProps {
  elements: Element[];
}

declare global {
  interface Window {
    html2sketch: {
      nodeToSketchSymbol: any;
      nodeToGroup: any;
    };
  }
}

window.html2sketch = {
  nodeToSketchSymbol,
  nodeToGroup,
};

const TestLayout: FC<FooterProps> = ({ elements, children }) => {
  const [json, setJSON] = useState<object>();
  const [showJSON, setShowJSON] = useState(false);

  const transformFunc = (
    transferFn: (node: Element) => SymbolMaster | Group,
  ) => {
    try {
      const els = elements;

      const objects: Object[] = [];

      Array.from(els).forEach((el) => {
        console.groupCollapsed('[html2sketch]开始转换...');
        const sketchObj = transferFn(el);
        console.groupEnd();
        console.groupEnd();
        console.group('转换结果');
        console.log('图形对象', sketchObj);
        objects.push(sketchObj.toSketchJSON());
      });

      console.log('Sketch JSON 对象:', objects);
      console.groupEnd();

      copy(JSON.stringify(objects));
      message.success('转换成功🎉已复制到剪切板');
      setJSON(objects);
    } catch (e) {
      message.error('解析失败,配置项可能存在错误!');
      console.error(e);
    }
  };

  return (
    <div>
      {children}
      <Divider dashed />
      <Row style={{ zIndex: 99999 }}>
        <Col span={24}>
          <Row justify="space-between">
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
              <Space>
                <Button
                  onClick={() => {
                    transformFunc((node) => {
                      return nodeToGroup(node);
                    });
                  }}
                >
                  转换为 Group
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    transformFunc((node) => {
                      const symbolLayout: GroupLayoutType = 'LEFT_TO_RIGHT';

                      return nodeToSketchSymbol(node, {
                        symbolLayout: symbolLayout || undefined,
                        handleSymbol: (symbol) => {
                          symbol.name =
                            node.getAttribute('symbol-name') || 'symbol';
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
                      });
                    });
                  }}
                >
                  转换为 Symbol
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        {showJSON ? (
          <Col span={24}>
            <Card>
              <ReactJson name="Sketch JSON" src={json || {}} />
            </Card>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default TestLayout;
