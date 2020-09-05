import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { SVGPathData } from 'svg-pathdata';
import { Frame, Style, ShapePathType } from 'html2sketch';
import { defaultExportOptions } from 'html2sketch/model/utils';
import behanceJSON from './json/behance.json';
import dropboxJSON from './json/dropbox.json';
import upCircleJSON from './json/up-circle.json';
import plusJSON from './json/plus.json';
import svgPathJSON from './json/svg-path.json';

interface TestPathData {
  path: string;
  shapePath: ShapePathType;
  sketchJSON: SketchFormat.ShapePath;
}

interface TestSvgData {
  svgString: string;
  sketchJSON: Object;
  shapes?: { path: string }[];
}

// 可复用的 shapePath 数据
export const shapePathData = {
  do_objectID: 'UUID',
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
  pointRadiusBehaviour: SketchFormat.PointsRadiusBehaviour.Rounded,
};

// 可复用的 shapeGroup 数据
export const shapeGroupData = {
  _class: 'shapeGroup',
  do_objectID: 'UUID',
  booleanOperation: -1,
  isFixedToViewport: false,
  isFlippedHorizontal: false,
  isFlippedVertical: false,
  isLocked: false,
  isVisible: true,
  layerListExpandedType: 0,
  name: 'shapeGroup',
  nameIsFixed: false,
  resizingConstraint: 63,
  resizingType: 0,
  shouldBreakMaskChain: false,
  exportOptions: defaultExportOptions,
  rotation: 0,
  clippingMaskMode: 0,
  style: new Style().toSketchJSON(),
  hasClickThrough: false,
  windingRule: 1,
};

// ----------- Path 类 ------------- //

/**
 * 不规则复杂矩形
 * Path: M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z
 * @see https://svg-path-visualizer.netlify.app/#M73.2226562%2C282.36788%20C517.988281%2C268.985067%20740.371094%2C312.330119%20740.371094%2C412.403036%20C740.371094%2C562.512411%20706.574547%2C689.414193%20665.761719%2C731.926473%20C585.929687%2C815.082723%20381.128906%2C824.973348%20240.128906%2C815.082723%20C193.160156%2C721.491578%20114.450521%2C640.427775%204%2C571.891317%20L73.2226562%2C282.36788%20Z
 */
