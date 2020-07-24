import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import Svg from '../../Layer/Svg';
import Style from '../../Style/Style';
import { defaultExportOptions } from '../../utils';
import {
  svgPath,
  roundRect,
  rect,
  compPath,
  singleRoundRect,
  unclosedRect,
} from './commonSvgData';

// 可复用的 shapeGroup 信息
const shapeGroupData: Partial<SketchFormat.ShapeGroup> = {
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
  _class: 'shapePath',
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
  exportOptions: {
    _class: 'exportOptions',
    includedLayerIds: [],
    layerOptions: 0,
    shouldTrim: false,
    exportFormats: [],
  },
  clippingMaskMode: 0,
  style: new Style().toSketchJSON(),
  edited: true,
  pointRadiusBehaviour: 1,
};

describe('Svg 类', () => {
  describe('toSketchJSON', function () {
    it('StepBackwardOutlined 正常渲染', () => {
      const svg = new Svg({
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        path:
          'm347.6 528.95l383.2 301.02c14.25 11.2 35.2 1.1 35.2 -16.95v-602.05c0 -18.05 -20.95 -28.14 -35.2 -16.94l-383.19999999999993 301.02a21.53 21.53 0 0 0 0 33.9m-17.600000000000023 335.04999999999995h-64a8 8 0 0 1 -8 -8v-688a8 8 0 0 1 8 -8h64a8 8 0 0 1 8 8v688a8 8 0 0 1 -8 8',
      });

      expect(svg.toSketchJSON()).toStrictEqual({
        _class: 'shapeGroup',
        do_objectID: 'uuid',
        booleanOperation: -1,
        isFixedToViewport: false,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 2,
        name: '形状',
        nameIsFixed: false,
        resizingConstraint: 63,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        exportOptions: {
          _class: 'exportOptions',
          includedLayerIds: [],
          layerOptions: 0,
          shouldTrim: false,
          exportFormats: [],
        },
        frame: {
          _class: 'rect',
          constrainProportions: false,
          height: 100,
          width: 100,
          x: 0,
          y: 0,
        },
        clippingMaskMode: 0,
        hasClippingMask: false,
        style: new Style().toSketchJSON(),
        hasClickThrough: false,
        groupLayout: { _class: 'MSImmutableFreeformGroupLayout' },
        layers: [
          {
            _class: 'shapePath',
            do_objectID: '04718C91-1545-4792-AC34-900884E9690D',
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
            exportOptions: {
              _class: 'exportOptions',
              includedLayerIds: [],
              layerOptions: 0,
              shouldTrim: false,
              exportFormats: [],
            },
            frame: {
              _class: 'rect',
              constrainProportions: false,
              height: 16,
              width: 16,
              x: -3.395738428446185,
              y: -2.500015819373429,
            },
            clippingMaskMode: 0,
            hasClippingMask: false,
            style: {
              _class: 'style',
              do_objectID: 'C440646F-18AD-4A75-8323-05855D2D8FB6',
              endMarkerType: 0,
              miterLimit: 10,
              startMarkerType: 0,
              windingRule: 1,
              blur: {
                _class: 'blur',
                isEnabled: false,
                center: '{0.5, 0.5}',
                motionAngle: 0,
                radius: 0.15625,
                saturation: 1,
                type: 0,
              },
              borderOptions: {
                _class: 'borderOptions',
                isEnabled: true,
                dashPattern: [],
                lineCapStyle: 0,
                lineJoinStyle: 0,
              },
              borders: [],
              colorControls: {
                _class: 'colorControls',
                isEnabled: false,
                brightness: 0,
                contrast: 1,
                hue: 0,
                saturation: 1,
              },
              contextSettings: {
                _class: 'graphicsContextSettings',
                blendMode: 0,
                opacity: 1,
              },
              fills: [],
              innerShadows: [],
              shadows: [],
            },
            edited: true,
            isClosed: true,
            pointRadiusBehaviour: 1,
            points: [
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.68786841740288662, 0.82145606683583949}',
                curveMode: 4,
                curveTo: '{0.67395240177788662, 0.81051856683583945}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.67395240177788662, 0.81051856683583945}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.70832740177788667, 0.7939658324608394}',
                curveMode: 4,
                curveTo: '{0.70832740177788667, 0.81159278558583947}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.70832740177788667, 0.7939658324608394}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.70832740177788667, 0.18839942621083924}',
                curveMode: 4,
                curveTo: '{0.70832740177788667, 0.20602637933583925}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.70832740177788667, 0.20602637933583925}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.67395240177788662, 0.18948341058583926}',
                curveMode: 4,
                curveTo: '{0.68786841740288662, 0.17854591058583927}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.67395240177788662, 0.18948341058583926}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.29464527163362453, 0.48743354606058331}',
                curveMode: 4,
                curveTo: '{0.29973365177788658, 0.48344825433583927}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.29973365177788658, 0.48344825433583927}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.29167259822211344, 0.506464282192017}',
                curveMode: 2,
                curveTo: '{0.29167259822211344, 0.49353769522966173}',
                hasCurveFrom: true,
                hasCurveTo: true,
                point: '{0.29167259822211344, 0.5000009887108392}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.29973365177788658, 0.51655372308583947}',
                curveMode: 4,
                curveTo: '{0.29464527163362453, 0.51256843136109542}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.29973365177788658, 0.51655372308583947}',
              },
            ],
          },
          {
            _class: 'shapePath',
            do_objectID: '806AC6DA-FE9E-45AD-AD09-50E4E32583CB',
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
            exportOptions: {
              _class: 'exportOptions',
              includedLayerIds: [],
              layerOptions: 0,
              shouldTrim: false,
              exportFormats: [],
            },
            frame: {
              _class: 'rect',
              constrainProportions: false,
              height: 16,
              width: 16,
              x: -7.2,
              y: -2.5,
            },
            clippingMaskMode: 0,
            hasClippingMask: false,
            style: {
              _class: 'style',
              do_objectID: '567FFCDF-D005-4F8C-B925-B0E0CA149CD3',
              endMarkerType: 0,
              miterLimit: 10,
              startMarkerType: 0,
              windingRule: 1,
              blur: {
                _class: 'blur',
                isEnabled: false,
                center: '{0.5, 0.5}',
                motionAngle: 0,
                radius: 0.15625,
                saturation: 1,
                type: 0,
              },
              borderOptions: {
                _class: 'borderOptions',
                isEnabled: true,
                dashPattern: [],
                lineCapStyle: 0,
                lineJoinStyle: 0,
              },
              borders: [],
              colorControls: {
                _class: 'colorControls',
                isEnabled: false,
                brightness: 0,
                contrast: 1,
                hue: 0,
                saturation: 1,
              },
              contextSettings: {
                _class: 'graphicsContextSettings',
                blendMode: 0,
                opacity: 1,
              },
              fills: [],
              innerShadows: [],
              shadows: [],
            },
            edited: true,
            isClosed: true,
            pointRadiusBehaviour: 1,
            points: [
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.45447715250169196, 0.84374999999999989}',
                curveMode: 4,
                curveTo: '{0.45999999999999996, 0.84374999999999989}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.45999999999999996, 0.84374999999999989}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.44999999999999996, 0.83593749999999989}',
                curveMode: 4,
                curveTo: '{0.44999999999999996, 0.84025222460805293}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.44999999999999996, 0.83593749999999989}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.44999999999999996, 0.15974777539194693}',
                curveMode: 4,
                curveTo: '{0.44999999999999996, 0.1640625}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.44999999999999996, 0.1640625}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.45999999999999996, 0.15625}',
                curveMode: 4,
                curveTo: '{0.45447715250169196, 0.15625}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.45999999999999996, 0.15625}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.54552284749830793, 0.15625}',
                curveMode: 4,
                curveTo: '{0.53999999999999992, 0.15625}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.53999999999999992, 0.15625}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.54999999999999993, 0.1640625}',
                curveMode: 4,
                curveTo: '{0.54999999999999993, 0.15974777539194693}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.54999999999999993, 0.1640625}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.54999999999999993, 0.84025222460805293}',
                curveMode: 4,
                curveTo: '{0.54999999999999993, 0.83593749999999989}',
                hasCurveFrom: true,
                hasCurveTo: false,
                point: '{0.54999999999999993, 0.83593749999999989}',
              },
              {
                _class: 'curvePoint',
                cornerRadius: 0,
                curveFrom: '{0.53999999999999992, 0.84374999999999989}',
                curveMode: 4,
                curveTo: '{0.54552284749830793, 0.84374999999999989}',
                hasCurveFrom: false,
                hasCurveTo: true,
                point: '{0.53999999999999992, 0.84374999999999989}',
              },
            ],
          },
        ],
        windingRule: 0,
      });
    });
    it('svgPath 复合对象转换正常', function () {
      const svg = new Svg({
        path: svgPath.path,
        height: 814.2161138351329,
        width: 736.652344,
        x: -90,
        y: 4,
      });

      expect(svg.toSketchJSON()).toStrictEqual({
        ...shapeGroupData,
        layers: [
          // 不规则
          compPath.sketchJSON,
          // 正方形
          rect.sketchJSON,
          // 圆角矩形
          singleRoundRect.sketchJSON,
          // 开放矩形
          unclosedRect.sketchJSON,
        ].map((layer) => {
          const { frame } = layer;
          return {
            ...layer,
            frame: {
              ...frame,
              // 4 是 x 和 y 的相对偏移值
              x: frame.x - 4,
              y: frame.y - 4,
            },
          };
        }),
      });
    });
  });

  describe('convertToCubicBezier', function () {
    it('svgPath转换正常', function () {
      const points = Svg.svgPathToShapeGroup(svgPath.path);

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

    it('path不正确时报错', function () {
      const path = 'Z';
      const t = () => {
        try {
          Svg.svgPathToShapeGroup(path);
        } catch (e) {
          throw e;
        }
      };
      expect(t).toThrow(
        'Error Path!\nData:Z\nPlease check whether the path is correct.'
      );
    });
  });
});
