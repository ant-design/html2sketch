// Some websites or component libraries use font-family lists starting with OS-specific fonts.
// If the option 'skipSystemFonts' is enabled, we skip those fonts to choose a font
// Sketch is capable of.

const SYSTEM_FONTS = [
  // Apple
  '-apple-system',
  'BlinkMacSystemFont',

  // Microsoft
  'Segoe UI',

  // Android
  'Roboto',
];

// INPUT: -apple-system, "Helvetica Neue", Helvetica, Arial, sans-serif
// OUTPUT: Helvetica Neue
function getFirstFont(fonts: string, skipSystemFonts?: boolean) {
  let regularFont: string | null = null;
  let systemFont: string | null = null;

  fonts.split(',').forEach((font) => {
    font = font.trim().replace(/^["']+|["']+$/g, '');
    if (font === '') {
      return;
    }

    // See above for a note on OS-specific fonts
    if (!regularFont && (!skipSystemFonts || SYSTEM_FONTS.indexOf(font) < 0)) {
      regularFont = font;
    }
    if (!systemFont) {
      systemFont = font;
    }
  });

  if (regularFont) {
    return regularFont;
  }

  if (systemFont) {
    return systemFont;
  }

  return '-apple-system';
}

interface TextStyleInitParams {
  color: string;
  fontSize: number;
  fontFamily: string;
  fontWeight: number;
  lineHeight?: number;
  letterSpacing?: number;
  textTransform: any;
  textDecoration: any;
  textAlign: string;
  skipSystemFonts?: boolean;
}

class TextStyle {
  private _fontFamily: string;
  private _fontSize: number;
  private _color: string;
  private _lineHeight?: number;
  private _letterSpacing?: number;
  private _fontWeight: number;
  private _textTransform: any;
  private _textAlign: string;
  private _textDecoration: any;
  constructor({
    color,
    fontSize,
    fontFamily,
    fontWeight,
    lineHeight,
    letterSpacing,
    textTransform,
    textDecoration,
    textAlign,
    skipSystemFonts,
  }: TextStyleInitParams) {
    this._color = color;
    this._fontSize = fontSize;
    this._fontFamily = getFirstFont(fontFamily, skipSystemFonts);
    this._lineHeight = lineHeight;
    this._letterSpacing = letterSpacing;
    this._fontWeight = fontWeight;
    this._textTransform = textTransform;
    this._textDecoration = textDecoration;
    this._textAlign = textAlign;
  }

  toJSON() {
    const result = {
      color: this._color,
      fontSize: this._fontSize,
      fontFamily: this._fontFamily,
      fontWeight: this._fontWeight,
      lineHeight: this._lineHeight,
      textDecoration: this._textDecoration,
      textAlign: this._textAlign,
    };

    if (this._letterSpacing !== undefined) {
      // @ts-ignore
      result.letterSpacing = this._letterSpacing;
    }

    if (this._textTransform !== undefined) {
      // @ts-ignore
      result.textTransform = this._textTransform;
    }

    return result;
  }
}

export default TextStyle;
