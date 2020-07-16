import { SketchFormat } from '../../index';
import Color from './Color';
import StyleBase from './Base';

/**
 * 颜色资产
 */
class ColorAsset extends StyleBase {
  color: Color;

  constructor(hex: string, name?: string) {
    super();
    this.color = new Color(hex);
    this.name = name || hex.toUpperCase();
  }

  toSketchJSON(): SketchFormat.ColorAsset {
    return {
      _class: 'MSImmutableColorAsset',
      color: this.color.toSketchJson(),
      do_objectID: this.id,
      name: this.name,
    };
  }
}

export default ColorAsset;
