import { SketchFormat, Svgson } from 'html2sketch';
import {
  calcFrameScale,
  normalizeWindingRule,
  pathToShapeGroup,
} from 'html2sketch/parser/svgson';
import {
  svgPath,
  rect,
  compPath,
  singleRoundRect,
  unclosedRect,
  plus,
} from '@test-utils';
import Gradient from 'html2sketch/models/Style/Gradient';

describe('convertToCubicBezier', () => {
  it('svgPath转换正常', () => {
    if (!svgPath.shapes?.[0]) {
      return;
    }
    const points = pathToShapeGroup(svgPath.shapes[0].path);
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
    const points = pathToShapeGroup(plus.path);
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
        pathToShapeGroup(path);
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

    const scale = calcFrameScale(originFrame, targetFrame);
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

    const scale = calcFrameScale(originFrame, targetFrame);
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

    const scale = calcFrameScale(originFrame, targetFrame);
    expect(scale).toBe(0.5);
  });
});
describe('normalizeWindingRule', () => {
  const { WindingRule } = SketchFormat;
  it('不传参返回 EvenOdd', () => {
    expect(normalizeWindingRule()).toBe(WindingRule.EvenOdd);
  });
  it('传不正确的参返回 EvenOdd', () => {
    expect(normalizeWindingRule('123')).toBe(WindingRule.EvenOdd);
    expect(normalizeWindingRule('dxwqs')).toBe(WindingRule.EvenOdd);
    expect(normalizeWindingRule('sno-zero')).toBe(WindingRule.EvenOdd);
  });
  it('传EvenOdd 返回 EvenOdd', () => {
    expect(normalizeWindingRule('EvenOdd')).toBe(WindingRule.EvenOdd);
    expect(normalizeWindingRule('evenodd')).toBe(WindingRule.EvenOdd);
    expect(normalizeWindingRule('even-odd')).toBe(WindingRule.EvenOdd);
    expect(normalizeWindingRule('EVENODD')).toBe(WindingRule.EvenOdd);
  });
  it('传 NonZero 返回 NonZero', () => {
    expect(normalizeWindingRule('NonZero')).toBe(WindingRule.NonZero);
    expect(normalizeWindingRule('NONZERO')).toBe(WindingRule.NonZero);
    expect(normalizeWindingRule('nonzero')).toBe(WindingRule.NonZero);
    expect(normalizeWindingRule('non-zero')).toBe(WindingRule.NonZero);
    expect(normalizeWindingRule('no-zero')).toBe(WindingRule.NonZero);
    expect(normalizeWindingRule('nozero')).toBe(WindingRule.NonZero);
  });
});

describe('Svgson 解析器', () => {
  const svgson = Svgson.init();
  describe('parseNodeToGroup', () => {
    it('没有 children 正常解析', () => {
      const gNode = {
        name: 'g',
        type: 'element',
        value: '',
        attributes: {
          id: 'Page-1',
          stroke: 'none',
          strokeWidth: '1',
          fill: 'none',
          fillRule: 'evenodd',
          style: '',
        },
        children: [],
      };

      const group = svgson.parseNodeToGroup(gNode);
      expect(group.layers).toHaveLength(0);
    });
    it('有 children 解析正常', () => {
      const gNode = {
        name: 'g',
        type: 'element',
        value: '',
        attributes: {
          id: 'Page-1',
          stroke: 'none',
          strokeWidth: '1',
          fill: 'none',
          fillRule: 'evenodd',
          style: '',
        },
        children: [
          {
            name: 'ellipse',
            type: 'element',
            value: '',
            attributes: {
              id: 'Combined-Shape',
              fill: '#f1232f',
              cx: '100.519339',
              cy: '100.436681',
              rx: '23.6001926',
              ry: '23.580786',
            },
            children: [],
          },
        ],
      };
      const group = svgson.parseNodeToGroup(gNode);
      expect(group.layers).toHaveLength(1);
    });
  });
  describe('parseNodeToEllipse', () => {
    it('没有填充 没有描边', () => {
      const node = {
        name: 'ellipse',
        type: 'element',
        value: '',
        attributes: {
          id: 'Combined-Shape',
          fill: '#f1232f',
          cx: '100',
          cy: '50',
          rx: '25',
          ry: '20',
        },
        children: [],
      };
      const ellipse = svgson.parseNodeToEllipse(node);

      expect(ellipse?.cx).toBe(100);
      expect(ellipse?.cy).toBe(50);
    });
  });
  describe('parseNodeToCircle', () => {
    it('没有填充 没有描边', () => {
      const node = {
        name: 'circle',
        type: 'element',
        value: '',
        attributes: {
          id: 'Combined-Shape',
          fill: '#f1232f',
          cx: '100',
          cy: '50',
          r: '25',
        },
        children: [],
      };
      const ellipse = svgson.parseNodeToCircle(node);

      expect(ellipse?.cx).toBe(100);
      expect(ellipse?.cy).toBe(50);
      expect(ellipse?.width).toBe(50);
    });
  });
  describe('parseSvgDefs', () => {
    it('渐变', () => {
      const node = {
        name: 'radialGradient',
        type: 'element',
        value: '',
        attributes: {
          id: 'b',
          cx: '50%',
          cy: '50%',
          r: '71.331%',
          fx: '50%',
          fy: '50%',
          gradientTransform: 'matrix(0 1 -.98305 0 .992 0)',
        },
        children: [
          {
            name: 'stop',
            type: 'element',
            value: '',
            attributes: {
              offset: '0%',
              stopColor: '#FFF',
              stopOpacity: '0',
            },
            children: [],
          },
          {
            name: 'stop',
            type: 'element',
            value: '',
            attributes: {
              offset: '36.751%',
              stopColor: '#EBFFFF',
              stopOpacity: '.021',
            },
            children: [],
          },
          {
            name: 'stop',
            type: 'element',
            value: '',
            attributes: {
              offset: '100%',
              stopColor: '#68FFFF',
              stopOpacity: '.16',
            },
            children: [],
          },
        ],
      };

      const gradient = Svgson.parseSvgDefs(node) as Gradient;
      expect(gradient.class).toBe('gradient');
      expect(gradient.type).toBe(1);
      expect(gradient.stops).toHaveLength(3);
      const [s1, s2, s3] = gradient.stops;
      expect(s1.color.hex).toBe('#FFFFFF');
      expect(s2.color.hex).toBe('#EBFFFF');
      expect(s2.color.alpha).toBe(0.021);
      expect(s2.offset).toEqual(0.36751);
      expect(s3.color.hex).toBe('#68FFFF');
      expect(s3.offset).toEqual(1);
      expect(s3.color.alpha).toBe(0.16);
    });
  });
});
