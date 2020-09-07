import ColorAsset from 'html2sketch/model/Style/ColorAsset';

describe('ColorAsset 类', () => {
  it('默认创建', () => {
    const colorAsset = new ColorAsset('#123a12');
    expect(colorAsset.name).toBe('#123A12');
  });
  it('创建带名字', () => {
    const colorAsset = new ColorAsset('#123a12', 'test');
    expect(colorAsset.name).toBe('test');
  });
  it('toSketchJSON', () => {
    const colorAsset = new ColorAsset('#123a12');
    expect(colorAsset.toSketchJSON()).toStrictEqual({
      _class: 'MSImmutableColorAsset',
      color: {
        _class: 'color',
        alpha: 1,
        blue: 0.07058823529411765,
        green: 0.22745098039215686,
        red: 0.07058823529411765,
      },
      do_objectID: 'UUID',
      name: '#123A12',
    });
  });
});
