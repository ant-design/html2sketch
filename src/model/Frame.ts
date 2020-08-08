import SketchFormat from '@sketch-hq/sketch-file-format-ts';

export interface FrameInitParams extends Partial<FrameType> {}

export interface FrameType {
  x: number;
  y: number;
  width: number;
  height: number;
}
/**
 * @class
 * Frame 类型
 */
class Frame {
  x: number = 0;
  y: number = 0;
  width: number = 0;
  height: number = 0;

  get right() {
    return this.x + this.width;
  }
  set right(right) {
    this.x = right - this.width;
  }

  get left() {
    return this.x;
  }
  get bottom() {
    return this.y + this.height;
  }
  set bottom(bottom) {
    this.y = bottom - this.height;
  }

  constructor(params?: FrameInitParams) {
    if (params) {
      const { height = 0, width = 0, x = 0, y = 0 } = params;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
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
