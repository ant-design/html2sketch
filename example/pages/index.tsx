import React, { useState } from 'react';
import { Button, Row, Col } from 'antd';
import ReactJson from 'react-json-view';

import { nodeToSketchGroup, parserSymbol } from '../../lib';
export default () => {
  const [json, setJSON] = useState({});
  const generate = () => {
    const el = document.getElementById('test');
    const json = nodeToSketchGroup(el).toSketchJSON();

    setJSON(json);
  };
  const generateSymbol = () => {
    const el = document.getElementById('test');
    const json = parserSymbol(el).toSketchJSON();

    setJSON(json);
  };

  return (
    <Row>
      <Col span={12}>
        <div id="test">
          <Button type={'dashed'}>测试</Button>
        </div>
        <Button onClick={generate}>转换为 Group</Button>
        <Button onClick={generateSymbol}>转换为 Symbol</Button>
      </Col>
      <Col span={12}>
        <ReactJson src={json} />
      </Col>
    </Row>
  );
};
