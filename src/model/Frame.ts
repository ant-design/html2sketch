import SketchFormat from '@sketch-hq/sketch-file-format-ts';

export interface FrameInitParams {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
/**
 * @class
 * Frame 类型
 */
class Frame {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(params: FrameInitParams) {
    const { height = 0, width = 0, x = 0, y = 0 } = params;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * 转换为 JSON 对象
   */
  toJSON = () => ({
    height: this.height,
    width: this.width,
    x: this.x,
    y: this.y,
  });
  /**
   * 转为 Sketch JSON 对象
   */
  toSketchJSON = (): SketchFormat.Rect => {
    return {
      _class: 'rect',
      constrainProportions: false,
      height: this.height,
      width: this.width,
      x: this.x,
      y: this.y,
    };
  };
}

export default Frame;
