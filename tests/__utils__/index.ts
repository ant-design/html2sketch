/* istanbul ignore file */

import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { readFileSync, writeFileSync } from 'fs';
import { join, resolve } from 'path';
import svg from './json/svg.json';
import svgPath from './json/svg-path.json';
import behance from './json/behance.json';
import dropbox from './json/dropbox.json';
import upCircleParser from './json/parser/up-circle.json';
import upCircle from './json/up-circle.json';
import plus from './json/plus.json';
import text from './json/text.json';
import shape from './json/shape.json';
import antdParser from './json/parser/antd.json';
import antd from './json/antd.json';
import basic from './json/parser/basic.json';
import pseudoText from './json/pseudo-text.json';
import inlineImage from './json/inline-image.json';
import pngURLImage from './json/png-url-image.json';

import ReactDOM from 'react-dom';

export const svgJSON = svg;
export const basicParserJSON = basic;
export const antdParserJSON = antdParser;
export const antdJSON = antd;
export const behanceJSON = behance;
export const dropboxJSON = dropbox;
export const upCircleJSON = upCircle;
export const upCircleParserJSON = upCircleParser;
export const plusJSON = plus;
export const svgPathJSON = svgPath;
export const textJSON = text;
export const shapeJSON = shape;
export const pseudoTextJSON = pseudoText;

// e2e
export const inlineImageJSON = inlineImage;
export const pngURLImageJSON = pngURLImage;

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
    | SketchFormat.SymbolMaster
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
export const antdRawSvg = readFileSync(
  resolve(__dirname, './svg/antdRaw.svg'),
  'utf8',
);
export const antdOptSvg = readFileSync(
  resolve(__dirname, './svg/antdOpt.svg'),
  'utf8',
);
export const bgRawSvg = readFileSync(
  resolve(__dirname, './svg/bgRaw.svg'),
  'utf8',
);
export const bgOptSvg = readFileSync(
  resolve(__dirname, './svg/bgOpt.svg'),
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
  document.body.prepend(node);
};

export const render = (App: JSX.Element) => {
  ReactDOM.render(App, document.getElementById('container'));
};

export const setupTestEnv = () => {
  // 3. 创建 dom 容器
  const node = document.createElement('div');

  node.id = 'container';

  document.body.prepend(node);
};
