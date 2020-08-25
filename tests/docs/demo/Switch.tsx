import React, { FC, useEffect, useRef, useState } from 'react';
import { Switch, Space } from 'antd';

import TestLayout from './utils/TestLayout';

const SwitchDemo: FC = () => {
  const ref = useRef(null);
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (elements.length === 0 && ref.current) {
      // @ts-ignore
      setElements([ref.current]);
    }
  });
  return (
    <TestLayout elements={elements}>
      <Space>
        <Switch
          className="switch"
          symbol-name="11.Switch开关/1.Default默认/1.Off关"
        />
        <Switch
          className="switch"
          disabled
          symbol-name="11.Switch开关/1.Default默认/1.Off关-Disabled禁用"
        />
        <Switch
          className="switch"
          defaultChecked
          symbol-name="11.Switch开关/1.Default默认/2.On开"
        />
        <Switch
          className="switch"
          defaultChecked
          disabled
          symbol-name="11.Switch开关/1.Default默认/2.On开-Disabled禁用"
        />
        <Switch
          className="switch"
          size="small"
          symbol-name="11.Switch开关/2.Small小/1.Off关"
        />
        <Switch
          className="switch"
          defaultChecked
          size="small"
          symbol-name="11.Switch开关/2.Small小/2.On开"
        />
      </Space>
      <Space>
        <Switch
          className="switch"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          symbol-name="11.Switch开关/1.Default默认/1.Off关-带文字"
        />
        <Switch
          className="switch"
          checkedChildren="开启"
          unCheckedChildren="关闭"
          defaultChecked
          symbol-name="11.Switch开关/1.Default默认/2.On开-带文字"
        />
      </Space>
    </TestLayout>
  );
};

export default SwitchDemo;
