import { SketchFormat } from '../../index';
import uuid from '../../helpers/uuid';
import { Style, Frame } from '../index';
import {
  calculateResizingConstraintValue,
  RESIZING_CONSTRAINTS,
} from '../../helpers/layout';
import { AnyLayer } from '../type';

const DEFAULT_USER_INFO_SCOPE = 'html2sketch';

export interface BaseLayerParams {
  x: number;
  y: number;
  width: number;
  height: number;
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

  style: Style;
  layers: AnyLayer[] = [];
  userInfo: any;
  id: string;
  name: string;

  resizingConstraint: any;
  isLocked = false;
  isVisible = true;

  isFixedToViewport = false;
  isFlippedHorizontal = false;
  isFlippedVertical = false;

  hasClippingMask = false;
  LayerListExpanded: SketchFormat.LayerListExpanded;

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

  setFixedWidthAndHeight() {
    this.setResizingConstraint(
      RESIZING_CONSTRAINTS.WIDTH,
      RESIZING_CONSTRAINTS.HEIGHT
    );
  }

  setResizingConstraint(...constraints: any[]) {
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

  // toSketchJSON() {
  //   if (!this.class) {
  //     throw new Error('Class not set.');
  //   }

  //   return {
  //     _class: this.class,
  //     booleanOperation: SketchFormat.BooleanOperation.NA,
  //     frame: this.frame.toSketchJSON(),
  //     exportOptions: defaultExportOptions,
  //     do_objectID: this.id,
  //     isFlippedHorizontal: false,
  //     isFlippedVertical: false,
  //     isLocked: this.isLocked,
  //     isVisible: true,
  //     layerListExpandedType: 0,
  //     name: this.name || this.class,
  //     nameIsFixed: false,
  //     resizingConstraint: this.resizingConstraint,
  //     resizingType: 0,
  //     rotation: 0,
  //     shouldBreakMaskChain: false,
  //     clippingMaskMode: 0,
  //     hasClippingMask: this.hasClippingMask,
  //   };
  // }
}

export default Base;
