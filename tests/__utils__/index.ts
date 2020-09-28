/* istanbul ignore file */

import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import svg from './json/svg.json';
import svgPath from './json/svg-path.json';
import behance from './json/behance.json';
import dropbox from './json/dropbox.json';
import upCircle from './json/up-circle.json';
import plus from './json/plus.json';
import text from './json/text.json';
import shape from './json/shape.json';
import antd from './json/antd.json';
import pseudoText from './json/pseudo-text.json';

export const svgJSON = svg;
export const antdJSON = antd;
export const behanceJSON = behance;
export const dropboxJSON = dropbox;
export const upCircleJSON = upCircle;
export const plusJSON = plus;
export const svgPathJSON = svgPath;
export const textJSON = text;
export const shapeJSON = shape;
export const pseudoTextJSON = pseudoText;

export * from './testSvgData';

/**
 * 打印出 JSON 数据到路径中
 *
 * 如果出现不一致了,可以重新输出 JSON 对象
 * 类似 Enzyme 的快照功能
 *
 * @param json
 * @param name
 */
export const outputJSONData = (
  json:
    | SketchFormat.Group
    | SketchFormat.ShapeGroup
    | SketchFormat.Text
    | SketchFormat.Rectangle
    | SketchFormat.Bitmap
    | any[],
  name?: string,
) => {
  writeFileSync(
    join(__dirname, `./json/${name || 'json'}.json`),
    JSON.stringify(json),
  );
};

export const illustrationSvg = readFileSync(
  resolve(__dirname, './svg/illustration.svg'),
  'utf8',
);
export const antdSvg = readFileSync(
  resolve(__dirname, './svg/antd.svg'),
  'utf8',
);

/**
 * 更新
 */
export const isUpdate = process.env.UPDATE === '1';

/**
 * 初始化测试节点
 * @param innerHTML
 */
export const setupTestNode = (innerHTML: string) => {
  const node = document.createElement('div');
  node.innerHTML = innerHTML;
  document.body.append(node);
};
