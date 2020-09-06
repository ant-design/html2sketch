import Rectangle from '../Rectangle';

describe('Rectangle 类', () => {
  describe('toKonvaJSON 转换正常', () => {
    it('普通 Rectangle 转换正常', () => {
      const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          cornerRadius: [0, 0, 0, 0],
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
        },
        className: 'Rect',
      });
    });
    it('等圆角 Rectangle 转换正常', () => {
      const rect = new Rectangle({
        height: 100,
        width: 50,
        x: 280,
        y: 100,
        cornerRadius: 10,
      });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
          cornerRadius: 10,
        },
        className: 'Rect',
      });
    });
    it('不等圆角 Rectangle 转换正常', () => {
      const rect = new Rectangle({
        height: 100,
        width: 50,
        x: 280,
        y: 100,
        cornerRadius: {
          bottomLeft: 10,
          bottomRight: 2,
          topLeft: 3,
          topRight: 2,
        },
      });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
          cornerRadius: [3, 2, 2, 10],
        },
        className: 'Rect',
      });
    });
    it('不等圆角 Rectangle2 转换正常', () => {
      const rect = new Rectangle({
        height: 100,
        width: 50,
        x: 280,
        y: 100,
        cornerRadius: [10, 10, 2, 4],
      });
      rect.name = 'Rect';
      expect(rect.toKonvaJSON()).toStrictEqual({
        attrs: {
          x: 280,
          y: 100,
          width: 50,
          id: 'UUID',
          height: 100,
          cornerRadius: [10, 10, 2, 4],
        },
        className: 'Rect',
      });
    });
  });
  describe('toSketchJSON 转换正常', () => {
    it('正常转换', () => {
      const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
      rect.name = 'Rect';
      expect(rect.toSketchJSON()).toMatchSnapshot();
      expect(rect.toSketchJSON()).toStrictEqual({
        _class: 'rectangle',
        booleanOperation: -1,
        clippingMaskMode: 0,
        do_objectID: 'UUID',
        edited: false,
        exportOptions: {
          _class: 'exportOptions',
          exportFormats: [],
          includedLayerIds: [],
          layerOptions: 0,
          shouldTrim: false,
        },
        fixedRadius: 0,
        frame: {
          _class: 'rect',
          constrainProportions: false,
          height: 100,
          width: 50,
          x: 280,
          y: 100,
        },
        hasConvertedToNewRoundCorners: true,
        isClosed: true,
        isFixedToViewport: false,
        isFlippedHorizontal: false,
        isFlippedVertical: false,
        hasClippingMask: false,
        isLocked: false,
        isVisible: true,
        layerListExpandedType: 0,
        name: 'Rect',
        nameIsFixed: false,
        needsConvertionToNewRoundCorners: false,
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
        resizingConstraint: 63,
        resizingType: 0,
        rotation: 0,
        shouldBreakMaskChain: false,
        style: {
          _class: 'style',
          borderOptions: {
            _class: 'borderOptions',
            dashPattern: [],
            isEnabled: true,
            lineCapStyle: 0,
            lineJoinStyle: 0,
          },
          borders: [],
          colorControls: {
            _class: 'colorControls',
            brightness: 0,
            contrast: 1,
            hue: 0,
            isEnabled: false,
            saturation: 1,
          },
          contextSettings: {
            _class: 'graphicsContextSettings',
            blendMode: 0,
            opacity: 1,
          },
          do_objectID: 'UUID',
          endMarkerType: 0,
          fills: [],
          innerShadows: [],
          miterLimit: 10,
          shadows: [],
          startMarkerType: 0,
          windingRule: 1,
        },
      });
    });
    it('蒙版正常', () => {
      const rect = new Rectangle({ height: 100, width: 50, x: 280, y: 100 });
      rect.hasClippingMask = true;

      const json = rect.toSketchJSON();
      expect(json.hasClippingMask).toBeTruthy();
    });
  });
});
