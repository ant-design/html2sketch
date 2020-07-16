export interface FrameInitParams {
  x?: number;
  y?: number;
  width: number;
  height: number;
}
/**
 * @class
 * Frame 类型
 * @constructor
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

  toSketchJson = () => {
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
