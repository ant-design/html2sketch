import { Bitmap } from '../model';
import { isImageNode } from '../utils/nodeType';

/**
 *
 * @param img html的 img 标签
 * @param format 图片格式
 * @returns {string}
 */
export const getImageBase64 = (
  img: HTMLImageElement,
  format: string = 'png',
) => {
  // 1. 创建canvas DOM元素，并设置其宽高和图片一样
  let canvas: HTMLCanvasElement | null = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;

  // 2. 使用画布画图
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, img.width, img.height);

  // 3. 返回的是一串Base64编码的URL并指定格式
  const dataURL = canvas.toDataURL(`image/${format}`);
  canvas = null; // 释放
  return dataURL;
};

/**
 * 将图片 image 解析为图片
 * @param node HTMLImageElement
 */
const parserToImage = (node: HTMLImageElement) => {
  if (!isImageNode(node)) {
    return;
  }
  const { width, height, y, x } = node.getBoundingClientRect();

  const url = getImageBase64(node);

  return new Bitmap({
    url,
    x,
    y,
    width,
    height,
  });
};

export default parserToImage;
