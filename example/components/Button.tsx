import React, { FC } from 'react';
import { Button, Space } from 'antd';

/**
 *
 */
export const ButtonSymbol: FC = () => {
  return (
    <>
      <div>
        <Space>
          <Button
            className="button"
            symbolName="1.Button开关/1.Default默认/1.Default默认按钮"
          >
            文本
          </Button>
          <Button
            className="button"
            type="primary"
            symbolName="1.Button开关/1.Default默认/2.Primary主按钮"
          >
            文本
          </Button>
          <Button
            className="button"
            type="dashed"
            symbolName="1.Button开关/1.Default默认/3.Dashed虚框按钮"
          >
            文本
          </Button>
        </Space>
      </div>
    </>
  );
};
