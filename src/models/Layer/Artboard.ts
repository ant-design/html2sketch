import BaseLayer from '../Base/BaseLayer';
import { defaultRuleData, defaultExportOptions } from '../utils';
import Color from '../Style/Color';
import { BaseLayerParams, SketchFormat } from '../../types';

/**
 * 画板对象
 * */
class Artboard extends BaseLayer {
  constructor(params?: BaseLayerParams) {
    super(SketchFormat.ClassValue.Artboard, params);
  }

  /**
   * 背景颜色值
   */
  backgroundColor: Color = new Color('#fff');

  /**
   * 是否包含颜色
   */
  hasBackgroundColor: boolean = false;

  /**
   * 导出画板带上背景颜色
   */
  includeBackgroundColorInExport: boolean = false;

  isFixedToViewport: boolean = false;

  /**
   * 是否横向翻转
   */
  isFlippedHorizontal: boolean = false;

  /**
   * 是否是流程图起点
   */
  isFlowHome: boolean = false;

  /**
   * 是否纵向翻转
   */
  isFlippedVertical: boolean = false;

  /**
   * 内容自适应
   */
  resizesContent: boolean = false;

  toSketchJSON = (): SketchFormat.Artboard => {
    return {
      _class: 'artboard',
      frame: this.frame.toSketchJSON(),
      style: this.style.toSketchJSON(),
      backgroundColor: this.backgroundColor.toSketchJSON(),
      booleanOperation: SketchFormat.BooleanOperation.NA,
      do_objectID: this.id,
      exportOptions: defaultExportOptions,
      hasBackgroundColor: this.hasBackgroundColor,
      includeBackgroundColorInExport: this.includeBackgroundColorInExport,
      isFixedToViewport: this.isFixedToViewport,
      isFlippedHorizontal: this.isFlippedHorizontal,
      userInfo: this.userInfo,
      isFlippedVertical: this.isFlippedVertical,
      isFlowHome: this.isFlowHome,
      isLocked: this.locked,
      isVisible: this.isVisible,
      layerListExpandedType: this.LayerListExpanded,
      layers: this.layers.map((l) => l.toSketchJSON()),
      name: this.name,
      nameIsFixed: this.nameIsFixed,
      resizesContent: this.resizesContent,
      shouldBreakMaskChain: this.shouldBreakMaskChain,
      horizontalRulerData: defaultRuleData,
      verticalRulerData: defaultRuleData,
      hasClickThrough: true,
      includeInCloudUpload: true,
      resizingConstraint: 1,
      resizingType: 1,
      rotation: 0,
    };
  };
}

export default Artboard;
