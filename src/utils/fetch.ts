import { blobToBase64, getBase64ImageString } from './image';

/**
 *
 * @param url
 */
export const fetchBase64 = async (url: string) => {
  if (window.HTML2SKETCH_FETCH_BASE64) {
    return await window.HTML2SKETCH_FETCH_BASE64(url);
  }

  const data = await fetch(url);
  const blob = await data.blob();
  const dataURL = await blobToBase64(blob);
  return getBase64ImageString(dataURL);
};
