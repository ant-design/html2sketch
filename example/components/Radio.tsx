import React, { FC } from 'react';
import { Radio, Space } from 'antd';

/**
 *
 */
export const RadioSymbol: FC = () => {
  return (
    <>
      <div>
        <Space>
          <div
            className="radio"
            symbolName="10.Radio单选框/1.Default默认/1.Off关"
          >
            <Radio>内容</Radio>
          </div>
        </Space>
      </div>
    </>
  );
};
