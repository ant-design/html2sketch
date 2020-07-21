import Bitmap from '../../src/model/Bitmap';

jest.mock('../../src/helpers/uuid', () => 'ds');
describe('image', () => {
  it('123', () => {
    const bitmap = new Bitmap({
      url: 'foo.png',
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    //@ts-ignore
    expect(bitmap.toSketchJSON().image.url).toEqual('foo.png');

    expect(bitmap.toSketchJSON()).toStrictEqual({
      _class: 'bitmap',
      booleanOperation: -1,
      clippingMaskMode: 0,
      do_objectID: 'uuid',
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
        width: 100,
        x: 0,
        y: 0,
      },
      hasClickThrough: false,
      hasClippingMask: false,
      hasConvertedToNewRoundCorners: false,
      image: {
        _class: 'MSJSONOriginalDataReference',
        _ref: 'images/image',
        _ref_class: 'MSImageData',
        url: 'foo.png',
      },
      isClosed: false,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      layers: [],
      name: 'bitmap',
      nameIsFixed: false,
      needsConvertionToNewRoundCorners: false,
      numberOfPoints: 0,
      points: [],
      resizingConstraint: 63,
      resizingType: 0,
      rotation: 0,
      sharedStyleID: '',
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
        do_ID: '',
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
});
