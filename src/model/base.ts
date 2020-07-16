import FileFormat from '@sketch-hq/sketch-file-format-ts';
import uuid from '../helpers/uuid';
import Style from './style';
import {
  calculateResizingConstraintValue,
  RESIZING_CONSTRAINTS,
} from '../helpers/layout';

const DEFAULT_USER_INFO_SCOPE = 'html-sketchapp';

export interface BaseInitParams {
  id?: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export interface LayerInitParams {
  id?: string;
  x?: number;
  y?: number;
  width: number;
  height: number;
}
class Base<T extends FileFormat.AnyLayer> {
  constructor(data: Partial<LayerInitParams>) {
    this._layers = [];
    this.objectID = data!.id || uuid();
    this._name = '';
    this._userInfo = null;
    this._style = new Style();
    this.setResizingConstraint(RESIZING_CONSTRAINTS.NONE);
    this.setHasClippingMask(false);
    this.setIsLocked(false);
  }

  width?: number;
  height?: number;
  x: number = 0;
  y: number = 0;

  public type: string = '';
  _style: Style;
  private _layers: any[];
  private _userInfo: any;
  class?: string;

  objectID: string;

  private _isLocked: boolean = false;
  _name: string;
  protected _resizingConstraint: any;
  protected _hasClippingMask: any;

  setFixedWidthAndHeight() {
    this.setResizingConstraint(
      RESIZING_CONSTRAINTS.WIDTH,
      RESIZING_CONSTRAINTS.HEIGHT
    );
  }

  setResizingConstraint(...constraints: any[]) {
    this._resizingConstraint = calculateResizingConstraintValue(...constraints);
  }

  getID() {
    return this.objectID;
  }

  set setObjectID(id: string) {
    this.objectID = id;
  }

  // scope defines which Sketch plugin will have access to provided data via Settings.setLayerSettingForKey
  // you should set it to the plugin ID e.g. "com.bohemiancoding.sketch.testplugin"
  // by default however we use "html-sketchapp" here which won't work directly with any plugin
  // but can still be accessed via native API: layer.userInfo()['html-sketchapp']
  setUserInfo(
    key: string | number,
    value: any,
    scope = DEFAULT_USER_INFO_SCOPE
  ) {
    this._userInfo = this._userInfo || {};
    this._userInfo[scope] = this._userInfo[scope] || {};
    this._userInfo[scope][key] = value;
  }

  getUserInfo(key: string | number, scope = DEFAULT_USER_INFO_SCOPE) {
    return (
      this._userInfo && this._userInfo[scope] && this._userInfo[scope][key]
    );
  }

  setName(name: string) {
    this._name = name;
  }

  getLayers() {
    return this._layers;
  }

  addLayer(layer: any) {
    this._layers.push(layer);
  }

  addLayers(layers: any[]) {
    this._layers = this._layers.concat(layers);
  }

  setStyle(style: any) {
    this._style = style;
  }

  setHasClippingMask(hasClippingMask: boolean) {
    this._hasClippingMask = hasClippingMask;
  }

  setIsLocked(isLocked: boolean) {
    this._isLocked = isLocked;
  }

  toJSON(): T {
    if (!this.class) {
      throw new Error('Class not set.');
    }

    // @ts-ignore
    const result: T = {
      booleanOperation: FileFormat.BooleanOperation.NA,
      edited: false,
      fixedRadius: 0,
      hasClickThrough: false,
      hasConvertedToNewRoundCorners: false,
      isClosed: false,
      isFixedToViewport: false,
      needsConvertionToNewRoundCorners: false,
      numberOfPoints: 0,
      points: [],
      sharedStyleID: '',
      _class: this.class,
      do_objectID: this.objectID,
      exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
      },
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this._isLocked,
      isVisible: true,
      layerListExpandedType: 0,
      name: this._name || this.class,
      nameIsFixed: false,
      resizingConstraint: this._resizingConstraint,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      layers: this._layers.map((layer) => layer.toJSON()),
      clippingMaskMode: 0,
      hasClippingMask: this._hasClippingMask,
    };

    if (this._userInfo) {
      // @ts-ignore
      result.userInfo = this._userInfo;
    }

    if (this._style) {
      // @ts-ignore
      result.style = this._style.toJSON();
    }

    return result;
  }
}

export default Base;
