import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { defaultExportOptions } from '../../utils';
import Style from '../../Style/Style';
import { ShapePathType } from '../ShapePath';
import { SVGPathData } from 'svg-pathdata';

interface TestSvgData {
  path: string;
  shapePath: ShapePathType;
  sketchJSON: SketchFormat.ShapePath;
}
// 可复用的 shapeGroup 信息
const shapeGroupData = {
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
  pointRadiusBehaviour: 1,
};

/**
 * 不规则复杂矩形
 * Path: M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z
 * @see https://svg-path-visualizer.netlify.app/#M73.2226562%2C282.36788%20C517.988281%2C268.985067%20740.371094%2C312.330119%20740.371094%2C412.403036%20C740.371094%2C562.512411%20706.574547%2C689.414193%20665.761719%2C731.926473%20C585.929687%2C815.082723%20381.128906%2C824.973348%20240.128906%2C815.082723%20C193.160156%2C721.491578%20114.450521%2C640.427775%204%2C571.891317%20L73.2226562%2C282.36788%20Z
 */
export const compPath: TestSvgData = {
  path:
    'M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z',
  shapePath: {
    frame: {
      height: 538.2161135860229,
      width: 736.371094,
      x: 4,
      y: 280.00000024911,
    },
    isClose: true,
    points: [
      {
        type: 2,
        x: 0.09400512426958466,
        y: 0.004399496208155765,
      },
      {
        type: 32,
        x: 1,
        x1: 0.6980017075466572,
        x2: 1,
        y: 0.24600347780135365,
        y1: -0.020465632616830685,
        y2: 0.060069027914235316,
      },
      {
        type: 32,
        x: 0.8986796526806632,
        x1: 1,
        x2: 0.954103919510996,
        y: 0.8396747353768307,
        y1: 0.5249051517030365,
        y2: 0.7606873566513045,
      },
      {
        type: 32,
        x: 0.32066563710063284,
        x1: 0.7902668800304646,
        x2: 0.5121451793435009,
        y: 0.9941781920755667,
        y1: 0.9941781920755667,
        y2: 1.0125548715363522,
      },
      {
        type: 32,
        x: 0,
        x1: 0.25688156086148595,
        x2: 0.14999301561394532,
        y: 0.54233106252817,
        y1: 0.8202868078573917,
        y2: 0.6696710961502698,
      },
      {
        type: 16,
        x: 0.09400512426958466,
        y: 0.004399496208155765,
      },
    ],
  },
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: {
      _class: 'rect',
      constrainProportions: false,
      height: 538.2161135860229,
      width: 736.371094,
      x: 4,
      y: 280.00000024911,
    },
    isClosed: true,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.69800170754665725, -0.020465632616830577}',
        curveMode: 4,
        curveTo: '{0.09400512426958466, 0.004399496208155765}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.09400512426958466, 0.004399496208155765}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0.52490515170303653}',
        curveMode: 3,
        curveTo: '{1, 0.060069027914235316}',
        hasCurveFrom: true,
        hasCurveTo: true,
        point: '{1, 0.24600347780135365}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.79026688003046464, 0.99417819207556657}',
        curveMode: 3,
        curveTo: '{0.954103919510996, 0.7606873566513045}',
        hasCurveFrom: true,
        hasCurveTo: true,
        point: '{0.8986796526806632, 0.8396747353768307}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.25688156086148595, 0.82028680785739161}',
        curveMode: 4,
        curveTo: '{0.5121451793435009, 1.0125548715363522}',
        hasCurveFrom: true,
        hasCurveTo: true,
        point: '{0.32066563710063284, 0.9941781920755667}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 0.54233106252817}',
        curveMode: 4,
        curveTo: '{0.14999301561394532, 0.6696710961502698}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0, 0.54233106252817}',
      },
    ],
  },
};

/**
 * 一个带圆角的矩形
 * @see https://svg-path-visualizer.netlify.app/#M460%2C4%20L640.652344%2C4%20C695.880819%2C4%20740.652344%2C48.771525%20740.652344%2C104%20L740.652344%2C233.328125%20L460%2C233.328125%20L460%2C4%20Z
 */
export const singleRoundRect: TestSvgData = {
  path:
    'M460,4 L640.652344,4 C695.880819,4 740.652344,48.771525 740.652344,104 L740.652344,233.328125 L460,233.328125 L460,4 Z',
  shapePath: {
    frame: {
      height: 229.328125,
      width: 280.65234399999997,
      x: 460,
      y: 4,
    },
    isClose: true,
    points: [
      {
        type: 2,
        x: 0,
        y: 0,
      },
      {
        type: 16,
        x: 0.6436872802316591,
        y: 0,
      },
      {
        type: 32,
        x: 1,
        x1: 0.8404733615907374,
        x2: 1,
        y: 0.4360564147986646,
        y1: 0,
        y2: 0.1952291067656878,
      },
      {
        type: 16,
        x: 1,
        y: 1,
      },
      {
        type: 16,
        x: 0,
        y: 1,
      },
      {
        type: 16,
        x: 0,
        y: 0,
      },
    ],
  },
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: {
      _class: 'rect',
      constrainProportions: false,
      height: 229.328125,
      width: 280.65234399999997,
      x: 460,
      y: 4,
    },
    isClosed: true,
    pointRadiusBehaviour: 1,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.8404733615907374, 0}',
        curveMode: 4,
        curveTo: '{0.6436872802316591, 0}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.6436872802316591, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0.4360564147986646}',
        curveMode: 4,
        curveTo: '{1, 0.1952291067656878}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{1, 0.4360564147986646}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ],
  },
};

