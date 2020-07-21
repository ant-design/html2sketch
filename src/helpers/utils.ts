import { v4 as uuidv4 } from 'uuid';

/**
 * 生成 uuid
 */
export const uuid = () => {
  return uuidv4().toUpperCase();
};

/**
 * 排序 Object Keys
 * @param obj JSON 对象
 */
export const sortObjectKeys = (obj: Object) => {
  const keys = Object.keys(obj).sort();

  return keys.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {});
};
