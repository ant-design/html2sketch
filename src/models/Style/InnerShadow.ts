import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import type { ShadowParams } from '../Base/BaseShadow';
import BaseShadow from '../Base/BaseShadow';
import { defaultContextSettings } from '../utils';

class InnerShadow extends BaseShadow {
  constructor(props: ShadowParams) {
    super(SketchFormat.ClassValue.InnerShadow, props);
  }

  /**
   * 转为 Sketch JSON 对象
   * @returns {SketchFormat.InnerShadow}
   */
  toSketchJSON = (): SketchFormat.InnerShadow => {
    const { offsetY, offsetX, blurRadius, color, spread } = this;
    return {
      _class: SketchFormat.ClassValue.InnerShadow,
      isEnabled: true,
      blurRadius,
      color: color.toSketchJSON(),
      contextSettings: defaultContextSettings,
      offsetX,
      offsetY,
      spread,
    };
  };
}

export default InnerShadow;
