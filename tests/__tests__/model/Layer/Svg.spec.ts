import { Svg } from 'html2sketch';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import {
  isUpdate,
  outputJSONData,
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
  antdSvg,
  antdJSON,
} from '@test-utils';

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

    describe('解析复杂插画', () => {
      it('antd Logo 可正常解析', () => {
        const svg = new Svg({
          height: 100,
          width: 100,
          x: 0,
          y: 0,
          svgString: antdSvg,
        });
        // outputJSONData(svg.toSketchJSON(), 'antd');

        expect(svg.toSketchJSON()).toStrictEqual(antdJSON);
      });
      it('精简版 svgString 可正常解析', () => {
        const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs>
  <linearGradient id="a" x1="62.102%" x2="108.197%" y1="0%" y2="37.864%"><stop offset="0%" stop-color="#4285EB"/><stop offset="100%" stop-color="#2EC7FF"/></linearGradient>
  <linearGradient id="b" x1="69.644%" x2="54.043%" y1="0%" y2="108.457%"><stop offset="0%" stop-color="#29CDFF"/><stop offset="37.86%" stop-color="#148EFF"/><stop offset="100%" stop-color="#0A60FF"/></linearGradient>
  <linearGradient id="c" x1="69.691%" x2="16.723%" y1="-12.974%" y2="117.391%"><stop offset="0%" stop-color="#FA816E"/><stop offset="41.473%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient>
  <linearGradient id="d" x1="68.128%" x2="30.44%" y1="-35.691%" y2="114.943%"><stop offset="0%" stop-color="#FA8E7D"/><stop offset="51.264%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient>
</defs>
<g fill="none" fill-rule="evenodd">
  <g fill-rule="nonzero">
    <path fill="url(#a)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0 4.209-4.205 4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/>
    <path fill="url(#b)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786 5.186-.883 10.855 1.062 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/>
    <path fill="url(#c)" d="M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228z"/>
  </g>
  <ellipse cx="100.519" cy="100.437" fill="url(#d)" rx="23.6" ry="23.581"/>
</g>
</svg>
`;
        const svg = new Svg({
          height: 100,
          width: 100,
          x: 0,
          y: 0,
          svgString,
        });
        // outputJSONData(svg.toSketchJSON(), 'antd');
        expect(svg.layers.length).toBe(1);
        // expect(svg.toSketchJSON()).toStrictEqual(antdJSON);
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
  });

  // describe('parseSvgonToSvgShape', () => {
  //   it('antd Svgson', () => {
  //     const data = Svg.parseSvgsonToSvgShape(antdSvgson);
  //     console.log(data);
  //   });
  // });

  // describe('parseGNodeToGroup', () => {
  //   it('不是 g 则返回空', () => {
  //     const gNode = {
  //       name: 'a',
  //       type: 'element',
  //       value: '',
  //       attributes: {},
  //       children: [],
  //     };
  //
  //     expect(Svg.parseGNodeToGroup(gNode)).toBeUndefined();
  //   });
  //   it('没有 children 正常解析', () => {
  //     const gNode = {
  //       name: 'g',
  //       type: 'element',
  //       value: '',
  //       attributes: {
  //         id: 'Page-1',
  //         stroke: 'none',
  //         strokeWidth: '1',
  //         fill: 'none',
  //         fillRule: 'evenodd',
  //         style: '',
  //       },
  //       children: [],
  //     };
  //
  //     expect(Svg.parseGNodeToGroup(gNode)).toStrictEqual({
  //       type: 'group',
  //       layers: [],
  //       path: '',
  //       style: { fills: [], strokes: [], style: '' },
  //       windingRule: SketchFormat.WindingRule.EvenOdd,
  //     });
  //   });
  //   it('有 children 解析正常', () => {
  //     const gNode = {
  //       name: 'g',
  //       type: 'element',
  //       value: '',
  //       attributes: {
  //         id: 'Page-1',
  //         stroke: 'none',
  //         strokeWidth: '1',
  //         fill: 'none',
  //         fillRule: 'evenodd',
  //         style: '',
  //       },
  //       children: [
  //         {
  //           name: 'ellipse',
  //           type: 'element',
  //           value: '',
  //           attributes: {
  //             id: 'Combined-Shape',
  //             fill: 'url(#linearGradient-4)',
  //             cx: '100.519339',
  //             cy: '100.436681',
  //             rx: '23.6001926',
  //             ry: '23.580786',
  //             style:
  //               'cx: 100.519px; cy: 100.437px; rx: 23.6002px; ry: 23.5808px; fill: url(&quot;#linearGradient-4&quot;); color: rgba(0, 0, 0, 0.85); fill-rule: evenodd; font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.85);',
  //           },
  //           children: [],
  //         },
  //       ],
  //     };
  //
  //     expect(Svg.parseGNodeToGroup(gNode)).toStrictEqual({
  //       type: 'group',
  //       layers: [],
  //       path: '',
  //       style: { fills: [], strokes: [], style: '' },
  //       windingRule: SketchFormat.WindingRule.EvenOdd,
  //     });
  //   });
  // });

  describe('normalizeWindingRule', () => {
    const { WindingRule } = SketchFormat;
    it('不传参返回 EvenOdd', () => {
      expect(Svg.normalizeWindingRule()).toBe(WindingRule.EvenOdd);
    });
    it('传不正确的参返回 EvenOdd', () => {
      expect(Svg.normalizeWindingRule('123')).toBe(WindingRule.EvenOdd);
      expect(Svg.normalizeWindingRule('dxwqs')).toBe(WindingRule.EvenOdd);
      expect(Svg.normalizeWindingRule('sno-zero')).toBe(WindingRule.EvenOdd);
    });
    it('传EvenOdd 返回 EvenOdd', () => {
      expect(Svg.normalizeWindingRule('EvenOdd')).toBe(WindingRule.EvenOdd);
      expect(Svg.normalizeWindingRule('evenodd')).toBe(WindingRule.EvenOdd);
      expect(Svg.normalizeWindingRule('even-odd')).toBe(WindingRule.EvenOdd);
      expect(Svg.normalizeWindingRule('EVENODD')).toBe(WindingRule.EvenOdd);
    });
    it('传 NonZero 返回 NonZero', () => {
      expect(Svg.normalizeWindingRule('NonZero')).toBe(WindingRule.NonZero);
      expect(Svg.normalizeWindingRule('NONZERO')).toBe(WindingRule.NonZero);
      expect(Svg.normalizeWindingRule('nonzero')).toBe(WindingRule.NonZero);
      expect(Svg.normalizeWindingRule('non-zero')).toBe(WindingRule.NonZero);
      expect(Svg.normalizeWindingRule('no-zero')).toBe(WindingRule.NonZero);
      expect(Svg.normalizeWindingRule('nozero')).toBe(WindingRule.NonZero);
    });
  });

  describe('parseNodeAttrToStyle', () => {
    it('没有填充 没有描边', () => {
      const attributes = {
        stroke: 'none',
        strokeWidth: '1',
        fill: 'none',
        fillRule: 'evenodd',
        style: '',
      };
      expect(Svg.parseNodeAttrToStyle(attributes)).toStrictEqual({
        fills: [],
        strokes: [],
        style: '',
      });
    });
  });

  // describe('parseNodeToEllipse', () => {
  //   it('没有填充 没有描边', () => {
  //     const node = {
  //       name: 'ellipse',
  //       type: 'element',
  //       value: '',
  //       attributes: {
  //         id: 'Combined-Shape',
  //         fill: 'url(#linearGradient-4)',
  //         cx: '100.519339',
  //         cy: '100.436681',
  //         rx: '23.6001926',
  //         ry: '23.580786',
  //         style:
  //           'cx: 100.519px; cy: 100.437px; rx: 23.6002px; ry: 23.5808px; fill: url(&quot;#linearGradient-4&quot;); color: rgba(0, 0, 0, 0.85); fill-rule: evenodd; font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.85);',
  //       },
  //       children: [],
  //     };
  //     expect(Svg.parseNodeToEllipse(node)).toStrictEqual({
  //       type: 'ellipse',
  //       fills: [],
  //       strokes: [],
  //       style: '',
  //     });
  //   });
  // });
});
