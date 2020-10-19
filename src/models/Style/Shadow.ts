import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultContextSettings } from '../utils';
import BaseShadow, { ShadowParams } from '../Base/BaseShadow';

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
