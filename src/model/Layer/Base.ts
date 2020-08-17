import { uuid } from '../../helpers/utils';
import Frame from '../Frame';
import Style from '../Style/Style';
import {
  calculateResizingConstraintValue,
  RESIZING_CONSTRAINTS,
} from '../../helpers/layout';
import { AnyLayer } from '../type';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';

const DEFAULT_USER_INFO_SCOPE = 'html2sketch';

export interface BaseLayerParams {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
class Base {
  constructor(params: BaseLayerParams) {
    this.id = uuid();
    this.userInfo = null;
    this.style = new Style();
    this.setResizingConstraint(RESIZING_CONSTRAINTS.NONE);

    this.frame = new Frame(params);
  }
  frame: Frame;
  class: SketchFormat.ClassValue | 'svg';

  /**
   * 来自样式的名称
   */
  className?: string;

  style: Style;
  layers: AnyLayer[] = [];
  userInfo: any;
  id: string;
  name: string;

  resizingConstraint: RESIZING_CONSTRAINTS = RESIZING_CONSTRAINTS.NONE;
  isLocked = false;
  isVisible = true;

  isFixedToViewport = false;
  isFlippedHorizontal = false;
  isFlippedVertical = false;

  hasClippingMask = false;
  LayerListExpanded: SketchFormat.LayerListExpanded;

  /**
   * 锁定图层名称
   **/
  nameIsFixed = false;

  get x() {
    return this.frame.x;
  }
  set x(x: number) {
    this.frame.x = x;
  }

  get y() {
    return this.frame.y;
  }
  set y(y: number) {
    this.frame.y = y;
  }

  get width() {
    return this.frame.width;
  }
  set width(width: number) {
    this.frame.width = width;
  }

  get height() {
    return this.frame.height;
  }
  set height(height: number) {
    this.frame.height = height;
  }

  get right() {
    return this.frame.right;
  }
  set right(right) {
    this.frame.right = right;
  }

  setFixedWidthAndHeight() {
    this.setResizingConstraint(
      RESIZING_CONSTRAINTS.WIDTH,
      RESIZING_CONSTRAINTS.HEIGHT
    );
  }

  /**
   * 设置调整尺寸的相关参数
   * @param constraints
   */
  setResizingConstraint(...constraints: RESIZING_CONSTRAINTS[]) {
    this.resizingConstraint = calculateResizingConstraintValue(...constraints);
  }

  // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
  // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
  setUserInfo(
    key: string | number,
    value: any,
    scope = DEFAULT_USER_INFO_SCOPE
  ) {
    this.userInfo = this.userInfo || {};
    this.userInfo[scope] = this.userInfo[scope] || {};
    this.userInfo[scope][key] = value;
  }

  getUserInfo(key: string | number, scope = DEFAULT_USER_INFO_SCOPE) {
    return this.userInfo && this.userInfo[scope] && this.userInfo[scope][key];
  }

  addLayer(layer: AnyLayer) {
    this.layers.push(layer);
  }

  addLayers(layers: AnyLayer[]) {
    this.layers = this.layers.concat(layers);
  }

  /**
   * 设置位置
   * @param x X轴
   * @param y Y轴
   */
  setPosition({ x, y }: { x: number; y: number }) {
    this.frame.x = x;
    this.frame.y = y;
  }

  /**
   * 获取所有子图层的尺寸
   */
  get childLayersSize() {
    let width = 0;
    let height = 0;
    this.layers.forEach((layer) => {
      const layerWidth = layer.width;
      const layerHeight = layer.height;

      if (width < layerWidth) {
        width = layerWidth;
      }
      if (height < layerHeight) {
        height = layerHeight;
      }
    });
    return { width, height };
  }

  /**
   * 获取节点的子级的定界框
   * @param nodes
   */
  static getChildNodesFrame = (nodes: Element[]) => {
    // TODO: should probably also take into account children of each node

    const groupBCR = nodes.reduce((result: any, node) => {
      const bcr = node.getBoundingClientRect();
      const { left, top, right, bottom } = bcr;
      const width = bcr.right - bcr.left;
      const height = bcr.bottom - bcr.top;

      if (width === 0 && height === 0) {
        return result;
      }

      if (!result) {
        return { left, top, right, bottom };
      }

      if (left < result.left) {
        result.left = left;
      }

      if (top < result.top) {
        result.top = top;
      }

      if (right > result.right) {
        result.right = right;
      }

      if (bottom > result.bottom) {
        result.bottom = bottom;
      }

      return result;
    }, null);

    if (groupBCR === null) {
      return {
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0,
      };
    }

    return {
      left: groupBCR.left,
      top: groupBCR.top,
      right: groupBCR.right,
      bottom: groupBCR.bottom,
      width: groupBCR.right - groupBCR.left,
      height: groupBCR.bottom - groupBCR.top,
    };
  };

  /**
   * 解析 Border string 圆角
   * @param borderRadius
   * @param width
   * @param height
   */
  static parserBorderRadius = (
    borderRadius: string,
    width: number,
    height: number
  ) => {
    const matches = borderRadius.match(/^([0-9.]+)(.+)$/);

    // Sketch uses 'px' units for border radius, so we need to convert % to px
    if (matches && matches[2] === '%') {
      const baseVal = Math.max(width, height);
      const percentageApplied = baseVal * (parseInt(matches[1], 10) / 100);

      return Math.round(percentageApplied);
    }
    return parseInt(borderRadius, 10);
  };
}

export default Base;
