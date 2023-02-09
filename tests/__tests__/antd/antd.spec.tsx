import { Button, Modal, Radio, Tooltip } from 'antd';
import React from 'react';

import { PlusOutlined, UpCircleOutlined } from '@ant-design/icons';
import type SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { isUpdate, render } from '@test-utils';
import { nodeToGroup, nodeToSymbol } from 'html2sketch';
import {
  defaultModalJSON,
  radioJSON,
  saveJSONData,
  setupAntdTestEnv,
  svgButtonJSON,
  svgIconJSON,
} from './utils';

const { _InternalPanelDoNotUseOrYouWillBeFired: PureTooltip } = Tooltip;

describe('antd 组件库可正常解析', () => {
  beforeEach(async () => {
    await setupAntdTestEnv();
  });

  it('Radio 单选器', async () => {
    render(<Radio checked>html2sketch</Radio>);

    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    if (isUpdate) {
      saveJSONData(group, 'radio');
    }
    const { frame, ...target } = group;
    const { frame: originFrame, ...origin } = radioJSON;

    expect(JSON.parse(JSON.stringify(target))).toEqual(origin);
    expect(Math.round(frame.width)).toEqual(Math.round(originFrame.width));
  });

  describe('Svg', () => {
    it('svg icon', async () => {
      render(<PlusOutlined />);

      const node = document.getElementById('container') as HTMLDivElement;

      const group = (await nodeToGroup(node)).toSketchJSON();

      if (isUpdate) {
        saveJSONData(group, 'svg-icon');
      }
      expect(group).toMatchObject(svgIconJSON);
    });
    it('SVG 和按钮', async () => {
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
      expect(group).toMatchObject(svgButtonJSON);
    });
  });

  it('Modal', async () => {
    render(
      <div style={{ position: 'relative', minHeight: 400 }}>
        <Modal._InternalPanelDoNotUseOrYouWillBeFired
          title="Modal"
          mask={false}
          wrapProps={{ id: 'modal' }}
          // centered
          maskClosable
          getContainer={false}
          width={520}
        >
          Content
        </Modal._InternalPanelDoNotUseOrYouWillBeFired>
      </div>,
    );

    const node = document.getElementsByClassName('ant-modal')[0] as HTMLDivElement;

    const symbol = (await nodeToSymbol(node)).toSketchJSON();

    if (isUpdate) {
      saveJSONData(symbol, 'default-modal');
    }
    const { frame, ...target } = symbol;
    const { frame: originFrame, ...origin } = defaultModalJSON;

    expect(target.name).toEqual(origin.name);
    expect(Math.round(frame.width)).toEqual(Math.round(originFrame.width));

    expect(symbol._class).toBe('symbolMaster');
    expect(symbol.groupLayout).toStrictEqual({
      _class: 'MSImmutableFreeformGroupLayout',
    });
    expect(symbol.name).toBe('Modal');
    expect(symbol.layers.length).toBe(5);

    const header = symbol.layers[1] as SketchFormat.Group;
    expect(header.groupLayout).toStrictEqual({
      _class: 'MSImmutableInferredGroupLayout',
      axis: 0,
      layoutAnchor: 0,
    });
  });

  it.skip('Tooltip', async () => {
    render(<PureTooltip title="text" />);

    const node = document.getElementById('container') as HTMLDivElement;

    const group = (await nodeToGroup(node)).toSketchJSON();

    expect(group).toMatchSnapshot();
  });
});
