/**
 * 判断是否是 Base64Image 字符串
 *
 * 如果是 则返回可以用的字符串
 *
 * 否则返回空
 * @param url 解析后的 base64 URL
 */
export const getBase64ImageString = (url: string): string | undefined => {
  const reg = /data:image\/.*;base64,(.*)/;
  const group = reg.exec(url);

  if (!group) {
    return;
  }
  return group[1];
};
