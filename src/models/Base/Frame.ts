import { applyToPoint, Matrix } from 'transformation-matrix';
import { FrameInitParams, SketchFormat } from '../../types';
import { matrixToRotation } from '../../utils/matrix';

/**
 * @class
 * Frame 类型
 */
class Frame {
  constructor(params?: FrameInitParams) {
    if (params) {
      const { height = 0, width = 0, x = 0, y = 0 } = params;
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  }

  x: number = 0;

  y: number = 0;

  width: number = 0;

  height: number = 0;

  get centerX() {
    return this.x + this.width / 2;
  }

  set centerX(centerX) {
    this.x = centerX - this.width / 2;
  }

  get centerY() {
    return this.y + this.height / 2;
  }

  set centerY(centerY) {
    this.y = centerY - this.height / 2;
  }

  /**
   * 旋转角度
   */
  rotation: number = 0;

  get right() {
    return this.x + this.width;
  }

  set right(right) {
    this.x = right - this.width;
  }

  get left() {
    return this.x;
  }

  set left(left) {
    this.x = left;
  }

  get bottom() {
    return this.y + this.height;
  }

  set bottom(bottom) {
    this.y = bottom - this.height;
  }

  get top() {
    return this.y;
  }

  set top(top) {
    this.y = top;
  }

  /**
   * 按比例缩放宽高
   * @param ratio
   */
  scale(ratio: number) {
    this.x *= ratio;
    this.y *= ratio;
    this.width *= ratio;
    this.height *= ratio;
  }

  /**
   * 偏移
   * @param x X坐标
   * @param y Y坐标
   */
  offset(x: number, y: number) {
    this.x += x;
    this.y += y;
  }

  /**
   * 应用矩阵
   * @param matrix
   */
  applyMatrix(matrix: Matrix) {
    const { x, y } = applyToPoint(matrix, { x: this.x, y: this.y });
    const { a, b, c, d } = matrix;
    const rotation = matrixToRotation(a, b, c, d);
    this.x = x;
    this.y = y;
    this.rotation = rotation;
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
      x: this.x || 0,
      y: this.y || 0,
    };
  };
}

export default Frame;
