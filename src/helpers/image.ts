import FileFormat from '@sketch-hq/sketch-file-format-ts';
import uuid from './uuid';

const ensureBase64DataURL = (url: any) => {
  const imageData = url.match(/data:(.+?)(;(.+))?,(.+)/i);

  if (imageData && imageData[3] !== 'base64') {
    // Solve for an NSURL bug that can't handle plaintext data: URLs
    const type = imageData[1];
    const data = decodeURIComponent(imageData[4]);
    const encodingMatch = imageData[3] && imageData[3].match(/^charset=(.*)/);
    let buffer: any;

    if (encodingMatch) {
      // @ts-ignore
      buffer = Buffer.from(data, encodingMatch[1]);
    } else {
      // @ts-ignore
      buffer = Buffer.from(data);
    }

    return `data:${type};base64,${buffer.toString('base64')}`;
  }

  return url;
};
// patternFillType - 0 1 2 3
export const makeImageFill = (
  url: string,
  patternFillType = 1
): FileFormat.Fill => ({
  _class: 'fill',
  isEnabled: true,
  fillType: FileFormat.FillType.Pattern,
  image: {
    _class: 'MSJSONOriginalDataReference',
    _ref_class: 'MSImageData',
    _ref: `images/${uuid()}`,
    // @ts-ignore
    url: url.indexOf('data:') === 0 ? ensureBase64DataURL(url) : url,
  },
  noiseIndex: 0,
  noiseIntensity: 0,
  patternFillType,
  patternTileScale: 1,
});
