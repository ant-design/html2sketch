import { isUpdate, outputJSONData } from '@test-utils';
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
} from './commonSvgData';

describe('Svg 类', () => {
  describe('toSketchJSON', () => {
    describe('单条 path', () => {
      it('svgPath 复合对象转换正常', () => {
        const svg = new Svg({
          svgString: svgPath.svgString,
          height: 814.2161138351328,
          width: 736.652344,
          x: -90,
          y: 4,
        });
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'svg-path');
        }
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
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'dropbox');
        }
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
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'behance');
        }
        expect(svg.toSketchJSON()).toStrictEqual(behanceSvg.sketchJSON);
      });
    });

    describe('多条 path', () => {
      it('plusSvg 转换正常', () => {
        const svg = new Svg({
          height: 25,
          width: 24,
          x: 164,
          y: 22,
          svgString: plusSvg.svgString,
        });
        // 如果出现小数点的不一致 进行重新输出
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'plus');
        }
        expect(svg.toSketchJSON()).toStrictEqual(plusSvg.sketchJSON);
      });

      it('多条路径 upArrow 转换正常', () => {
        const svg = new Svg({
          svgString: upCircleSvg.svgString,
          height: 300,
          width: 300,
          x: 25,
          y: -102,
        });
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        // 如果出现小数点的不一致 进行重新输出
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'up-circle');
        }
        expect(svg.toSketchJSON()).toStrictEqual(upCircleSvg.sketchJSON);
      });
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

  describe('getSVGString', () => {
    const { getSVGString } = Svg;

    it('返回节点的正确外层 HTML  w/o children', () => {
      const outerHTML = 'pizza';
      const node1 = ({
        children: [],
        outerHTML,
      } as unknown) as Element;

      expect(getSVGString(node1)).toEqual(outerHTML);
    });

    // test('returns correct outher HTML of the DOM node with children', () => {
    //   const dom = new JSDOM(`
    // <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    //   <circle cx="100" cy="100" r="100"/>
    //   <rect x="10" y="10" width="30" height="30"/>
    //   <g>
    //     <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"/>
    //   </g>
    // </svg>`);
    //
    //   const document = dom.window.document;
    //   const node = (document.querySelector('svg') as unknown) as Element;
    //
    //   global['document'] = document;
    //   global.SVGElement = dom.window.SVGElement;
    //   global.getComputedStyle = dom.window.getComputedStyle;
    //
    //   expect(getSVGString(node))
    //     .toEqual(`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    //   <circle cx="100" cy="100" r="100"></circle>
    //   <rect x="10" y="10" width="30" height="30"></rect>
    //   <g>
    //     <ellipse cx="75" cy="75" rx="20" ry="5" stroke="red" fill="transparent" stroke-width="5"></ellipse>
    //   </g>
    // </svg>`);
    // });
    //
    // test('inlines styles of the children, ignores styles with default values', () => {
    //   const dom = new JSDOM(`
    // <html>
    // <head>
    // <style>
    //   #a {
    //     fill: red;
    //     overflow: visible; /* default value */
    //     opacity: 1; /* default value */
    //   }
    //
    //   #b {
    //     fill: blue;
    //     width: 40px;
    //     height: 40px;
    //   }
    // </style>
    // </head>
    // <body>
    // <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    //   <circle cx="100" cy="100" r="100" id="a"></circle>
    //   <g>
    //     <rect x="10" y="10" width="30" height="30" id="b"></rect>
    //   </g>
    // </svg>`);
    //
    //   const document = dom.window.document;
    //   const node = (document.querySelector('svg') as unknown) as Element;
    //
    //   global['document'] = document;
    //   global.SVGElement = dom.window.SVGElement;
    //   global.getComputedStyle = dom.window.getComputedStyle;
    //
    //   expect(getSVGString(node))
    //     .toEqual(`<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
    //   <circle cx="100" cy="100" r="100" id="a" style="fill: red;"></circle>
    //   <g>
    //     <rect x="10" y="10" width="30" height="30" id="b" style="height: 40px; width: 40px; fill: blue;"></rect>
    //   </g>
    // </svg>`);
    // });
  });
});
