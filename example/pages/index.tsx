import React, { useState } from 'react';
import { Button, Row, Col, Radio, Switch } from 'antd';
import ReactJson from 'react-json-view';
import { SwitchSymbol, RadioSymbol, ButtonSymbol } from './components';

import { nodeToSketchGroup, parserSymbol } from '../../lib';
export default () => {
  const [json, setJSON] = useState({});
  const generate = () => {
    const el = document.getElementById('test');
    const switchObj = nodeToSketchGroup(el);

    const json = switchObj.toSketchJSON();

    setJSON(json);
  };
  /**
   * 生成 symbol
   */
  const generateSymbol = (classname: string, options?) => {
    const els = document.getElementsByClassName(classname);
    const json = [];

    Array.from(els).forEach(el => {
      console.log(el);

      const switchObj = parserSymbol(el, options).toSketchJSON();
      switchObj.name = el.getAttribute('symbolName') || 'ceee';

      json.push(switchObj);
    });
    setJSON(json);
  };

  return (
    <Row>
      <Col span={12}>
        <SwitchSymbol></SwitchSymbol>
        <RadioSymbol></RadioSymbol>
        <ButtonSymbol></ButtonSymbol>
        <Button onClick={generate}>转换为 Group</Button>
        <Button
          onClick={() =>
            generateSymbol('button', {
              smartLayout: 'LEFT_TO_RIGHT',
            })
          }
        >
          转换为Button Symbol
        </Button>
        <Button
          onClick={() =>
            generateSymbol('switch', {
              smartLayout: 'LEFT_TO_RIGHT',
            })
          }
        >
          转换为 Switch Symbol
        </Button>
      </Col>
      <Col span={12}>
        <ReactJson src={json} />
      </Col>
    </Row>
  );
};
