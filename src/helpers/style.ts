import murmurHash from 'murmur2js';
import { Style } from '../model';

/**
 * 给 style 进行 hash
 * 便于判断是否是相同的样式
 * @param obj
 */
export const hashStyle = (obj: Style) => {
  if (!obj) {
    return -1;
  }
  const { id, ...style } = obj;
  murmurHash(JSON.stringify(sortObjectKeys(style)));
};
/**
 * 排序 Object Keys
 * @param obj JSON 对象
 */
export const sortObjectKeys = (obj: Object) => {
  const keys = Object.keys(obj).sort();

  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};
