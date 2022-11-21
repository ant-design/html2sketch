import { Select } from 'antd';
import React from 'react';

const { Option } = Select;

export default () => {
  return (
    <Select placeholder={'请选择对象...'} style={{ width: 200 }}>
      <Option value={'123'}>123</Option>
      <Option value={'456'}>456</Option>
      <Option value={'769'}>769</Option>
    </Select>
  );
};
