import { SVGPathData } from 'svg-pathdata';
import { convertToCubicBezier } from '../svg';

describe('svg', () => {
  it('convertToCubicBezier', () => {
    const path =
      'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z';
    const t = convertToCubicBezier(path);
    expect(t).toStrictEqual({
      frame: { width: 736, height: 76 },
      isClose: true,
      points: [
        { type: 2, x: 0.9891304347826086, y: 0 },
        {
          type: SVGPathData.LINE_TO,
          x: 0.010869565217391304,
          y: 0,
        },
        {
          type: SVGPathData.CURVE_TO,
          x1: 0.0048913043478260865,
          y1: 0,
          x2: 0,
          y2: 0.04736842105263158,
          x: 0,
          y: 0.10526315789473684,
        },
        {
          type: SVGPathData.LINE_TO,
          x: 0,
          y: 0.8947368421052632,
        },
        {
          type: SVGPathData.CURVE_TO,
          x1: 0,
          y1: 0.9526315789473684,
          x2: 0.004891304347826087,
          y2: 1,
          x: 0.010869565217391304,
          y: 1,
        },
        {
          type: SVGPathData.LINE_TO,
          x: 0.9891304347826088,
          y: 1,
        },
        {
          type: SVGPathData.CURVE_TO,
          x1: 0.995108695652174,
          y1: 1,
          x2: 1,
          y2: 0.9526315789473684,
          x: 1,
          y: 0.8947368421052632,
        },
        {
          type: SVGPathData.LINE_TO,
          x: 1,
          y: 0.10526315789473684,
        },
        {
          type: SVGPathData.CURVE_TO,
          x1: 1,
          y1: 0.04736842105263157,
          x2: 0.9951086956521739,
          y2: 0,
          x: 0.9891304347826086,
          y: 0,
        },
      ],
    });
  });
});
