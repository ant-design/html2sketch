import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { writeFileSync } from 'fs';
import { join } from 'path';
import svg from './json/svg.json';
import svgPath from './json/svg-path.json';
import behance from './json/behance.json';
import dropbox from './json/dropbox.json';
import upCircle from './json/up-circle.json';
import plus from './json/plus.json';
import text from './json/text.json';
import shape from './json/shape.json';
import group from './json/group.json';
import nodeToGroup from './json/node-to-group.json';
import nodeToGroupGroup from './json/node-to-group-group.json';

export const svgJSON = svg;
export const behanceJSON = behance;
export const dropboxJSON = dropbox;
export const upCircleJSON = upCircle;
export const plusJSON = plus;
export const svgPathJSON = svgPath;
export const textJSON = text;
export const shapeJSON = shape;
export const groupJSON = group;
export const nodeToGroupJSON = nodeToGroup;
export const nodeToGroupGroupJSON = nodeToGroupGroup;

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
    | any[],
  name?: string,
) => {
  writeFileSync(
    join(__dirname, `./json/${name || 'json'}.json`),
    JSON.stringify(json),
  );
};

/**
 * 更新
 */
export const isUpdate = process.env.UPDATE === '1';
