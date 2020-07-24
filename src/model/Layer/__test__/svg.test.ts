import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import Svg from '../../Layer/Svg';
import Style from '../../Style/Style';
import { defaultExportOptions } from '../../utils';

import {
  svgPath,
  rect,
  compPath,
  singleRoundRect,
  unclosedRect,
  dropboxSvgPath,
  behanceSvg,
} from './commonSvgData';

// 可复用的 shapeGroup 信息
const shapeGroupData: Partial<SketchFormat.ShapeGroup> = {
  _class: 'shapeGroup',
  do_objectID: 'uuid',
  booleanOperation: -1,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name: 'svg',
  nameIsFixed: false,
  resizingConstraint: 63,
  resizingType: 0,
  shouldBreakMaskChain: false,
  exportOptions: defaultExportOptions,
  rotation: 0,
  frame: {
    _class: 'rect',
    constrainProportions: false,
    height: 814.2161138351329,
    width: 736.652344,
    x: -90,
    y: 4,
  },
  clippingMaskMode: 0,
  style: new Style().toSketchJSON(),
  hasClickThrough: false,
  windingRule: 1,
};

describe('Svg 类', () => {
  describe('toSketchJSON', function() {
    it('svgPath 复合对象转换正常', function() {
      const svg = new Svg({
        path: svgPath.path,
        height: 814.2161138351329,
        width: 736.652344,
        x: -90,
        y: 4,
      });

      expect(svg.toSketchJSON()).toStrictEqual({
        ...shapeGroupData,
        layers: [
          // 不规则
          compPath.sketchJSON,
          // 正方形
          rect.sketchJSON,
          // 圆角矩形
          singleRoundRect.sketchJSON,
          // 开放矩形
          unclosedRect.sketchJSON,
        ].map((layer) => {
          const { frame } = layer;
          return {
            ...layer,
            frame: {
              ...frame,
              // 4 是 x 和 y 的相对偏移值
              x: frame.x - 4,
              y: frame.y - 4,
            },
          };
        }),
      });
    });

    it('dropbox 转换正常', function() {
      const svg = new Svg({
        height: 100,
        width: 100,
        x: 520,
        y: 349,
        path: dropboxSvgPath.path,
      });
      expect(svg.toSketchJSON()).toStrictEqual(dropboxSvgPath.sketchJSON);
    });
    it('behance 转换正常', function() {
      const svg = new Svg({
        height: 56.01562500000003,
        width: 89.22991071428572,
        x: 123,
        y: 18.01116071428572,
        path: behanceSvg.path,
      });

      expect(svg.toSketchJSON()).toStrictEqual(behanceSvg.sketchJSON);
    });
  });
  describe('convertToCubicBezier', function() {
    it('svgPath转换正常', function() {
      const points = Svg.svgPathToShapeGroup(svgPath.path);

      expect(points).toStrictEqual({
        frame: {
          width: 736.652344,
          height: 814.2161138351329,
          x: 4,
          y: 4,
        },
        shapes: [
          // 不规则
          compPath.shapePath,
          // 正方形
          rect.shapePath,
          // 圆角矩形
          singleRoundRect.shapePath,
          // 开放矩形
          unclosedRect.shapePath,
        ],
      });
    });

    it('path不正确时报错', function() {
      const path = 'Z';
      const t = () => {
        try {
          Svg.svgPathToShapeGroup(path);
        } catch (e) {
          throw e;
        }
      };
      expect(t).toThrow(
        'Error Path!\nData:Z\nPlease check whether the path is correct.'
      );
    });
  });
});
