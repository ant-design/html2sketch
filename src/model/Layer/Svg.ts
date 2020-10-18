import { Svgson } from '../../parser';
import { SketchFormat } from '../../types';
import BaseLayer from '../Base/BaseLayer';
import Gradient from '../Style/Gradient';

import { defaultExportOptions } from '../utils';

import { getGroupLayout } from '../../utils/layout';

import { AnyLayer, BaseLayerParams, SvgDefsStyle } from '../type';

interface SvgInitParams extends Partial<BaseLayerParams> {
  svgString: string;
}

/**
 * SVG 对象
 */
class Svg extends BaseLayer {
  constructor({ x, y, width, height, svgString }: SvgInitParams) {
    super('svg', {
      height,
      width,
      y,
      x,
    });

    this.name = 'svg';
    this.rawSVGString = svgString;

    const svgShape = new Svgson(svgString, { width, height });

    this.layers = svgShape.layers;
  }

  /**
   * Svg 包含的图层对象
   * 每一个对象都是 SvgLayer 类型
   */
  layers: AnyLayer[] = [];

  /**
   * 全局描述
   * @private
   */
  defs: (Gradient | SvgDefsStyle)[] = [];

  shapes: { path: string; style?: string }[] = [];

  /**
   * 原生 Svg 字符串
   */
  rawSVGString: string;

  /**
   * 转换为 Sketch 对象
   * 会自动识别ShapeGroup 中是否只包含一个对象
   * 从而清理无用的 ShapeGroup
   */
  toSketchJSON(): SketchFormat.Group | SketchFormat.ShapeGroup {
    if (this.layers.length === 1) {
      const layer = this.layers[0];
      layer.x = this.x;
      layer.y = this.y;
      layer.resizingConstraint = this.resizingConstraint;
      return layer.toSketchJSON() as SketchFormat.ShapeGroup;
    }
    return {
      _class: 'group',
      do_objectID: this.id,
      booleanOperation: SketchFormat.BooleanOperation.NA,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isVisible: true,
      isLocked: this.locked,
      layerListExpandedType: 0,
      name: this.name,
      nameIsFixed: false,
      resizingConstraint: this.resizingConstraint,
      resizingType: SketchFormat.ResizeType.Stretch,
      rotation: 0,
      shouldBreakMaskChain: false,
      exportOptions: defaultExportOptions,
      frame: this.frame.toSketchJSON(),
      clippingMaskMode: 0,
      hasClippingMask: this.hasClippingMask,
      style: this.style.toSketchJSON(),
      hasClickThrough: false,
      groupLayout: getGroupLayout(),
      layers: this.layers.map((layer) => layer.toSketchJSON()),
    };
  }
}

export default Svg;