export const compPath: TestPathData = {
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
    frame: new Frame({
      height: 538.2161135860229,
      width: 736.371094,
      x: 4,
      y: 280.00000024911,
    }).toSketchJSON(),
    isClosed: true,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.6980017075466572, -0.020465632616830685}',
        curveMode: 4,
        curveTo: '{0.09400512426958466, 0.004399496208155765}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.09400512426958466, 0.004399496208155765}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0.5249051517030365}',
        curveMode: 3,
        curveTo: '{1, 0.060069027914235316}',
        hasCurveFrom: true,
        hasCurveTo: true,
        point: '{1, 0.24600347780135365}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.7902668800304646, 0.9941781920755667}',
        curveMode: 3,
        curveTo: '{0.954103919510996, 0.7606873566513045}',
        hasCurveFrom: true,
        hasCurveTo: true,
        point: '{0.8986796526806632, 0.8396747353768307}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.25688156086148595, 0.8202868078573917}',
        curveMode: 3,
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
export const singleRoundRect: TestPathData = {
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
    frame: new Frame({
      height: 229.328125,
      width: 280.65234399999997,
      x: 460,
      y: 4,
    }).toSketchJSON(),
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
export const rect: TestPathData = {
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
    _class: SketchFormat.ClassValue.ShapePath,
    ...shapePathData,
    frame: new Frame({
      height: 229.32812499999994,
      width: 280.652344,
      x: 288.371094,
      y: 399.757812,
    }).toSketchJSON(),
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
export const roundRect: TestPathData = {
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
    frame: new Frame({
      height: 76,
      width: 736,
      x: 144,
      y: 474,
    }).toSketchJSON(),
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
export const unclosedRect: TestPathData = {
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
    frame: new Frame({
      height: 229.328125,
      width: 280.652344,
      x: 68,
      y: 4,
    }).toSketchJSON(),
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

/**
 * 上箭头
 */
export const upArrow: TestPathData = {
  path:
    'M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z',
  shapePath: {
    frame: {
      height: 262.00241998455107,
      width: 371.92533073817987,
      x: 326.0873346309101,
      y: 356.99758001544893,
    },
    isClose: true,
    points: [
      {
        type: 2,
        x: 0.5173421906682137,
        y: 0.012604540006713702,
      },
      {
        type: 32,
        x: 0.49999999999999994,
        x1: 0.5133248399992646,
        x2: 0.5068719500712158,
        y: -7.796914110299981e-17,
        y1: 0.004690048149804349,
        y2: -7.796914110299981e-17,
      },
      {
        type: 32,
        x: 0.48265780933178615,
        x1: 0.493128049928784,
        x2: 0.48667516000073524,
        y: 0.012604540006713698,
        y1: -7.796914110299981e-17,
        y2: 0.004690048149804346,
      },
      {
        type: 16,
        x: 0.004067121123714938,
        y: 0.951527165280577,
      },
      {
        type: 32,
        x: 0.021543747378504056,
        x1: -0.00614998345600793,
        x2: 0.004067121123714938,
        y: 1,
        y1: 0.9717559860689977,
        y2: 1,
      },
      {
        type: 16,
        x: 0.14764432758613624,
        y: 1,
      },
      {
        type: 32,
        x: 0.21728196143214212,
        x1: 0.17506918724749762,
        x2: 0.201149691043106,
        y: 0.9496187859609146,
        y1: 1,
        y2: 0.9812978826673093,
      },
      {
        type: 16,
        x: 0.4998655644134246,
        y: 0.3946620798031108,
      },
      {
        type: 16,
        x: 0.7827180385678576,
        y: 0.9496187859609145,
      },
      {
        type: 32,
        x: 0.8523556724138635,
        x1: 0.7988503089568938,
        x2: 0.8246619415793516,
        y: 1,
        y1: 0.9812978826673091,
        y2: 1,
      },
      {
        type: 16,
        x: 0.9784562526214958,
        y: 1,
      },
      {
        type: 32,
        x: 0.9959328788762849,
        x1: 0.9959328788762849,
        x2: 1.0061499834560077,
        y: 0.951527165280577,
        y1: 1,
        y2: 0.9717559860689976,
      },
      {
        type: 16,
        x: 0.5173421906682137,
        y: 0.012604540006713702,
      },
    ],
  },
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: new Frame({
      width: 371.92533073817987,
      height: 262.00241998455107,
      x: 326.0873346309101,
      y: 356.99758001544893,
    }).toSketchJSON(),
    isClosed: true,
    pointRadiusBehaviour: 1,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.5133248399992646, 0.004690048149804349}',
        curveMode: 4,
        curveTo: '{0.5173421906682137, 0.012604540006713702}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.5173421906682137, 0.012604540006713702}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.493128049928784, -7.796914110299981e-17}',
        curveMode: 3,
        curveTo: '{0.5068719500712158, -7.796914110299981e-17}',
        hasCurveFrom: true,
        hasCurveTo: true,
        point: '{0.49999999999999994, -7.796914110299981e-17}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.48265780933178615, 0.012604540006713698}',
        curveMode: 4,
        curveTo: '{0.48667516000073524, 0.004690048149804346}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.48265780933178615, 0.012604540006713698}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{-0.00614998345600793, 0.9717559860689977}',
        curveMode: 4,
        curveTo: '{0.004067121123714938, 0.951527165280577}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.004067121123714938, 0.951527165280577}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.021543747378504056, 1}',
        curveMode: 4,
        curveTo: '{0.004067121123714938, 1}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.021543747378504056, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.17506918724749762, 1}',
        curveMode: 4,
        curveTo: '{0.14764432758613624, 1}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.14764432758613624, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.21728196143214212, 0.9496187859609146}',
        curveMode: 4,
        curveTo: '{0.201149691043106, 0.9812978826673093}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.21728196143214212, 0.9496187859609146}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.4998655644134246, 0.3946620798031108}',
        curveMode: 1,
        curveTo: '{0.4998655644134246, 0.3946620798031108}',
        hasCurveFrom: false,
        hasCurveTo: false,
        point: '{0.4998655644134246, 0.3946620798031108}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.7988503089568938, 0.9812978826673091}',
        curveMode: 4,
        curveTo: '{0.7827180385678576, 0.9496187859609145}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.7827180385678576, 0.9496187859609145}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.8523556724138635, 1}',
        curveMode: 4,
        curveTo: '{0.8246619415793516, 1}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.8523556724138635, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.9959328788762849, 1}',
        curveMode: 4,
        curveTo: '{0.9784562526214958, 1}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.9784562526214958, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.9959328788762849, 0.951527165280577}',
        curveMode: 4,
        curveTo: '{1.0061499834560077, 0.9717559860689976}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.9959328788762849, 0.951527165280577}',
      },
    ],
  },
};

