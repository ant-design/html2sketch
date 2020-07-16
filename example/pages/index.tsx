import React from 'react';
import { Button } from 'antd';
import { nodeToSketchGroup } from '../../lib';
export default () => {
  const generate = () => {
    const el = document.getElementById('title');
    console.log(nodeToSketchGroup(el));
  };
  return (
    <div>
      <div id="title">Page index</div>

      <Button onClick={generate}>转换为 Group</Button>
    </div>
  );
};
