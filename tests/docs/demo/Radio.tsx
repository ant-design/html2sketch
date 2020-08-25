import React, { FC } from 'react';
import { Radio, Space } from 'antd';
import TestLayout from './utils/TestLayout';

/**
 *
 */
export const RadioSymbol: FC = () => {
  return (
    <TestLayout elements={[]}>
      <div>
        <Space>
          <div
            className="radio"
            symbol-name="10.Radio单选框/1.Default默认/1.Off关"
          >
            <Radio>内容</Radio>
          </div>
        </Space>
      </div>
    </TestLayout>
  );
};