export const plus: TestPathData = {
  path: 'M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z',
  shapePath: {
    frame: { height: 720, width: 76, x: 474, y: 151.99999999999997 },
    isClose: true,
    points: [
      {
        type: 2,
        x: 0.10526315789473684,
        y: 3.947459643111668e-17,
      },
      {
        type: 16,
        x: 0.8947368421052632,
        y: 3.947459643111668e-17,
      },
      {
        type: 32,
        x: 1,
        x1: 0.9649122807017543,
        x2: 1,
        y: 0.011111111111111151,
        y1: 3.947459643111668e-17,
        y2: 0.003703703703703743,
      },
      {
        type: 16,
        x: 1,
        y: 0.9888888888888889,
      },
      {
        type: 32,
        x: 0.8947368421052632,
        x1: 1,
        x2: 0.9649122807017543,
        y: 1,
        y1: 0.9962962962962963,
        y2: 1,
      },
      {
        type: 16,
        x: 0.10526315789473684,
        y: 1,
      },
      {
        type: 32,
        x: 0,
        x1: 0.03508771929824562,
        x2: 0,
        y: 0.9888888888888889,
        y1: 1,
        y2: 0.9962962962962963,
      },
      {
        type: 16,
        x: 0,
        y: 0.011111111111111151,
      },
      {
        type: 32,
        x: 0.10526315789473684,
        x1: 0,
        x2: 0.03508771929824561,
        y: 3.947459643111668e-17,
        y1: 0.0037037037037037437,
        y2: 3.947459643111668e-17,
      },
    ],
  },
  // @ts-ignore
  sketchJSON: {
    _class: 'shapePath',
    ...shapePathData,
    frame: {
      _class: 'rect',
      constrainProportions: false,
      height: 720,
      width: 76,
      x: 474,
      y: 151.99999999999997,
    },
    style: {
      _class: 'style',
      do_objectID: 'UUID',
      endMarkerType: 0,
      miterLimit: 10,
      startMarkerType: 0,
      windingRule: 1,
      borderOptions: {
        _class: 'borderOptions',
        isEnabled: true,
        dashPattern: [],
        lineCapStyle: 0,
        lineJoinStyle: 0,
      },
      colorControls: {
        _class: 'colorControls',
        isEnabled: false,
        brightness: 0,
        contrast: 1,
        hue: 0,
        saturation: 1,
      },
      fills: [],
      borders: [],
      shadows: [],
      innerShadows: [],
      contextSettings: {
        _class: 'graphicsContextSettings',
        blendMode: 0,
        opacity: 1,
      },
    },
    isClosed: true,
    points: [
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.10526315789473684, 3.947459643111668e-17}',
        curveMode: 4,
        curveTo: '{0.03508771929824561, 3.947459643111668e-17}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.10526315789473684, 3.947459643111668e-17}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.9649122807017543, 3.947459643111668e-17}',
        curveMode: 4,
        curveTo: '{0.8947368421052632, 3.947459643111668e-17}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.8947368421052632, 3.947459643111668e-17}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0.011111111111111151}',
        curveMode: 4,
        curveTo: '{1, 0.003703703703703743}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{1, 0.011111111111111151}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{1, 0.9962962962962963}',
        curveMode: 4,
        curveTo: '{1, 0.9888888888888889}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{1, 0.9888888888888889}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.8947368421052632, 1}',
        curveMode: 4,
        curveTo: '{0.9649122807017543, 1}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0.8947368421052632, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0.03508771929824562, 1}',
        curveMode: 4,
        curveTo: '{0.10526315789473684, 1}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0.10526315789473684, 1}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 0.9888888888888889}',
        curveMode: 4,
        curveTo: '{0, 0.9962962962962963}',
        hasCurveFrom: false,
        hasCurveTo: true,
        point: '{0, 0.9888888888888889}',
      },
      {
        _class: 'curvePoint',
        cornerRadius: 0,
        curveFrom: '{0, 0.0037037037037037437}',
        curveMode: 4,
        curveTo: '{0, 0.011111111111111151}',
        hasCurveFrom: true,
        hasCurveTo: false,
        point: '{0, 0.011111111111111151}',
      },
    ],
    pointRadiusBehaviour: 1,
  },
};
// ----------- Svg 类 -------------- //

