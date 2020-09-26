import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { uuid } from '../../utils/utils';
import Frame from './Frame';
import Style from '../Style/Style';
import { calcResizingConstraint, ResizingConstraint } from '../../utils/layout';
import { AnyLayer, LayerClassType, BaseLayerParams } from '../type';

const DEFAULT_USER_INFO_SCOPE = 'html2sketch';

abstract class BaseLayer {
  protected constructor(type: LayerClassType, params?: BaseLayerParams) {
    this.id = uuid();
    this.userInfo = null;
    this.class = type;
    this.style = new Style();

    this.setResizingConstraint(ResizingConstraint.None);

    this.frame = new Frame(params);

    this.name = params?.name || '';
  }

  frame: Frame;

  class: LayerClassType;

  /**
   * 节点名称
   * 来自 HTML 的节点类型
   */
  nodeType?: string;

  /**
   * 来自节点的 ID
   */
  nodeId?: string;

  /**
   * 来自样式的名称
   */
  className?: string;

  style: Style;

  layers: AnyLayer[] = [];

  userInfo: any;

  id: string;

  name: string;

  resizingConstraint: ResizingConstraint = ResizingConstraint.None;

  /**
   * 上锁状态
   */
  locked = false;

  isVisible = true;

  isFixedToViewport = false;

  isFlippedHorizontal = false;

  isFlippedVertical = false;

  /**
   * 是否存在剪贴蒙版
   */
  hasClippingMask = false;

  LayerListExpanded: SketchFormat.LayerListExpanded =
    SketchFormat.LayerListExpanded.Undecided;

  /**
   * 锁定图层名称
   * */
  nameIsFixed = false;

  /**
   * 是否忽略遮罩链
   */
  shouldBreakMaskChain: boolean = false;

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

  get centerX() {
    return this.x + this.width / 2;
  }

  set centerX(centerX) {
    this.x = centerX - this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  set centerY(centerY) {
    this.y = centerY - this.height / 2;
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

  get top() {
    return this.frame.top;
  }

  set top(top) {
    this.frame.top = top;
  }

  get bottom() {
    return this.frame.bottom;
  }

  set bottom(bottom) {
    this.frame.bottom = bottom;
  }

  get left() {
    return this.frame.left;
  }

  set left(left) {
    this.frame.left = left;
  }

  get rotation() {
    return this.frame.rotation;
  }

  set rotation(deg) {
    this.frame.rotation = deg;
  }

  setFixedWidthAndHeight() {
    this.setResizingConstraint(
      ResizingConstraint.Width,
      ResizingConstraint.Height,
    );
  }

  /**
   * 设置调整尺寸的相关参数
   * @param constraints
   */
  setResizingConstraint(...constraints: ResizingConstraint[]) {
    this.resizingConstraint = calcResizingConstraint(...constraints);
  }

  // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
  // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
  setUserInfo(
    key: string | number,
    value: any,
    scope = DEFAULT_USER_INFO_SCOPE,
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
   * 将对象转为 JSON
   */
  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      layers: this.layers.map((l) => l.toJSON()),
      locked: this.locked,
      resizingConstraint: this.resizingConstraint,
    };
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
   * 将基础的节点信息映射到对象中
   * @param node
   */
  mapBasicInfo(node: Element) {
    this.nodeType = node.nodeName.toLowerCase();
    this.className = node.className;
    this.nodeId = node.id;
  }

  /**
   * 将自己的的样式转成 Sketch 的共享样式
   * @param id
   */
  toSketchSharedStyle = (id?: string): SketchFormat.SharedStyle => {
    return {
      _class: 'sharedStyle',
      do_objectID: id || uuid(),
      name: this.name,
      value: this.style?.toSketchJSON(),
    };
  };

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
}

export default BaseLayer;
