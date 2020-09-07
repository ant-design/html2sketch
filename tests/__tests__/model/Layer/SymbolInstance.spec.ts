import { SymbolInstance } from 'html2sketch';

describe('SymbolInstance 类', () => {
  it('初始化设置 symbolID', () => {
    const symbolID = 'pizza';
    const symbolInstance = new SymbolInstance({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      symbolID,
    });

    expect(symbolInstance.toSketchJSON().symbolID).toEqual(symbolID);
  });

  it('sets symbolID', () => {
    const symbolID = 'pizza';
    const symbolInstance = new SymbolInstance({
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      symbolID: 'initial-id',
    });

    symbolInstance.symbolID = symbolID;

    expect(symbolInstance.toSketchJSON().symbolID).toEqual(symbolID);
  });

  it('sets frame dimensions', () => {
    const symbolInstance = new SymbolInstance({
      x: 0,
      y: 50,
      width: 100,
      height: 150,
      symbolID: 'pizza',
    });

    const { frame } = symbolInstance.toSketchJSON();

    expect(frame.x).toBe(0);
    expect(frame.y).toBe(50);
    expect(frame.width).toBe(100);
    expect(frame.height).toBe(150);
  });
});
