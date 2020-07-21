import Bitmap from '../Bitmap';

describe('Bitmap 类', () => {
  it('Bitmap 可正常生成 Sketch JSON', () => {
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
      clippingMask: '',
      exportOptions: {
        _class: 'exportOptions',
        exportFormats: [],
        includedLayerIds: [],
        layerOptions: 0,
        shouldTrim: false,
      },
      fillReplacesImage: false,
      frame: {
        _class: 'rect',
        constrainProportions: false,
        height: 100,
        width: 100,
        x: 0,
        y: 0,
      },
      hasClippingMask: false,
      image: {
        _class: 'MSJSONOriginalDataReference',
        _ref: 'images/uuid',
        _ref_class: 'MSImageData',
        url: 'foo.png',
      },
      intendedDPI: 32,
      isFixedToViewport: false,
      isFlippedHorizontal: false,
      isFlippedVertical: false,
      isLocked: false,
      isVisible: true,
      layerListExpandedType: 0,
      name: 'bitmap',
      nameIsFixed: false,
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
        do_objectID: 'uuid',
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
