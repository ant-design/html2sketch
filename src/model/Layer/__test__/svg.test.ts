import Svg from '../Svg';
import {
  svgPath,
  rect,
  compPath,
  singleRoundRect,
  unclosedRect,
  dropboxSvgPath,
  behanceSvg,
  upCircleSvg,
  plusSvg,
  plus,
  // outputJSONData,
} from './commonSvgData';

describe('Svg 类', () => {
  describe('toSketchJSON', () => {
    describe('单条 path', function () {
      it('svgPath 复合对象转换正常', () => {
        const svg = new Svg({
          svgString: svgPath.svgString,
          height: 814.2161138351328,
          width: 736.652344,
          x: -90,
          y: 4,
        });
        expect(svg.toSketchJSON()).toMatchSnapshot();
        // 如果出现小数点的不一致 进行重新输出
        // outputJSONData(svg.toSketchJSON(), 'svg-path');
        expect(svg.toSketchJSON()).toStrictEqual(svgPath.sketchJSON);
      });
      it('dropbox 转换正常', () => {
        const svg = new Svg({
          height: 100,
          width: 100,
          x: 520,
          y: 349,
          svgString: dropboxSvgPath.svgString,
        });
        expect(svg.toSketchJSON()).toMatchSnapshot();
        // 如果出现小数点的不一致 进行重新输出
        // outputJSONData(svg.toSketchJSON(), 'dropbox');
        expect(svg.toSketchJSON()).toStrictEqual(dropboxSvgPath.sketchJSON);
      });
      it('behance 转换正常', () => {
        const svg = new Svg({
          height: 56.01562500000003,
          width: 89.22991071428572,
          x: 123,
          y: 18.01116071428572,
          svgString: behanceSvg.svgString,
        });
        expect(svg.toSketchJSON()).toMatchSnapshot();
        // 如果出现小数点的不一致 进行重新输出
        // outputJSONData(svg.toSketchJSON(), 'plus');
        expect(svg.toSketchJSON()).toStrictEqual(behanceSvg.sketchJSON);
      });
    });

    describe('多条 path', function () {});
    it('plusSvg 转换正常', () => {
      const svg = new Svg({
        height: 25,
        width: 24,
        x: 164,
        y: 22,
        svgString: plusSvg.svgString,
      });
      // 如果出现小数点的不一致 进行重新输出
      expect(svg.toSketchJSON()).toMatchSnapshot();
      // outputJSONData(svg.toSketchJSON(), 'plus');
      expect(svg.toSketchJSON()).toStrictEqual(plusSvg.sketchJSON);
    });

    describe('多条路径 upArrow 转换正常', () => {
      const svg = new Svg({
        svgString: upCircleSvg.svgString,
        height: 300,
        width: 300,
        x: 25,
        y: -102,
      });
      expect(svg.toSketchJSON()).toMatchSnapshot();
      // 如果出现小数点的不一致 进行重新输出
      // outputJSONData(svg.toSketchJSON(), 'up-circle');
      expect(svg.toSketchJSON()).toStrictEqual(upCircleSvg.sketchJSON);
    });
  });

  describe('convertToCubicBezier', () => {
    it('svgPath转换正常', () => {
      if (!svgPath.shapes?.[0]) {
        return;
      }
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

    it('plus 转换正常', () => {
      const points = Svg.pathToShapeGroup(plus.path);
      expect(points).toStrictEqual({
        frame: { height: 720, width: 76, x: 474, y: 151.99999999999997 },
        shapes: [plus.shapePath],
      });
    });

    it('path不正确时报错', () => {
      const path = 'Z';
      const t = () => {
        // eslint-disable-next-line no-useless-catch
        try {
          Svg.pathToShapeGroup(path);
        } catch (e) {
          throw e;
        }
      };
      expect(t).toThrow(
        'Error Path!\nData:Z\nPlease check whether the path is correct.',
      );
    });
  });

  describe('calcFrameScale', () => {
    it('长宽比相等', () => {
      const originFrame = { x: 0, y: 0, width: 100, height: 100 };
      const targetFrame = { x: 0, y: 0, width: 200, height: 200 };

      const scale = Svg.calcFrameScale(originFrame, targetFrame);
      expect(scale).toBe(2);
    });
    /**
     *   Origin           Target
     * *--------*        *------*
     * |        |   ->   |      |
     * *--------*        *------*
     */
    it('源长宽比大于目标长宽比', () => {
      const originFrame = { x: 0, y: 0, width: 100, height: 50 };
      const targetFrame = { x: 0, y: 0, width: 200, height: 200 };

      const scale = Svg.calcFrameScale(originFrame, targetFrame);
      expect(scale).toBe(2);
    });
    /**
     *   Origin           Target
     * *--------*        *------*
     * |        |        |      |
     * |        |   ->   *------*
     * |        |
     * *--------*
     */
    it('源长宽比小于目标长宽比', () => {
      const originFrame = { x: 0, y: 0, width: 100, height: 200 };
      const targetFrame = { x: 0, y: 0, width: 100, height: 100 };

      const scale = Svg.calcFrameScale(originFrame, targetFrame);
      expect(scale).toBe(0.5);
    });
  });
});
