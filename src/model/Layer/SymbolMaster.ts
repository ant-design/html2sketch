import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { getGroupLayout } from '../../utils/layout';
import BaseLayer, { BaseLayerParams } from '../Base/BaseLayer';
import Color from '../Style/Color';
import SymbolInstance from './SymbolInstance';
import { uuid } from '../../utils/utils';
import { defaultExportOptions, defaultRuleData } from '../utils';
import { AnyLayer } from '../type';
import { GroupLayoutType } from '../../type';
import { FrameType } from '../Base/Frame';

/**
 * Sketch 的 Symbol 对象
 * */
class SymbolMaster extends BaseLayer {
  constructor(params?: BaseLayerParams) {
    super(SketchFormat.ClassValue.SymbolMaster, params);

    this.symbolID = uuid();
    this.groupLayout = getGroupLayout();
  }

  /**
   * 背景颜色
   * */
  backgroundColor: Color = new Color('#FFF');

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
   * */
  getSymbolInstance({ x, y, width, height }: Partial<FrameType>) {
    // if no size will be requested, use the size of the master symbol
    const { width: masterWidth, height: masterHeight } = this.getSize();

    width = width ?? masterWidth;
    height = height ?? masterHeight;

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

  /**
   * 获取 symbol 的尺寸
   */
  getSize() {
    let { width } = this;
    let { height } = this;

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
  setGroupLayout(layoutType: GroupLayoutType) {
    this.groupLayout = getGroupLayout(layoutType);
  }

  /**
   * 添加 override 设置
   * @param id
   * @param type 覆盖层的类型
   * @param canOverride 是否允许覆盖
   */
  addOverride = (
    id: string,
    type: 'image' | 'style' | 'text',
    canOverride: boolean = true,
  ) => {
    let str;
    switch (type) {
      case 'image':
        str = type;
        break;
      case 'style':
        str = 'layerStyle';
        break;
      case 'text':
      default:
        str = 'stringValue';
    }
    const override: SketchFormat.OverrideProperty = {
      _class: 'MSImmutableOverrideProperty',
      canOverride,
      overrideName: `${id}_${str}`,
    };
    this.overrideProperties.push(override);
  };

  toSketchJSON = (): SketchFormat.SymbolMaster => {
    const symbolJSON: SketchFormat.SymbolMaster = {
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
      isLocked: this.locked,
      isFlowHome: false,
      name: this.name,
      rotation: 0,
      layerListExpandedType: SketchFormat.LayerListExpanded.Undecided,
      overrideProperties: this.overrideProperties,
      layers: this.layers.map((l) => l.toSketchJSON()),
      isVisible: true,
    };

    if (this.userInfo) {
      symbolJSON.userInfo = this.userInfo;
    }
    return symbolJSON;
  };
}

export default SymbolMaster;
