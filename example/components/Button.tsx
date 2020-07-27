import React, { FC } from 'react';
import { Button, Space, Row, Col } from 'antd';
import { generateSymbolName } from '../utils/symbolName';
import { StepForwardOutlined, UpCircleOutlined } from '@ant-design/icons';

/**
 *
 */
export const ButtonSymbol: FC = () => {
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

  return (
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
  );
};
