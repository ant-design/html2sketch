import FileFormat from '@sketch-hq/sketch-file-format-ts';
import normalizeColor from 'normalize-css-color';
import { defaultContextSettings, defaultGradient } from '../model/utils';

const safeToLower = (input: string | any) => {
  if (typeof input === 'string') {
    return input.toLowerCase();
  }

  return input;
};

/**
 * Takes colors as CSS hex, name, rgb, rgba, hsl or hsla
 * @param input
 * @param alpha
 */

export const makeColorFromCSS = (input: any, alpha = 1): FileFormat.Color => {
  const nullableColor = normalizeColor(safeToLower(input));
  const colorInt = nullableColor === null ? 0x00000000 : nullableColor;
  const { r, g, b, a } = normalizeColor.rgba(colorInt);

  return {
    _class: 'color',
    red: r / 255,
    green: g / 255,
    blue: b / 255,
    alpha: a * alpha,
  };
};

// Solid color fill
export const makeColorFill = (
  cssColor: any,
  alpha?: number
): FileFormat.Fill => ({
  _class: 'fill',
  isEnabled: true,
  color: makeColorFromCSS(cssColor, alpha),
  fillType: 0,
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType: 1,
  patternTileScale: 1,
  contextSettings: defaultContextSettings,
  gradient: defaultGradient,
});
