import Svg from '../../Layer/Svg';

import {
  svgPath,
  rect,
  compPath,
  singleRoundRect,
  unclosedRect,
  dropboxSvgPath,
  behanceSvg,
  upCircleSvg,
  shapeGroupData,
} from './commonSvgData';
import Frame from '../../Frame';

describe('Svg 类', () => {
  describe('toSketchJSON', function() {
    it('svgPath 复合对象转换正常', function() {
      const svg = new Svg({
        shapes: svgPath.shapes,
        height: 814.2161138351329,
        width: 736.652344,
        x: -90,
        y: 4,
      });

      expect(svg.toSketchJSON()).toStrictEqual(svgPath.sketchJSON);
    });

    it('dropbox 转换正常', function() {
      const svg = new Svg({
        height: 100,
        width: 100,
        x: 520,
        y: 349,
        shapes: dropboxSvgPath.shapes,
      });
      expect(svg.toSketchJSON()).toStrictEqual(dropboxSvgPath.sketchJSON);
    });
    it('behance 转换正常', function() {
      const svg = new Svg({
        height: 56.01562500000003,
        width: 89.22991071428572,
        x: 123,
        y: 18.01116071428572,
        shapes: behanceSvg.shapes,
      });

      expect(svg.toSketchJSON()).toStrictEqual(behanceSvg.sketchJSON);
    });

    describe('多条路径转换正常', function() {
      const svg = new Svg({
        shapes: upCircleSvg.shapes,
        height: 300,
        width: 300,
        x: 25,
        y: -102,
      });
      expect(svg.toSketchJSON()).toStrictEqual(upCircleSvg.sketchJSON);
    });
  });
  describe('convertToCubicBezier', function() {
    it('svgPath转换正常', function() {
      const points = Svg.pathToShapeGroup(svgPath.shapes[0].path);

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
          Svg.pathToShapeGroup(path);
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
