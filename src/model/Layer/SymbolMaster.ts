import { SketchFormat } from '../../index';
import { getGroupLayout, SMART_LAYOUT } from '../../helpers/layout';
import Base, { BaseLayerParams } from './Base';
import Color from '../Style/Color';
import SymbolInstance from './SymbolInstance';
import uuid from '../../helpers/uuid';
import { defaultExportOptions, defaultRuleData } from '../utils';
import { AnyLayer } from '../utils';

/**
 * Sketch 的 Symbol 对象
 **/
class SymbolMaster extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.SymbolMaster;

    this.symbolID = uuid();
    this.groupLayout = getGroupLayout();
  }
  width: number;
  height: number;

  /**
   * 背景颜色
   **/
  backgroundColor: Color = new Color('#FFF');
  /**
   * 取消上层的 Mask
   */
  shouldBreakMaskChain: boolean;
  nameIsFixed: boolean;
  /**
   * 是否缩放内容
   */
  resizesContent: boolean;
  symbolID: string;
  /**
   * 覆盖层属性
   */
  overrideProperties: SketchFormat.OverrideProperty[] = [];
  /**
   * Symbol 布局
   */
  groupLayout:
    | SketchFormat.InferredGroupLayout // 水平或垂直布局
    | SketchFormat.FreeformGroupLayout; // 自由布局

  /**
   * 生成 Symbol 实例
   **/
  getSymbolInstance({ x, y, width = null, height = null }) {
    // if no size will be requested, use the size of the master symbol
    const { width: masterWidth, height: masterHeight } = this.getSize();

    width = width === null ? masterWidth : width;
    height = height === null ? masterHeight : height;

    return new SymbolInstance({
      x,
      y,
      width,
      height,
      symbolID: this.symbolID,
    });
  }

  /**
   * 添加图层
   * @param layer
   */
  addLayer(layer: AnyLayer) {
    // 在组里面的位置是相对位置关系
    // 因此在添加图层的时候需要减掉父级的位置,得到算出相对位置
    layer.x -= this.x;
    layer.y -= this.y;
    super.addLayer(layer);
  }

  getSize() {
    let width = this.width;
    let height = this.height;

    // if width and height were not explicitly set,
    // fit symbol size to its contents
    if (width === null || height === null) {
      this.layers.forEach((layer) => {
        const layerWidth = layer.x + layer.width;
        const layerHeight = layer.y + layer.height;

        if (width < layerWidth) {
          width = layerWidth;
        }
        if (height < layerHeight) {
          height = layerHeight;
        }
      });
    }

    return { width, height };
  }

  /**
   * 设置布局参数
   * @param layoutType
   */
  setGroupLayout(layoutType: keyof typeof SMART_LAYOUT) {
    this.groupLayout = getGroupLayout(layoutType);
  }

  /**
   * 添加 override 设置
   */
  addOverride = (
    id: string,
    type: 'image' | 'layerStyle' | 'stringValue',
    canOverride: boolean = true
  ) => {
    const override: SketchFormat.OverrideProperty = {
      _class: 'MSImmutableOverrideProperty',
      canOverride,
      overrideName: id + '_' + type,
    };
    this.overrideProperties.push(override);
  };

  toSketchJSON = (): SketchFormat.SymbolMaster => {
    return {
      _class: 'symbolMaster',
      frame: this.frame.toSketchJSON(),
      allowsOverrides: true,

      backgroundColor: this.backgroundColor.toSketchJSON(),
      booleanOperation: SketchFormat.BooleanOperation.NA,
      changeIdentifier: 0,
      do_objectID: this.id,
      symbolID: this.symbolID,
      exportOptions: defaultExportOptions,

      hasClickThrough: true,
      includeInCloudUpload: true,
      hasBackgroundColor: false,
      includeBackgroundColorInExport: true,
      resizesContent: false,
      includeBackgroundColorInInstance: false,
      nameIsFixed: this.nameIsFixed,
      shouldBreakMaskChain: this.shouldBreakMaskChain,
      horizontalRulerData: defaultRuleData(),
      verticalRulerData: defaultRuleData(),

      resizingConstraint: 1,
      resizingType: 1,

      groupLayout: this.groupLayout,
      isFixedToViewport: false,
      sharedStyleID: '',

      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: this.isLocked,
      isFlowHome: false,
      name: this.name,
      rotation: 0,
      layerListExpandedType: SketchFormat.LayerListExpanded.Undecided,
      overrideProperties: this.overrideProperties,
      layers: this.layers.map((l) => l.toSketchJSON()),
      isVisible: true,
    };
  };
}

export default SymbolMaster;