/**
 * 一个矩形
 * Path: M288.371094,399.757812 L569.023438,399.757812 L569.023438,629.085937 L288.371094,629.085937 L288.371094,399.757812 Z
 * @see https://svg-path-visualizer.netlify.app/#M288.371094%2C399.757812%20L569.023438%2C399.757812%20L569.023438%2C629.085937%20L288.371094%2C629.085937%20L288.371094%2C399.757812%20Z
 */
export const rect: TestSvgData = {
  path:
    'M288.371094,399.757812 L569.023438,399.757812 L569.023438,629.085937 L288.371094,629.085937 L288.371094,399.757812 Z',
  shapePath: {
    frame: {
      height: 229.32812499999994,
      width: 280.652344,
      x: 288.371094,
      y: 399.757812,
    },
    isClose: true,
    points: [
      {
        type: 2,
        x: 0,
        y: 0,
      },
      {
        type: 16,
        x: 1,
        y: 0,
      },
      {
        type: 16,
        x: 1,
        y: 1,
      },
      {
        type: 16,
        x: 0,
        y: 1,
      },
      {
        type: 16,
        x: 0,
        y: 0,
      },
    ],
  },
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: {
      _class: 'rect',
      constrainProportions: false,
      height: 229.32812499999994,
      width: 280.652344,
      x: 288.371094,
      y: 399.757812,
    },
    isClosed: true,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0}',
        curveMode: 1,
        curveTo: '{1, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ],
  },
};

/**
 * 一个圆角矩形
 * path: 'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z'
 * @see https://svg-path-visualizer.netlify.app/#M872%20474H152c-4.4%200-8%203.6-8%208v60c0%204.4%203.6%208%208%208h720c4.4%200%208-3.6%208-8v-60c0-4.4-3.6-8-8-8z
 */
export const roundRect: TestSvgData = {
  path:
    'M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z ',
  shapePath: {
    frame: { width: 736, height: 76, x: 144, y: 474 },
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
  },
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: {
      _class: 'rect',
      constrainProportions: false,
      height: 76,
      width: 736,
      x: 144,
      y: 474,
    },
    pointRadiusBehaviour: SketchFormat.PointsRadiusBehaviour.Rounded,
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
  },
};

/**
 * 一个开放矩形
 * @see https://svg-path-visualizer.netlify.app/#M68%2C4%20L248.652344%2C4%20C303.880819%2C4%20348.652344%2C48.771525%20348.652344%2C104%20L348.652344%2C233.328125%20L68%2C233.328125
 */
export const unclosedRect: TestSvgData = {
  path:
    'M68,4 L248.652344,4 C303.880819,4 348.652344,48.771525 348.652344,104 L348.652344,233.328125 L68,233.328125',
  shapePath: {
    frame: {
      height: 229.328125,
      width: 280.652344,
      x: 68,
      y: 4,
    },
    isClose: false,
    points: [
      {
        type: 2,
        x: 0,
        y: 0,
      },
      {
        type: 16,
        x: 0.6436872802316591,
        y: 0,
      },
      {
        type: 32,
        x: 1,
        x1: 0.8404733615907372,
        x2: 1,
        y: 0.4360564147986646,
        y1: 0,
        y2: 0.1952291067656878,
      },
      {
        type: 16,
        x: 1,
        y: 1,
      },
      {
        type: 16,
        x: 0,
        y: 1,
      },
    ],
  },
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: {
      _class: 'rect',
      constrainProportions: false,
      height: 229.328125,
      width: 280.652344,
      x: 68,
      y: 4,
    },
    isClosed: false,
    pointRadiusBehaviour: 1,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 0}',
        curveMode: 1,
        curveTo: '{0, 0}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.8404733615907372, 0}',
        curveMode: 4,
        curveTo: '{0.6436872802316591, 0}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.6436872802316591, 0}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0.4360564147986646}',
        curveMode: 4,
        curveTo: '{1, 0.1952291067656878}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{1, 0.4360564147986646}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 1}',
        curveMode: 1,
        curveTo: '{1, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{1, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 1}',
        curveMode: 1,
        curveTo: '{0, 1}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0, 1}',
      },
    ],
  },
};
