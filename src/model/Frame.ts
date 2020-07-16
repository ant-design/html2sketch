import { SketchFormat } from '../index';

export interface FrameInitParams {
  x?: number;
  y?: number;
  width: number;
  height: number;
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
    const { height, width, x = 0, y = 0 } = params;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * 转为 Sketch JSON对象
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
