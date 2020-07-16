import FileFormat from '@sketch-hq/sketch-file-format-ts';
import uuid from '../helpers/uuid';

export const defaultExportOptions: FileFormat.ExportOptions = {
  _class: 'exportOptions',
  exportFormats: [],
  includedLayerIds: [],
  layerOptions: 0,
  shouldTrim: false,
};

export const defaultBorderOptions: FileFormat.BorderOptions = {
  _class: 'borderOptions',
  lineCapStyle: FileFormat.LineCapStyle.Butt,
  lineJoinStyle: FileFormat.LineJoinStyle.Miter,
  dashPattern: [],
  isEnabled: true,
};

export const defaultColorControls: FileFormat.ColorControls = {
  _class: 'colorControls',
  brightness: 0,
  contrast: 1,
  hue: 0,
  isEnabled: false,
  saturation: 1,
};

export const defaultStyle = (): FileFormat.Style => ({
  do_objectID: uuid(),
  _class: FileFormat.ClassValue.Style,
  borderOptions: defaultBorderOptions,
  colorControls: defaultColorControls,
  endMarkerType: FileFormat.MarkerType.OpenArrow,
  startMarkerType: FileFormat.MarkerType.OpenArrow,
  innerShadows: [],
  windingRule: FileFormat.WindingRule.EvenOdd,
  miterLimit: 10,
});

export const defaultRuleData = (): FileFormat.RulerData => ({
  _class: 'rulerData',
  base: 0,
  guides: [],
});

export const defaultContextSettings: FileFormat.GraphicsContextSettings = {
  _class: 'graphicsContextSettings',
  blendMode: FileFormat.BlendMode.Normal,
  opacity: 1,
};

export const defaultGradient: FileFormat.Gradient = {
  _class: 'gradient',
  elipseLength: 0,
  from: '0.5 0',
  to: '0.5 0',
  stops: [],
  gradientType: FileFormat.GradientType.Linear,
};

export const defaultNodeStyle: Partial<CSSStyleDeclaration> = {
  backgroundColor: 'rgba(0, 0, 0, 0)',
  backgroundImage: 'none',
  borderWidth: '0px',
  boxShadow: 'none',
};

export const sketchImage = (
  url: string
): FileFormat.FileRef | FileFormat.DataRef => ({
  _class: 'MSJSONOriginalDataReference',
  _ref_class: 'MSImageData',
  _ref: `images/${uuid()}`,
  //@ts-ignore
  url,
});