/**
 * SVG 图形如下
 * Path: M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z M288.371094,399.757812 L569.023438,399.757812 L569.023438,629.085937 L288.371094,629.085937 L288.371094,399.757812 Z M460,4 L640.652344,4 C695.880819,4 740.652344,48.771525 740.652344,104 L740.652344,233.328125 L460,233.328125 L460,4 Z M68,4 L248.652344,4 C303.880819,4 348.652344,48.771525 348.652344,104 L348.652344,233.328125 L68,233.328125
 * @see https://svg-path-visualizer.netlify.app/#M73.2226562%2C282.36788%20C517.988281%2C268.985067%20740.371094%2C312.330119%20740.371094%2C412.403036%20C740.371094%2C562.512411%20706.574547%2C689.414193%20665.761719%2C731.926473%20C585.929687%2C815.082723%20381.128906%2C824.973348%20240.128906%2C815.082723%20C193.160156%2C721.491578%20114.450521%2C640.427775%204%2C571.891317%20L73.2226562%2C282.36788%20Z%20M288.371094%2C399.757812%20L569.023438%2C399.757812%20L569.023438%2C629.085937%20L288.371094%2C629.085937%20L288.371094%2C399.757812%20Z%20M460%2C4%20L640.652344%2C4%20C695.880819%2C4%20740.652344%2C48.771525%20740.652344%2C104%20L740.652344%2C233.328125%20L460%2C233.328125%20L460%2C4%20Z%20M68%2C4%20L248.652344%2C4%20C303.880819%2C4%20348.652344%2C48.771525%20348.652344%2C104%20L348.652344%2C233.328125%20L68%2C233.328125
 */
