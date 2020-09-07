import { ShapeGroup } from 'html2sketch';

describe('ShapeGroup', () => {
  describe('toSketchJSON', () => {
    it('生成正常', () => {
      const shapeGroup = new ShapeGroup();
      expect(shapeGroup.toSketchJSON()).toMatchSnapshot();
    });
  });
  it('生成正常', () => {
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
