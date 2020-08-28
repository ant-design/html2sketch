import React, { FC, useState } from 'react';
import { Button, Row, Col, Card, Divider, Space } from 'antd';
import ReactJson from 'react-json-view';
import useSketchJSON from './useSketchJSON';

interface FooterProps {
  elements: Element[] | Element;
}

const TestLayout: FC<FooterProps> = ({ elements, children }) => {
  const { sketchJSON, generateGroup, generateSymbol } = useSketchJSON();
  const [showJSON, setShowJSON] = useState(false);

  return (
    <div>
      {children}
      <Divider dashed />
      <Row style={{ zIndex: 99999 }}>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Button
                disabled={!sketchJSON}
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
                    generateGroup(elements);
                  }}
                >
                  转换为 Group
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    generateSymbol(elements);
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
              <ReactJson name="Sketch JSON" src={sketchJSON || {}} />
            </Card>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default TestLayout;
