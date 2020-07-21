import React, { FC } from 'react';
import { Button, Space, Row, Col } from 'antd';
import { generateSymbolName } from '../utils/symbolName';

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
              const { type, size, danger } = button;
              return (
                <Button
                  className="button"
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
                  type={type}
                  danger={danger}
                  disabled={type === 'disabled'}
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
