import ShapeGroup from '../ShapeGroup';

describe('ShapeGroup', function () {
  describe('toSketchJSON', function () {
    it('生成正常', function () {
      const shapeGroup = new ShapeGroup();
      expect(shapeGroup.toSketchJSON()).toMatchSnapshot();
    });
  });
  it('生成正常', function () {
    const shapeGroup = new ShapeGroup();
    expect(shapeGroup).toMatchSnapshot();
  });

  it('设置剪贴蒙版', () => {
    const shapeGroup = new ShapeGroup();

    expect(shapeGroup.toSketchJSON().hasClippingMask).toBe(false);

    shapeGroup.hasClippingMask = true;
    expect(shapeGroup.toSketchJSON().hasClippingMask).toBe(true);
  });
});
