import {
  Bitmap,
  // Svg
} from '../model';
import { isImageNode } from '../utils/nodeType';

const parserToImage = (imageNode: HTMLImageElement) => {
  console.log(imageNode.nodeName);
  if (!imageNode || isImageNode(imageNode)) {
    return;
  }
  const url = imageNode.src;
  if (url.includes('svg')) {
    // return new Svg({svgString})
  }
  const image = new Bitmap({ url });
  console.log(image);
  return image;
};

export default parserToImage;
