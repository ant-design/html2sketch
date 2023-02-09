import type { Matrix } from 'transformation-matrix';
import { decomposeTSR } from 'transformation-matrix';
import type { FrameInitParams, SketchFormat } from '../../types';

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
   * 按比例缩放宽高
   * @param ratio
   */
  scaleByCenter({ sx, sy }: { sx: number; sy: number }) {
    // 1. 先记录中心坐标
    const centerX = this.centerX;
    const centerY = this.centerY;

    // 2. 进行值缩放
    this.width *= sx;
    this.height *= sy;
    // 3. 计算新的 x 和 y
    this.x = centerX - this.width / 2;
    this.y = centerY - this.height / 2;
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
    const { rotation, scale, translate } = decomposeTSR(matrix);

    // 缩放
    this.scaleByCenter(scale);

    // 平移
    this.x += translate.tx;
    this.y += translate.ty;

    // 旋转
    this.rotation = (rotation.angle * 180.0) / Math.PI;
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
