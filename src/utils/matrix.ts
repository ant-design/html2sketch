import {
  fromTransformAttribute,
  compose,
  fromDefinition,
} from 'transformation-matrix';

/*
 * 解析matrix矩阵，0°-360°，返回旋转角度
 * 当a=b||-a=b,0<=deg<=180
 * 当-a+b=180,180<=deg<=270
 * 当a+b=180,270<=deg<=360
 *
 * 当0<=deg<=180,deg=d;
 * 当180<deg<=270,deg=180+c;
 * 当270<deg<=360,deg=360-(c||d);
 * */
export const matrixToRotation = (
  a: number,
  b: number,
  c: number,
  d: number,
) => {
  const aa = Math.round((180 * Math.asin(a)) / Math.PI);
  const bb = Math.round((180 * Math.acos(b)) / Math.PI);
  const cc = Math.round((180 * Math.asin(c)) / Math.PI);
  const dd = Math.round((180 * Math.acos(d)) / Math.PI);
  let deg = 0;
  if (aa === bb || -aa === bb) {
    deg = dd;
  } else if (-aa + bb === 180) {
    deg = 180 + cc;
  } else if (aa + bb === 180) {
    deg = 360 - cc || 360 - dd;
  }
  return deg >= 360 ? 0 : deg;
};
/**
 * transform 字符变成矩阵
 */
export const transformStrToMatrix = (str: string) => {
  return compose(fromDefinition(fromTransformAttribute(str)));
};
