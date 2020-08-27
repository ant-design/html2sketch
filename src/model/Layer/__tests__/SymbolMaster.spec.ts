import SymbolMaster from '../SymbolMaster';

describe('SymbolMaster 类', () => {
  describe('Symbol 创建', () => {
    it('symbolID 可以被设置', () => {
      const symbolMaster = new SymbolMaster({ x: 200, y: 300 });
      const id = 'test-id';

      symbolMaster.symbolID = id;

      expect(symbolMaster.toSketchJSON().symbolID).toEqual(id);
    });
  });

  describe('toSketchJSON', () => {
    it('generates deterministic symbolIDs', () => {
      const symbolMaster = new SymbolMaster({ x: 200, y: 300 });
      const { symbolID } = symbolMaster.toSketchJSON();

      expect(symbolMaster.toSketchJSON().symbolID).toEqual(symbolID);
    });
  });
  describe('GroupLayout 布局', () => {
    it('symbol has a default groupLayout', () => {
      const symbolMaster = new SymbolMaster({ x: 200, y: 300 });

      expect(symbolMaster.toSketchJSON().groupLayout).not.toBeNull();
    });

    it('symbol groupLayout can be changed', () => {
      const symbolMaster = new SymbolMaster({ x: 200, y: 300 });

      const groupLayoutBefore = symbolMaster.toSketchJSON().groupLayout;

      symbolMaster.setGroupLayout('LEFT_TO_RIGHT');

      const groupLayoutAfter = symbolMaster.toSketchJSON().groupLayout;

      expect(groupLayoutBefore).not.toEqual(groupLayoutAfter);
    });
  });

  describe('Symbol Instances 实例', () => {
    it('symbol instances have the same symbolID', () => {
      const symbolMaster = new SymbolMaster({ x: 200, y: 300 });
      const symbolInstance = symbolMaster.getSymbolInstance({ x: 0, y: 0 });

      expect(symbolMaster.toSketchJSON().symbolID).toEqual(
        symbolInstance.toSketchJSON().symbolID,
      );
    });

    it('symbol instances inherit size from master symbol by default', () => {
      const symbolMaster = new SymbolMaster({
        x: 200,
        y: 300,
        width: 150,
        height: 75,
      });
      const symbolInstance = symbolMaster.getSymbolInstance({ x: 12, y: 34 });

      const masterObject = symbolMaster.toSketchJSON();
      const instanceObject = symbolInstance.toSketchJSON();

      expect(instanceObject.frame.width).toEqual(masterObject.frame.width);
      expect(instanceObject.frame.height).toEqual(masterObject.frame.height);
      expect(instanceObject.frame.x).toEqual(12);
      expect(instanceObject.frame.y).toEqual(34);
    });

    it('symbol instances inherit size from master symbol by default', () => {
      const symbolMaster = new SymbolMaster({
        x: 200,
        y: 300,
        width: 150,
        height: 75,
      });
      const symbolInstance = symbolMaster.getSymbolInstance({
        x: 1,
        y: 2,
        width: 15,
        height: 7.5,
      });

      const instanceObject = symbolInstance.toSketchJSON();

      expect(instanceObject.frame.width).toEqual(15);
      expect(instanceObject.frame.height).toEqual(7.5);
      expect(instanceObject.frame.x).toEqual(1);
      expect(instanceObject.frame.y).toEqual(2);
    });
  });
});
