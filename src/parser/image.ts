import { Bitmap, Svg } from '../model';
import { isImageNode } from '../utils/nodeType';
import { getImageBase64URL, errorBase64Url } from '../utils/image';
import { optimizeSvgString } from '../utils/svg';

/**
 * 将图片 image 解析为图片
 * @param node HTMLImageElement
 */
export const parseToBitmap = async (node: HTMLImageElement) => {
  if (!isImageNode(node)) {
    return;
  }
  const { width, height, y, x } = node.getBoundingClientRect();

  // 如果解析失败, 则采用提前准备好的错误图片

  let url = node.src;
  // 网络 URL
  if (url.startsWith('//')) {
    url = (location.protocol ? location.protocol : 'https') + url;
  }
  if (url.startsWith('http')) {
    if (url.endsWith('.svg')) {
      try {
        const data = await fetch(node.src);
        const svgText = await data.text();
        let svgString = /(<svg.*<\/svg>)/gms.exec(svgText)?.[1] || svgText;
        svgString = await optimizeSvgString(svgString);

        const svg = new Svg({
          svgString,
          x,
          y,
          width,
          height,
        });

        svg.mapBasicInfo(node);

        return svg;
      } catch (e) {
        console.log(e);
        url = errorBase64Url;
      }
    }
  } else {
    // 内联的 URL
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
  await bitmap.init();

  return bitmap;
};
