import SketchBorderOptions from 'html2sketch/models/Style/SketchBorderOptions';

describe('ColorAsset 类', () => {
  it('默认创建', () => {
    const borderOptions = new SketchBorderOptions();
    expect(borderOptions.class).toBe('borderOptions');
  });
  it('创建阵列', () => {
    const borderOptions = new SketchBorderOptions([1, 1]);
    expect(borderOptions.dashPattern).toStrictEqual([1, 1]);
  });
  it('toSketchJSON', () => {
    const borderOptions = new SketchBorderOptions([1, 1]);
    expect(borderOptions.toSketchJSON()).toStrictEqual({
      _class: 'borderOptions',
      isEnabled: true,
      dashPattern: [1, 1],
      lineCapStyle: 0,
      lineJoinStyle: 0,
    });
  });
});