export const svgPath: TestSvgData = {
  svgString:
    '<svg viewBox="64 64 736.652344 814.2161138351329" focusable="false" class="" data-icon="up-circle" width="300px" height="300px" fill="#aaa" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z M288.371094,399.757812 L569.023438,399.757812 L569.023438,629.085937 L288.371094,629.085937 L288.371094,399.757812 Z M460,4 L640.652344,4 C695.880819,4 740.652344,48.771525 740.652344,104 L740.652344,233.328125 L460,233.328125 L460,4 Z M68,4 L248.652344,4 C303.880819,4 348.652344,48.771525 348.652344,104 L348.652344,233.328125 L68,233.328125"></path></svg>',
  shapes: [
    {
      path:
        'M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z M288.371094,399.757812 L569.023438,399.757812 L569.023438,629.085937 L288.371094,629.085937 L288.371094,399.757812 Z M460,4 L640.652344,4 C695.880819,4 740.652344,48.771525 740.652344,104 L740.652344,233.328125 L460,233.328125 L460,4 Z M68,4 L248.652344,4 C303.880819,4 348.652344,48.771525 348.652344,104 L348.652344,233.328125 L68,233.328125',
    },
  ],
  sketchJSON: svgPathJSON,
};

/**
 * Dropbox Svg 路径
 */
export const dropboxSvgPath: TestSvgData = {
  svgString:
    '<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="dropbox" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M64 556.9L328.2 730.4L512.5 577L246.8 412.7zM960 266.59999999999997zM960 266.59999999999997L696.8 95L512.5 248.5L777.7 412.7L512.5 577L696.8 730.4L960 558.8L777.7 412.7zM513 609.8L328.2 763.3L248.79999999999998 711.8V769.5999999999999L513 928L776.7 769.6V711.8000000000001L697.8000000000001 763.3000000000001zM328.2 95L64 265.1L246.8 412.70000000000005L512.5 248.50000000000006zM64 556.9z" style="fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.65); text-rendering: optimizelegibility;"></path></svg>',
  shapes: [
    {
      path:
        'M64 556.9L328.2 730.4L512.5 577L246.8 412.7zM960 266.59999999999997zM960 266.59999999999997L696.8 95L512.5 248.5L777.7 412.7L512.5 577L696.8 730.4L960 558.8L777.7 412.7zM513 609.8L328.2 763.3L248.79999999999998 711.8V769.5999999999999L513 928L776.7 769.6V711.8000000000001L697.8000000000001 763.3000000000001zM328.2 95L64 265.1L246.8 412.70000000000005L512.5 248.50000000000006zM64 556.9z',
    },
  ],
  sketchJSON: dropboxJSON,
};

/**
 * Behance Svg 路径
 */
