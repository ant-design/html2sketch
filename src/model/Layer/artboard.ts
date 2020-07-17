import { SketchFormat } from '../../index';

import Base, { BaseLayerParams } from './Base';
import { defaultRuleData, defaultExportOptions } from '../utils';
import Color from '../Style/Color';

/**
 * 画板
 **/
class Artboard extends Base {
  constructor(params: BaseLayerParams) {
    super(params);
    this.class = SketchFormat.ClassValue.Artboard;
  }
  backgroundColor?: Color;
  /**
   * 是否包含颜色
   */
  hasBackgroundColor: boolean;
  /**
   * 导出画板带上背景颜色
   */
  includeBackgroundColorInExport: boolean;
  isFixedToViewport: boolean;

  /**
   * 是否横向翻转
   */
  isFlippedHorizontal: boolean;

  /**
   * 是否是流程图起点
   */
  isFlowHome: boolean;

  /**
   * 是否纵向翻转
   */
  isFlippedVertical: boolean;

  /**
   * 固定名字?
   */
  nameIsFixed: boolean;
  /**
   * 内容自适应
   */
  resizesContent: boolean;

  /**
   * 是否忽略遮罩链
   */
  shouldBreakMaskChain: boolean;
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
      isLocked: this.isLocked,
      isVisible: this.isVisible,
      layerListExpandedType: this.LayerListExpanded,
      layers: this.layers.map((l) => l.toSketchJSON()),
      name: this.name,
      nameIsFixed: this.nameIsFixed,
      resizesContent: this.resizesContent,
      shouldBreakMaskChain: this.shouldBreakMaskChain,
      horizontalRulerData: defaultRuleData(),
      verticalRulerData: defaultRuleData(),
      hasClickThrough: true,
      includeInCloudUpload: true,
      resizingConstraint: 1,
      resizingType: 1,
      rotation: 0,
    };
  };
}

export default Artboard;
