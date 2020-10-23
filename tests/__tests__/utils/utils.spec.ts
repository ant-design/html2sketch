import { uuid, checkNoNull } from 'html2sketch/utils/utils';

describe('uuid', () => {
  beforeAll(() => {
    window.IS_TEST_ENV = true;
  });
  afterAll(() => {
    window.IS_TEST_ENV = false;
  });
  it('uuid', () => {
    expect(uuid()).toBe('UUID');
  });
});

describe('checkNoNull', () => {
  it('work well', () => {
    expect(checkNoNull({ a: 1 })).toBeUndefined();
  });
  it('有 null 会报错', () => {
    expect(() => checkNoNull({ a: null })).toThrowError();
  });
  it('嵌套 object 有 null 会报错', () => {
    expect(() => checkNoNull({ a: { b: null } })).toThrowError();
  });

  it('嵌套数组 object 有 null 会报错', () => {
    expect(() => checkNoNull({ a: [{ b: null }] })).toThrowError();
  });

  it('真实数据结构 有 null 会报错', () => {
    const json = {
      _class: 'rectangle',
      name: '',
      resizingConstraint: 63,
      frame: {
        _class: 'rect',
        constrainProportions: false,
        height: 40,
        width: 48,
        x: null,
        y: NaN,
      },
      do_objectID: '80C206E5-710D-4669-AD0A-4D6E00F13DC8',
      hasConvertedToNewRoundCorners: true,
      needsConvertionToNewRoundCorners: false,
      fixedRadius: 0,
      style: {
        _class: 'style',
        do_objectID: '680D42F2-D6AC-4347-855B-94B940B34732',
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
      edited: false,
      pointRadiusBehaviour: 1,
      points: [
        {
          _class: 'curvePoint',
          cornerRadius: 4,
          curveFrom: '{0, 0}',
          curveMode: 1,
          curveTo: '{0, 0}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{0, 0}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: 4,
          curveFrom: '{1, 0}',
          curveMode: 1,
          curveTo: '{1, 0}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{1, 0}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: 4,
          curveFrom: '{1, 1}',
          curveMode: 1,
          curveTo: '{1, 1}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{1, 1}',
        },
        {
          _class: 'curvePoint',
          cornerRadius: 4,
          curveFrom: '{0, 1}',
          curveMode: 1,
          curveTo: '{0, 1}',
          hasCurveFrom: false,
          hasCurveTo: false,
          point: '{0, 1}',
        },
      ],
      isClosed: true,
      booleanOperation: -1,
      exportOptions: {
        _class: 'exportOptions',
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
        exportFormats: [],
      },
      isVisible: true,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      layerListExpandedType: 0,
      nameIsFixed: false,
      resizingType: 0,
      rotation: 0,
      shouldBreakMaskChain: false,
      clippingMaskMode: 0,
      isLocked: false,
      hasClippingMask: false,
    };
    expect(() => checkNoNull(json)).toThrowError();
  });
});
