import ShapePath from '../ShapePath';
import {
  rect,
  singleRoundRect,
  compPath,
  roundRect,
  unclosedRect,
} from './commonSvgData';

describe('ShapePath', () => {
  describe('toSketchJSON 转换符合规范', () => {
    it('圆角矩形 roundRect 转换正常', function () {
      const { frame, isClose, points } = roundRect.shapePath;
      const shapePath = new ShapePath({ isClose, points, ...frame });
      expect(shapePath.toSketchJSON()).toStrictEqual(roundRect.sketchJSON);
    });

    it('正方形 rect 转换正常', function () {
      const { frame, isClose, points } = rect.shapePath;
      const shapePath = new ShapePath({ isClose, points, ...frame });
      expect(shapePath.toSketchJSON()).toStrictEqual(rect.sketchJSON);
    });
    it('带圆角的矩形 rectRound2 转换正常', function () {
      const { frame, isClose, points } = singleRoundRect.shapePath;
      const shapePath = new ShapePath({ isClose, points, ...frame });
      expect(shapePath.toSketchJSON()).toStrictEqual(
        singleRoundRect.sketchJSON
      );
    });
    it('开放矩形 unclosedRect 转换正常', function () {
      const { frame, isClose, points } = unclosedRect.shapePath;

      const shapePath = new ShapePath({ isClose, points, ...frame });

      console.log(shapePath.toSketchJSON());
      expect(shapePath.toSketchJSON()).toStrictEqual(unclosedRect.sketchJSON);
    });
  });

  describe('svgPathToShapePath', () => {
    describe('转换正常', () => {
      it('正常转换圆角矩形', function () {
        const t = ShapePath.svgPathToShapePath(roundRect.path);
        expect(t).toStrictEqual(roundRect.shapePath);
      });
      it('矩形转换正常', function () {
        const points = ShapePath.svgPathToShapePath(rect.path);
        expect(points).toStrictEqual(rect.shapePath);
      });
      it('带圆角的矩形转换正常', function () {
        const points = ShapePath.svgPathToShapePath(singleRoundRect.path);
        expect(points).toStrictEqual(singleRoundRect.shapePath);
      });

      it('不规则图形转换正常', function () {
        const points = ShapePath.svgPathToShapePath(compPath.path);
        expect(points).toStrictEqual(compPath.shapePath);
      });

      it('不闭合矩形转换正常', function () {
        const points = ShapePath.svgPathToShapePath(unclosedRect.path);
        expect(points).toStrictEqual(unclosedRect.shapePath);
      });
    });
    describe('错误处理', function () {
      it('只能转化一个shape', function () {
        const path =
          'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z';
        const t = () => {
          try {
            ShapePath.svgPathToShapePath(path);
          } catch (e) {
            throw e;
          }
        };

        expect(t).toThrow(
          `Error Path!\nData:${path}\nPlease check whether the path is correct.`
        );
      });
    });
  });
});
