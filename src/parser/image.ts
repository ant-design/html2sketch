import { Bitmap, Svg } from '../model';
import { isImageNode } from '../utils/nodeType';
import { getImageBase64URL } from '../utils/image';

/**
 * 将图片 image 解析为图片
 * @param node HTMLImageElement
 */
export const parseToBitmap = (node: HTMLImageElement) => {
  if (!isImageNode(node)) {
    return;
  }
  const { width, height, y, x } = node.getBoundingClientRect();

  // 如果解析失败, 则采用提前准备好的错误图片
  const errorUrl = '';

  let url;
  if (node.src.startsWith('http')) {
    url = node.getAttribute('base64') || errorUrl;
    if (node.src.endsWith('.svg')) {
      const svgStr = atob(url.replace('data:image/svg+xml;base64,', ''));
      console.log(svgStr);

      const svg = new Svg({
        svgString: svgStr,
        x,
        y,
        width,
        height,
      });

      svg.mapBasicInfo(node);

      return svg;
    }
  } else {
    url = getImageBase64URL(node);
  }

  const bitmap = new Bitmap({
    url,
    x,
    y,
    width,
    height,
  });

  bitmap.mapBasicInfo(node);

  return bitmap;
};
