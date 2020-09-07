import BaseLayer from '../Base/BaseLayer';
import { BaseLayerParams } from '../type';

interface EllipseParams extends BaseLayerParams {
  /**
   * 中心 X
   */
  cx?: number;
  /**
   * 中心 Y
   */
  cy?: number;
  /**
   * X 轴半径
   */
  rx?: number;
  /**
   * Y 轴半径
   */
  ry?: number;
}
/**
 * 椭圆图形
 */
class Ellipse extends BaseLayer {
  constructor(params?: EllipseParams) {
    super('ellipse', params);

    if (params) {
      const { cx, cy, rx, ry } = params;
      if (cx) {
        this.cx = cx;
      }
      if (cy) {
        this.cy = cy;
      }
      if (rx) {
        this.rx = rx;
      }
      if (ry) {
        this.ry = ry;
      }
    }
  }

  /**
   * 获取 x 中点值
   */
  get cx() {
    return (this.left + this.right) / 2;
  }

  set cx(cx) {
    this.left = cx - this.width / 2;
    this.right = cx + this.width / 2;
  }

  /**
   * 获取 y 中点值
   */
  get cy() {
    return (this.top + this.bottom) / 2;
  }

  set cy(cy) {
    this.top = cy - this.height / 2;
    this.bottom = cy + this.height / 2;
  }

  get rx() {
    return this.width / 2;
  }

  set rx(rx: number) {
    this.left = this.x + (this.width / 2 - rx);
    this.width = rx * 2;
  }

  get ry() {
    return this.height / 2;
  }

  set ry(ry: number) {
    this.top = this.x + (this.height / 2 - ry);
    this.height = ry * 2;
  }
}
export default Ellipse;
