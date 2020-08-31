import { Bitmap } from '../model';
import { isCanvasNode } from '../utils/nodeType';

/**
 * 将Canvas 解析为图片
 * @param canvas
 */
export const parseCanvasToBitmap = (canvas: HTMLCanvasElement) => {
  if (!isCanvasNode(canvas)) return;
  const { width, height, y, x } = canvas.getBoundingClientRect();

  const url = canvas.toDataURL();

  const bitmap = new Bitmap({ url, width, height, y, x });
  bitmap.mapBasicInfo(canvas);

  return bitmap;
};