export const behanceSvg: TestSvgData = {
  svgString:
    '<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="behance" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M634 294.3H833.5V342.7H634zM434.1 485.8C478.20000000000005 464.7 501.3 432.6 501.3 383C501.3 284.9 428.3 261.1 344 261.1H112V753.5H350.5C439.9 753.5 523.8 710.5 523.8 610.5C523.8 548.7 494.59999999999997 503 434.09999999999997 485.8zM220.2 345.1H321.7C360.8 345.1 395.9 356 395.9 401.40000000000003C395.9 443.20000000000005 368.59999999999997 460.00000000000006 329.9 460.00000000000006H220.2V345.1zM335.7 669.9000000000001H220.1V534.3H338C385.6 534.3 415.7 554.1999999999999 415.7 604.5999999999999C415.7 654.1999999999999 379.8 669.8999999999999 335.7 669.8999999999999zM911.5 580.4000000000001C911.5 474.9000000000001 849.8 387.0000000000001 738.2 387.0000000000001C629.7 387.0000000000001 555.9000000000001 468.7000000000001 555.9000000000001 575.8000000000002C555.9000000000001 686.8000000000002 625.8000000000001 763.0000000000002 738.2 763.0000000000002C823.3000000000001 763.0000000000002 878.4000000000001 724.7000000000003 904.9000000000001 643.0000000000002H818.6000000000001C809.2000000000002 673.5000000000002 771.0000000000001 689.5000000000002 741.3000000000002 689.5000000000002C683.9000000000002 689.5000000000002 653.9000000000002 655.9000000000002 653.9000000000002 598.8000000000002H910.8000000000002C911.1000000000001 592.9000000000002 911.5000000000002 586.7000000000002 911.5000000000002 580.4000000000002zM653.9 537C657 490.1 688.3 460.8 735.1 460.8C784.3000000000001 460.8 808.9 489.7 813.2 537H653.9z" style="fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.65); text-rendering: optimizelegibility;"></path></svg>',
  shapes: [
    {
      path:
        'M634 294.3H833.5V342.7H634zM434.1 485.8C478.20000000000005 464.7 501.3 432.6 501.3 383C501.3 284.9 428.3 261.1 344 261.1H112V753.5H350.5C439.9 753.5 523.8 710.5 523.8 610.5C523.8 548.7 494.59999999999997 503 434.09999999999997 485.8zM220.2 345.1H321.7C360.8 345.1 395.9 356 395.9 401.40000000000003C395.9 443.20000000000005 368.59999999999997 460.00000000000006 329.9 460.00000000000006H220.2V345.1zM335.7 669.9000000000001H220.1V534.3H338C385.6 534.3 415.7 554.1999999999999 415.7 604.5999999999999C415.7 654.1999999999999 379.8 669.8999999999999 335.7 669.8999999999999zM911.5 580.4000000000001C911.5 474.9000000000001 849.8 387.0000000000001 738.2 387.0000000000001C629.7 387.0000000000001 555.9000000000001 468.7000000000001 555.9000000000001 575.8000000000002C555.9000000000001 686.8000000000002 625.8000000000001 763.0000000000002 738.2 763.0000000000002C823.3000000000001 763.0000000000002 878.4000000000001 724.7000000000003 904.9000000000001 643.0000000000002H818.6000000000001C809.2000000000002 673.5000000000002 771.0000000000001 689.5000000000002 741.3000000000002 689.5000000000002C683.9000000000002 689.5000000000002 653.9000000000002 655.9000000000002 653.9000000000002 598.8000000000002H910.8000000000002C911.1000000000001 592.9000000000002 911.5000000000002 586.7000000000002 911.5000000000002 580.4000000000002zM653.9 537C657 490.1 688.3 460.8 735.1 460.8C784.3000000000001 460.8 808.9 489.7 813.2 537H653.9z',
    },
  ],
  sketchJSON: behanceJSON,
};

/**
 * plus Svg 路径
 * path
 */
export const plusSvg: TestSvgData = {
  svgString:
    '<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="plus" width="30px" height="30px" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg>',
  shapes: [
    {
      path:
        'M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z',
    },
    {
      path:
        'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z',
    },
  ],
  sketchJSON: plusJSON,
};

/**
 * 多条 Svg 路径
 */
export const upCircleSvg: TestSvgData = {
  svgString:
    '<svg viewBox="64 64 896 896" focusable="false" class="" data-icon="up-circle" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M518.5 360.3A7.95 7.95 0 0 0 505.6 360.3L327.6 606.3C323.8 611.5999999999999 327.6 619 334.1 619H381C391.2 619 400.9 614.1 406.9 605.8L512 460.4L617.2 605.8C623.2 614.0999999999999 632.8000000000001 619 643.1 619H690C696.5 619 700.3 611.6 696.5 606.3L518.5 360.29999999999995z" style="fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.65); text-rendering: optimizelegibility;"></path><path d="M512 64C264.6 64 64 264.6 64 512S264.6 960 512 960S960 759.4 960 512S759.4 64 512 64zM512 884C306.6 884 140 717.4 140 512S306.6 140 512 140S884 306.6 884 512S717.4 884 512 884z" style="fill: rgba(0, 0, 0, 0.65); color: rgba(0, 0, 0, 0.65); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.65); text-rendering: optimizelegibility;"></path></svg>',
  shapes: [
    {
      path:
        'M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z',
    },
    {
      path:
        'M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z',
    },
  ],
  sketchJSON: upCircleJSON,
};
