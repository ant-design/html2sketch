import Bitmap from '../Bitmap';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';

describe('Bitmap 类', () => {
  it('传入 base64 URL 后 可正常生成 Sketch JSON', () => {
    const base64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';
    const bitmap = new Bitmap({
      url: `data:image/png;base64,${base64}`,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    expect(
      (bitmap.toSketchJSON().image as SketchFormat.DataRef).data._data,
    ).toEqual(base64);

    expect(bitmap.toSketchJSON()).toMatchSnapshot();
    expect(bitmap.toSketchJSON()).toStrictEqual({
      _class: 'bitmap',
      booleanOperation: -1,
      clippingMaskMode: 0,
      do_objectID: 'UUID',
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
        _ref: 'images/UUID',
        _ref_class: 'MSImageData',
        data: {
          _data:
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==',
        },
        sha1: {
          _data: '',
        },
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
  it('传入 错误 URL 后 无法生成 Sketch JSON', () => {
    const bitmap = new Bitmap({
      url: `sjo.png`,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
    });

    expect(() => bitmap.toSketchJSON()).toThrow(`不正确的图像网址:`);
  });

  describe('ensureBase64DataURL', () => {
    it('base64 则不变', () => {
      const img =
        'data:image/png;base64,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';
      const x = Bitmap.ensureBase64DataURL(img);
      expect(x).toBe(img);
    });
    it('不是 base64编译成 base64', () => {
      const sha1Str =
        'data:image/png;sha1,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';
      const x = Bitmap.ensureBase64DataURL(sha1Str);

      const base64Str =
        'data:image/png;base64,aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVVJQUFBQThDQU1BQUFBa0xFT3JBQUFBcmxCTVZFVUFBQUJHVG1aR1RtVk1WbXRJVUdoUlZXMUxVR3hTZUhWRlRXUkdUbVZHVG1WR1RtVllXSHRGVFdSRlRXVkhVR2RKVUdkR1QyWkdUMlpHVG1WRlRXUkZUV1JGVG1WNGVJaEZUV1JIVFdWRlRXVkZUbVJKVUdkR1RtUkZUV1ZGVFdSSFRtVkdUV1ZGVG1WQ3ZHdEdUbVEzdEdCRlRXUkZUV1ZHVFdRM3MyQkdUbVUvdG1GR1RtVkdUbVZHVG1WR1RXVklUMlpHVG1WTFUyYzNzMkJHVG1ZNnQySTN0RjgzdEdCRlRXUTNzMS9CNGx1bUFBQUFPSFJTVGxNQVgvMFJRQXdXQ08xbmlvRUZ4L0k1SWt0RnJkYjU1Z0xoVjdMT0tLU1htay9Ta1JMYTBPaS91TmloR0gxeWRtMHhuaHU4V3libWo4bFhVRlFBQUFhelNVUkJWSGphN05yYnNwb3dGQWJndFVHUWd3WUJRYTBpNmpqZ2REeXdIUy8rOTMreWxrdzF4QVE4ZEhaNzBmNDM3WlMwaG0rdkxOSWd2WjdGYnJlZ0J3blc2NEQrUng5ell3REd4cVNPOUwxNmpOZW5meW1uQk0wNGMwOWZSSU9EQXg3bk1HZ3Z3VEY0eG0yRkNFM29wYUFqNzQ0aG52WVpXYk5zWGlUcC9ITmxrU1pES05HdDFuQ0xXN1poZXdrNkx1QTZ2QkMvaUREL2FFbU9KOGE4UVdoNm9zcVliK29JZDcxR1p2NGFZQ3VsQ1NySStoS01iUk13N2JpdEVGV3dMc0xaYVVYM3dRZTE1QU12allHK1c2M3ZDV2NPd0RJM0RFSTNab0FUYWdpL2s1VEpnU0hwS1Uxd2pXdU1OVytKdWhLY0VkV0VSRE5SaU84VDlobjhQMFVvQk1meUZSOG8zTUYxUnFjQ3hwNUVQaUdGNjJRQjBTaEZhb2ttZUhLQTdZcXFFanhsUmFzdDRKd0dhZ25TbFpBMGhjaCtCcmNrNFVQQ0VLaitGS0VRdEFGWk1MYWFJNzRCaHdlZDJkaE1LQUJ1MU9FWVlBZk9OWnR5Uy81c1ljQTRWRXBRRUdvS0VYS1MxU1BDSENuOVVVSnpqckV0WFprQkhzbFp3aEEzRG14NnZYR3pGMGFuT2RlTHNSV0RNTFN2VXNmanRmVHNFb0JTZ29KUVU0Z3dyRnNBbnh0MkVVNEtMUDhVb1JDVXJwZ09ZbVZhM3hwckZIQ1ZYamlKWVN4cS9MTWdSRHlpdTR4aUFGQktVQkJxQ2hHRzFBRjlHRFBOcmV5MzJ3M3hCRUJFdE5sdTkxOU9LQVRsS3g0S1M1VjI0SGNSa21sZ1R4VVEzQWFsUU9KSi81TGxKZnlQYjl1aTJHNDJzTHJPUlNFT1d3aTVvWElyUHZCdGNKMC82eE1OdmdIK2x4SUt3YlV0WDdFU3VLVG1CR2ZRUlVoajVCU0lSZzVFbHlsUXVKTmJvYm9GTUwxRWpmM1VkL1A2b1VzQVdGN0J6UXhBQ3lFMzVML1RDOUlXTVpFdy9FSkNJU2hmbVlFTlNLUWhHM1lSVGhnOCtnQXNRVWo5UFFQV1BlTHB6UUhtVzlRa1JCcFNuV2dLWkJrd2phaE9tS0tWRUR4RVFJdmdBcmlRTVB4S1FpRW9KME5HdXNSWWRoRWVnUjd0bW8rVG11T2M4WmI0cXdsbVo2SW1vVHZsaFdndHdTMVhLUzlFczdaMEh4UHFCZWtJd3lSaCtLV0Vla0dhYTlaeFdBWjBSRW1MZUtVbG5DdzJCakxxQVNlWmtDZ1lBb25uSmNBd0lKSUpSeHp2VUpjZ3YydU9kK0NRSTRWUVpDSUlWVUVhb2lScUdNbzh5L3lUWjA5VUxjczhhQ1YweTd3dUFXK1g5Ym9JMXhwQktoRFNmWlpndlprelg2U0k3d2duSlg1bGJpNEtwSDJaOExvdHJKc2drVUpZTDJHeG5Ja1hJdmh5N2lJa21YQXZDWjZCQTBtR0VzOXR0aFFrZktQZVJ1aGhUblIyQU9EU1RraTJUV29TQkhRZmV3MTJSSkdpV053UldnbDQwdVBnb3dDclNDV2t2Z2Q0RmoxREdMNUlxQmFoQzR3NkNQUDgwOEg0TTk5VGlkUWZKMjRuNFFiRnZrd09LbUYzVW9Ta00weGdjRUdKa05lQTF3dHNDdFlBQzZtNS83NnBqUnEzMWQvODlrS21yb1c4dzFvV1ZIaUd5T3RmcHZESnJxaVRjSWVjcklwZUloUzlVRFhrZ2dyaFlJeXB4YWVPM1ZtNlRhUWZFcUZZMWVKeHd2RTQ1RXA5bkR3bVZBMnRCTDRpcUNXY280aUl1Z2x6T0t1SFcydjF5aWRpMGhsT3dSYTZKM0lQOFBpSHlQU29NKy9KaE1FUWFCQnlPWFZUd3kyZklsUU5aMENsQ3FxRWZDU0d2VzdDeXVCalhpVmNnZlZKRTlNLzZ6YzEzNUhVdGlVY1d6MGNpSnFFQVNBVFppOXRyVlZDMVRCRHFnanFDY2xsQUE2ZGhCU2xBUGF2RWxvTUo5SkhUMmc3ZkJ1eFNKQ3BoS3NtWVFTZU4vK0RweEtxaGdNSFMwbFFSM2dkWW5zTXhxS1RrS3lEQTFRdkVwSVB4M3lGa0Z6QTVYOFAwV1BDOTQ4WlZFTDFtQ0c2L2lDVVl3YVYwT1EvOWxNbllaL0laamkrU21nNTJFMGVFTW9ILzFPK2h2dGJiUHZQRXZJRTI2N0Ryc2VFYWpaU0Yrb2lYSlJqbSt3RXJvWXdHSjRwUmt4bVBqMVR2M2lka0VJRCtlUXhvUlNmQ3pXV1RqaldFejU3NVBvZTRSUXhQVWNZQW16SWtHZ1dzdVdBallGRFhhUkpXUURCeTRSMEJIYW10QVZYQ2VXWG9BbDNpSkVzNUlOL0hKdUVCeng5OFA4ZVlRVmNuaVNrQ3dQQXRGdnJrQUVZOW9raUI0RHh3dU5FNUdEQU9kNGVqMGRXVGhSQ1hjNE01ZjNycDdLNkVsYmxHNitmOUlROHBNYUhZVDRrakdZVjFiRXVlL2VzMzlUWUg0ZHd3bWUzT3JvamVvZVF3Z0pJdmgwdjBlejRqUUhUa1R4MjA5UG5PM0M1ZndscUxPMmEwTTZOTjErQ3dwaklHYlFTcms3aTQvL1l3WC9iRld2UGNFM2hXL0xZcmt5SlIzb0x0UUUyREJpLzl5b2VtdFFsOHZkZnhjdFJjUWZSc3R3NjIrRm1OU0E1bndiYWs1R0lhSW04Q2I3NWhaQzJ5Zjc5TDRSMHpPci8xNUordEd2SE5nRENRQkFFbmJrUXl3RWlmQUg2L2h0RGRJQzF5Y3ZhTFdHU1M2NWNudVBNekt4dXB3Tk9CWS9RRUFwbVBzMlk0QnpORlB5Ymd1VlNVTUhGRkN5WGdtdU5yaUJyek9nS29pSXp1b0trNi80TUZlU0dDbkpEQmJtaGd0eFFRVzZvSURaVUVCc3FTQTBWNUlZS1lzT05CRi9CdVBRVVM5TkZOZ0FBQUFCSlJVNUVya0pnZ2c9PQ==';
      expect(x).toBe(base64Str);
    });
  });
});
