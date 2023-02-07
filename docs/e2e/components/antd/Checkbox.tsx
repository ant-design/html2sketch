import { Checkbox } from 'antd';
import React from 'react';

export default () => (
  <Checkbox.Group defaultValue={['apple']}>
    <Checkbox value="apple">Apple</Checkbox>
    <Checkbox value="banana">Banana</Checkbox>
    <Checkbox value="car">Car</Checkbox>
  </Checkbox.Group>
);
