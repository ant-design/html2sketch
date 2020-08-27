import {
  Bitmap,
  // Svg
} from '../model';
import { isImageNode } from '../utils/nodeType';

const parserToImage = (node: HTMLImageElement) => {
  if (!isImageNode(node)) {
    return;
  }
  const url = node.src;
  if (url.includes('svg')) {
    // return new Svg({svgString})
  }
  const image = new Bitmap({ url });

  return image;
};

export default parserToImage;
