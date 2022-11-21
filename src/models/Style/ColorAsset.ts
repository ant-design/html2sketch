import type SketchFormat from '@sketch-hq/sketch-file-format-ts';
import BaseStyle from '../Base/BaseStyle';
import Color from './Color';

/**
 * 颜色资产
 */
class ColorAsset extends BaseStyle {
  color: Color;

  constructor(hex: string, name?: string) {
    super();
    this.color = new Color(hex);
    this.name = name || hex.toUpperCase();
  }

  toSketchJSON(): SketchFormat.ColorAsset {
    return {
      _class: 'MSImmutableColorAsset',
      color: this.color.toSketchJSON(),
      do_objectID: this.id,
      name: this.name,
    };
  }
}

export default ColorAsset;
