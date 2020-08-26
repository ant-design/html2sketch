import { ResizingConstraint } from '../layout';
import { DefaultSymbolParams, LayerSelectorMatchMethod } from '../../type';

/**
 * 默认的 modal 样式
 */
export const defaultModal: DefaultSymbolParams = {
  symbolLayout: 'NONE',
  layerParams: [
    {
      // 内容
      selector: {
        type: 'classname',
        value: 'ant-modal-content',
      },
      resizing: [ResizingConstraint.Top, ResizingConstraint.Bottom],
    },
    {
      // svg
      selector: {
        type: 'class',
        value: 'svg',
      },
      resizing: [
        ResizingConstraint.Height,
        ResizingConstraint.Width,
        ResizingConstraint.Top,
        ResizingConstraint.Right,
      ],
    },
    {
      // 标题
      selector: {
        type: 'classname',
        value: 'ant-modal-footer',
      },
      resizing: [
        ResizingConstraint.Bottom,
        ResizingConstraint.Height,
        ResizingConstraint.Width,
      ],
      layout: 'RIGHT_TO_LEFT',
    },
    {
      // Modal 头部
      selector: {
        type: 'classname',
        value: 'ant-modal-header',
      },
      resizing: [ResizingConstraint.Height, ResizingConstraint.Top],
      layout: 'RIGHT_TO_LEFT',
    },
    {
      // Modal 头部
      selector: {
        type: 'classname',
        value: 'ant-modal-header',
        match: LayerSelectorMatchMethod.Included,
      },
      resizing: [ResizingConstraint.Width, ResizingConstraint.Right],
      layout: 'RIGHT_TO_LEFT',
    },
  ],
};
