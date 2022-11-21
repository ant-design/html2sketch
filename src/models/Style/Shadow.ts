import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import type { ShadowParams } from '../Base/BaseShadow';
import BaseShadow from '../Base/BaseShadow';
import { defaultContextSettings } from '../utils';

class Shadow extends BaseShadow {
  constructor(props: ShadowParams) {
    super(SketchFormat.ClassValue.Shadow, props);
  }

  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Shadow => {
    const { offsetY, offsetX, blurRadius, color, spread } = this;
    return {
      _class: SketchFormat.ClassValue.Shadow,
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

export default Shadow;
