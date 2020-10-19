import { SketchFormat, Svgson, Frame, Gradient } from 'html2sketch';
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
  describe('parseNodeToRectangle', () => {
    it('非 rect 不解析', () => {
      const node = {
        name: 'x',
        type: 'element',
        value: '',
        attributes: {},
        children: [],
      };

      expect(svgson.parseNodeToRectangle(node)).toBeUndefined();
    });
    it('解析 rect', () => {
      const node = {
        name: 'rect',
        type: 'element',
        value: '',
        attributes: {
          id: 'Combined-Shape',
          fill: '#f1232f',
          x: '100',
          y: '50',
          width: '25',
          height: '25',
        },
        children: [],
      };
      const rectangle = svgson.parseNodeToRectangle(node)!;

      expect(rectangle.x).toBe(100);
      expect(rectangle.y).toBe(50);
      expect(rectangle.width).toBe(25);
      expect(rectangle.height).toBe(25);
    });
  });
  describe('parseNodeToText', () => {
    it('非 text 不解析', () => {
      const node = {
        name: 'x',
        type: 'element',
        value: '',
        attributes: {},
        children: [],
      };

      expect(svgson.parseNodeToText(node)).toBeUndefined();
    });
    it('解析文本', () => {
      const node = {
        name: 'text',
        type: 'element',
        value: '',
        attributes: {
          id: 'Combined-Shape',
          fill: '#f1232f',
        },
        children: [
          {
            name: 'text',
            type: 'value',
            value: '123',
            attributes: {},
            children: [],
          },
        ],
      };
      const text = svgson.parseNodeToText(node)!;

      expect(text.text).toBe('123');
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
  describe('parseNodeAttrToStyle', () => {
    describe('解析描边', () => {
      it('解析描边和透明度', () => {
        const attr = {
          stroke: '#60acff',
          strokeWidth: '2.5',
          opacity: '.4',
        };
        const style = svgson.parseNodeAttrToStyle(attr);
        expect(style.borders).toHaveLength(1);
        const border = style.borders[0];
        expect(border.color.hex).toBe('#60ACFF');
        expect(border.thickness).toBe(2.5);
        expect(style.opacity).toBe(0.4);
      });
      it('dash类型的描边', () => {
        const attr = {
          stroke: '#60acff',
          strokeDasharray: '1px,1px',
          opacity: '.3',
        };
        const style = svgson.parseNodeAttrToStyle(attr);
        expect(style.borders).toHaveLength(1);
        expect(style.sketchBorderOptions.dashPattern).toStrictEqual([1, 1]);
      });
    });
    describe('Fill填色', () => {
      it('带有填充色', () => {
        const attr = {
          fill: '#7f95ff',
          opacity: '0.1',
        };
        const style = svgson.parseNodeAttrToStyle(attr);

        expect(style.fills).toHaveLength(1);
        expect(style.opacity).toBe(0.1);
        const fill = style.fills[0];
        expect(fill.type).toBe(0); // 填色类型
        expect(fill.color.hex).toBe('#7f95ff'.toUpperCase());
      });
      it('无填充色', () => {
        const attr = { fill: 'none' };
        const style = svgson.parseNodeAttrToStyle(attr);
        expect(style.fills).toHaveLength(0);
      });
      it('默认黑色', () => {
        const attr = {};
        const style = svgson.parseNodeAttrToStyle(attr);
        expect(style.fills).toHaveLength(1);
        expect(style.opacity).toBe(1);
        const fill = style.fills[0];
        expect(fill.type).toBe(0); // 填色类型
        expect(fill.color.hex).toBe('#000000');
      });
    });
    describe('渐变', () => {
      it('径向渐变', () => {
        const attr = {
          fill: 'url(#c)',
        };
        const grad = Svgson.parseSvgDefs({
          name: 'radialGradient',
          type: 'element',
          value: '',
          attributes: {
            id: 'c',
            cx: '50%',
            cy: '50%',
            r: '50%',
            fx: '50%',
            fy: '50%',
            // TODO 解析 gradientTransform
            gradientTransform: 'matrix(0 1 -.98305 0 .992 0)',
          },
          children: [
            {
              name: 'stop',
              type: 'element',
              value: '',
              attributes: {
                offset: '0%',
                stopColor: '#3187FF',
              },
              children: [],
            },
            {
              name: 'stop',
              type: 'element',
              value: '',
              attributes: {
                offset: '100%',
                stopColor: '#338FFF',
                stopOpacity: '0.3',
              },
              children: [],
            },
          ],
        });
        svgson.defs.push(<Gradient>grad);

        const style = svgson.parseNodeAttrToStyle(attr);
        expect(style.fills).toHaveLength(1);

        const fill = style.fills[0];

        expect(fill.type).toBe(1); // 填充类型是渐变

        const { gradient } = fill;
        expect(gradient.type).toBe(1); // 渐变类型是径向渐变
        expect(gradient.from).toStrictEqual({ x: 0.5, y: 0.5 });
        expect(gradient.to).toStrictEqual({ x: 1, y: 0.5 });

        // TODO 渐变的 Transform 和 ellipseLength 覆盖

        // 渐变梯度
        expect(gradient.stops).toHaveLength(2);
        const [s1, s2] = gradient.stops;
        expect(Math.abs(s1.offset!)).toBe(0);
        expect(s1.color.hex).toBe('#3187FF');
        expect(s1.color.alpha).toBe(1);
        expect(s2.offset).toBe(1);
        expect(s2.color.hex).toBe('#338FFF');
        expect(s2.color.alpha).toBe(0.3); // 渐变透明度
      });
    });
  });
  describe('applyTransformString', () => {
    it('空 transform,frame 不变', () => {
      const frame = new Frame();
      expect(frame.x).toBe(0);
      expect(frame.y).toBe(0);
      expect(frame.rotation).toBe(0);
      svgson.applyTransformString(frame);
      expect(frame.x).toBe(0);
      expect(frame.y).toBe(0);
      expect(frame.rotation).toBe(0);
    });
    it('错误的 transform ,frame 不变', () => {
      const frame = new Frame();
      expect(frame.x).toBe(0);
      expect(frame.y).toBe(0);
      expect(frame.rotation).toBe(0);
      svgson.applyTransformString(frame, '123');
      expect(frame.x).toBe(0);
      expect(frame.y).toBe(0);
      expect(frame.rotation).toBe(0);
    });
    it('正确的 transform', () => {
      const frame = new Frame();

      svgson.applyTransformString(frame, 'rotate(15 408.32 3453.665)');
      expect(frame.x).toBe(907.787444013645);
      expect(frame.y).toBe(11.999788653103678);
      expect(frame.rotation).toBe(15);
    });
  });

  describe('测试用例', () => {
    it('子级继承父级 fill 属性', () => {
      const svg = `
<svg>
  <g fill="none" fill-rule="evenodd" >
    <g>
      <g>
        <circle cx="73" cy="73" r="73" stroke="#60ACFF" opacity=".2"/>
      </g>
    </g>
  </g>
</svg>
`;
      const result = new Svgson(svg, { width: 100, height: 100 });
      expect(result.layers).toHaveLength(2);
      // 取到圆
      const circle = result.layers[1].layers[0].layers[0].layers[0];
      expect(circle.class).toBe('ellipse'); // 确保取到的是 ellipse
      expect(circle.style.fills).toHaveLength(0); // 没有填充
    });
    it('svg 循环嵌套', () => {
      const svg = `<svg><svg><g></g></svg></svg>`;
      const result = new Svgson(svg, { width: 100, height: 100 });
      expect(result.layers).toHaveLength(2);
    });
  });
});
