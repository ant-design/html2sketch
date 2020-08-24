import React, { FC, useState } from 'react';
import { Button, Row, Col, Card, Divider, Space, message } from 'antd';
import ReactJson from 'react-json-view';

import copy from 'copy-to-clipboard';
import {
  AnyLayer,
  GroupLayoutType,
  nodeToGroup,
  nodeToSketchSymbol,
} from 'html2sketch';

interface FooterProps {
  elements: Element[];
}
const Footer: FC<FooterProps> = ({ elements }) => {
  const [json, setJSON] = useState<object>();
  const [showJSON, setShowJSON] = useState(false);

  const transformFunc = (transferFn: (node: Element) => Object) => {
    try {
      const els = elements;

      const objects: Object[] = [];

      Array.from(els).forEach((el) => {
        const sketchBtn = transferFn(el);
        objects.push(sketchBtn);
      });
      console.log('-------转换结束--------');
      console.log(objects);

      copy(JSON.stringify(objects));
      message.success('转换成功🎉已复制到剪切板');
      setJSON(objects);
    } catch (e) {
      message.error('解析失败,配置项可能存在错误!');
      console.error(e);
    }
  };

  return (
    <>
      <Divider dashed />
      <Row>
        <Col span={24}>
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
              <Space>
                <Button
                  onClick={() => {
                    transformFunc((node) => {
                      return nodeToGroup(node).toSketchJSON();
                    });
                  }}
                >
                  转换为 Group
                </Button>
                <Button
                  type={'primary'}
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
                      }).toSketchJSON();
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
              <ReactJson name={'Sketch JSON'} src={json || {}} />
            </Card>
          </Col>
        ) : null}
      </Row>
    </>
  );
};

export default Footer;
