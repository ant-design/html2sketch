import React from 'react';
import { useElements, TestLayout } from '@e2e-utils';
import { Select } from 'antd';

const { Option } = Select;

/**
 *
 */
export default () => {
  const { elements, ref } = useElements();

  return (
    <TestLayout elements={elements}>
      <div ref={ref}>
        <Select placeholder={'请选择对象...'} style={{ width: 200 }}>
          <Option value={'123'}>123</Option>
          <Option value={'456'}>456</Option>
          <Option value={'769'}>769</Option>
        </Select>
      </div>
    </TestLayout>
  );
};
