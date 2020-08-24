import React, { FC, useState } from 'react';
import { Button, Row, Col, Card, Divider, Space } from 'antd';
import ReactJson from 'react-json-view';

import { ButtonType } from 'antd/es/button';

export type ActionType = {
  text: string;
  type?: ButtonType;
  onClick: React.MouseEventHandler<HTMLElement>;
};

interface FooterProps {
  actions: ActionType[];
  json?: object;
}
const Footer: FC<FooterProps> = ({ actions, json }) => {
  const [showJSON, setShowJSON] = useState(false);

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
                {actions.map((action) => (
                  <Button
                    key={action.text}
                    type={action.type}
                    onClick={action.onClick}
                  >
                    {action.text}
                  </Button>
                ))}
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
