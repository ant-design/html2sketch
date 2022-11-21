import { StepForwardOutlined, UpCircleOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space } from 'antd';
import React, { FC, Fragment } from 'react';

import { generateSymbolName } from './utils/symbolName';

/**
 * Button demo
 */
const ButtonSymbolDemo: FC = () => {
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

  const group = ['默认', '小', '大'];
  return (
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
  );
};

export default ButtonSymbolDemo;
