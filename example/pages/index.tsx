import React, { useState } from 'react';
import { Button, Row, Col, Radio, Switch } from 'antd';
import ReactJson from 'react-json-view';

import { nodeToSketchGroup, parserSymbol } from '../../lib';
export default () => {
  const [json, setJSON] = useState({});
  const generate = () => {
    const el = document.getElementById('test');
    const switchObj = nodeToSketchGroup(el);

    const json = switchObj.toSketchJSON();
    json.name = 'Switch';
    console.log(switchObj);

    setJSON(json);
  };
  const generateSymbol = () => {
    const el = document.getElementById('symbol');
    const json = parserSymbol(el).toSketchJSON();

    json.name = 'Switch';
    setJSON(json);
  };

  return (
    <Row>
      <Col span={12}>
        <div id="test">
          <Switch defaultChecked />
          {/* <Button type={'dashed'} id="symbol">
            测试
          </Button> */}
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
