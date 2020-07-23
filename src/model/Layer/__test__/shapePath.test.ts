import { ShapePath, Style } from '../../index';
import { SVGPathData } from 'svg-pathdata';
import { SketchFormat } from '../../../index';
import { defaultExportOptions } from '../../utils';
import { PointsRadiusBehaviour } from '@sketch-hq/sketch-file-format-ts/dist/cjs/v3-types';
import { ShapePathType } from '../ShapePath';

// 可复用的 shapePath 信息
const shapePathData = {
  do_objectID: 'uuid',
  booleanOperation: -1,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name: '路径',
  nameIsFixed: false,
  resizingConstraint: 63,
  resizingType: 0,
  rotation: 0,
  shouldBreakMaskChain: false,
  exportOptions: defaultExportOptions,
  clippingMaskMode: 0,
  style: new Style().toSketchJSON(),
  edited: true,
};

/**
 * 一个圆角矩形
 * path 为 'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z'
 * @see https://svg-path-visualizer.netlify.app/#M872%20474H152c-4.4%200-8%203.6-8%208v60c0%204.4%203.6%208%208%208h720c4.4%200%208-3.6%208-8v-60c0-4.4-3.6-8-8-8z
 */
const roundRect: ShapePathType = {
  frame: { width: 736, height: 76 },
  isClose: true,
  points: [
    { type: SVGPathData.MOVE_TO, x: 0.9891304347826086, y: 0 },
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
      y1: 0.9526315789473685,
      x2: 0.004891304347826087,
      y2: 1,
      x: 0.010869565217391304,
      y: 1,
    },
    {
      type: SVGPathData.LINE_TO,
      x: 0.9891304347826086,
      y: 1,
    },
    {
      type: SVGPathData.CURVE_TO,
      x1: 0.9951086956521739,
      y1: 1,
      x2: 1,
      y2: 0.9526315789473685,
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
      y1: 0.047368421052631574,
      x2: 0.9951086956521739,
      y2: 0,
      x: 0.9891304347826086,
      y: 0,
    },
  ],
};

describe('ShapePath', () => {
  describe('toSketchJSON 转换符合规范', () => {
    it('toSketchJSON 转换符合规范', function() {
      const { frame, isClose, points } = roundRect;
      const shapePath = new ShapePath({ isClose, points, ...frame });

      const sketchJSON: SketchFormat.ShapePath = {
        _class: 'shapePath',
        ...shapePathData,
        frame: {
          _class: 'rect',
          constrainProportions: false,
          height: 76,
          width: 736,
          x: 0,
          y: 0,
        },
        pointRadiusBehaviour: PointsRadiusBehaviour.Disabled,
        isClosed: true,
        points: [
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0.9891304347826086, 0}',
            curveMode: 4,
            curveTo: '{0.9951086956521739, 0}',
            hasCurveFrom: false,
            hasCurveTo: true,
            point: '{0.9891304347826086, 0}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0.0048913043478260865, 0}',
            curveMode: 4,
            curveTo: '{0.010869565217391304, 0}',
            hasCurveFrom: true,
            hasCurveTo: false,
            point: '{0.010869565217391304, 0}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0.10526315789473684}',
            curveMode: 4,
            curveTo: '{0, 0.04736842105263158}',
            hasCurveFrom: false,
            hasCurveTo: true,
            point: '{0, 0.10526315789473684}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0, 0.9526315789473685}',
            curveMode: 4,
            curveTo: '{0, 0.8947368421052632}',
            hasCurveFrom: true,
            hasCurveTo: false,
            point: '{0, 0.8947368421052632}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0.010869565217391304, 1}',
            curveMode: 4,
            curveTo: '{0.004891304347826087, 1}',
            hasCurveFrom: false,
            hasCurveTo: true,
            point: '{0.010869565217391304, 1}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{0.9951086956521739, 1}',
            curveMode: 4,
            curveTo: '{0.9891304347826086, 1}',
            hasCurveFrom: true,
            hasCurveTo: false,
            point: '{0.9891304347826086, 1}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{1, 0.8947368421052632}',
            curveMode: 4,
            curveTo: '{1, 0.9526315789473685}',
            hasCurveFrom: false,
            hasCurveTo: true,
            point: '{1, 0.8947368421052632}',
          },
          {
            _class: 'curvePoint',
            cornerRadius: 0,
            curveFrom: '{1, 0.047368421052631574}',
            curveMode: 4,
            curveTo: '{1, 0.10526315789473684}',
            hasCurveFrom: true,
            hasCurveTo: false,
            point: '{1, 0.10526315789473684}',
          },
        ],
      };
      expect(shapePath.toSketchJSON()).toStrictEqual(sketchJSON);

      console.log(shapePath.toSketchJSON());
    });
  });

  describe('svgPathToShapePath', function() {
    it('正常转换圆角矩形', function() {
      const path =
        'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z ';
      const t = ShapePath.svgPathToShapePath(path);
      expect(t).toStrictEqual(roundRect);
    });
    it('只能转化一个shape', function() {
      const path =
        'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z';
      const t = ShapePath.svgPathToShapePath(path);

      expect(t).toStrictEqual({
        ...roundRect,
        points: [
          ...roundRect.points,
          {
            type: 16,
            x: 0.9891304347826086,
            y: 0,
          },
          ...roundRect.points,
        ],
      });
    });
  });
});
