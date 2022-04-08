import React from 'react';
import { Button, Radio } from 'antd';

import ReactDOM from 'react-dom';

import { nodeToGroup } from 'html2sketch';
import { isUpdate } from '@test-utils';
import {
  saveJSONData,
  setupAntdTestEnv,
  svgIconJSON,
  radioJSON,
  svgButtonJSON,
} from './utils';
import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';

const render = (App: JSX.Element) => {
  ReactDOM.render(App, document.getElementById('container'));
};

describe('antd 组件库可正常解析', () => {
  it('radio', async () => {
    await setupAntdTestEnv();
    render(<Radio checked>html2sketch</Radio>);

    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    if (isUpdate) {
      saveJSONData(group, 'radio');
    }
    expect(group).toEqual(radioJSON);
  });
  describe('Svg', () => {
    it('svg icon', async () => {
      await setupAntdTestEnv();
      render(<PlusOutlined />);

      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-icon');
      }
      expect(group).toEqual(svgIconJSON);
    });
    it('SVG 和按钮', async () => {
      await setupAntdTestEnv();
      render(
        <Button id="button" icon={<UpCircleOutlined />} type="primary">
          文本
        </Button>,
      );

      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-button');
      }
      expect(group).toEqual(svgButtonJSON);
    });
  });
});
