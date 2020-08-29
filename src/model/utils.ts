import FileFormat from '@sketch-hq/sketch-file-format-ts';

export const defaultExportOptions: FileFormat.ExportOptions = {
  _class: 'exportOptions',
  includedLayerIds: [],
  layerOptions: 0,
  shouldTrim: false,
  exportFormats: [],
};

/**
 * SKetch默认的圆角选项
 * */
export const defaultBorderOptions: FileFormat.BorderOptions = {
  _class: 'borderOptions',
  isEnabled: true,
  dashPattern: [],
  lineCapStyle: FileFormat.LineCapStyle.Butt,
  lineJoinStyle: FileFormat.LineJoinStyle.Miter,
};

/**
 * SKetch默认的色彩控制
 * */
export const defaultColorControls: FileFormat.ColorControls = {
  _class: 'colorControls',
  isEnabled: false,
  brightness: 0,
  contrast: 1,
  hue: 0,
  saturation: 1,
};

/**
 * SKetch 默认规则数据
 * */
export const defaultRuleData = (): FileFormat.RulerData => ({
  _class: 'rulerData',
  base: 0,
  guides: [],
});

/**
 * SKetch 默认blend 样式
 * */
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
  // verticalAlign: 'baseline',
};
