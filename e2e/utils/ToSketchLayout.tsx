import React, { FC, useState } from 'react';
import { Button, Card, Col, Divider, Row, Space } from 'antd';
import ReactJson from 'react-json-view';
import useSketchJSON from './useSketchJSON';

interface FooterProps {
  elements: Element[] | Element;
  buttons?: { name: string; onClick: () => void }[];
}

const ToSketchLayout: FC<FooterProps> = ({ elements, children, buttons }) => {
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
                {buttons?.map((button) => (
                  <Button key={button.name} onClick={button.onClick}>
                    {button.name}
                  </Button>
                ))}
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

export default ToSketchLayout;
