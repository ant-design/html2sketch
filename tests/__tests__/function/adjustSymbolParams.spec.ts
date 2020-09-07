import { Group, SymbolMaster } from 'html2sketch';
import adjustSymbolParams from 'html2sketch/function/adjustSymbolParams';

describe('adjustSymbolParams', function () {
  it('不传参时不变', function () {
    const symbol1 = new SymbolMaster();
    const symbol2 = new SymbolMaster();
    adjustSymbolParams(symbol1);
    expect(symbol1.toSketchJSON()).toStrictEqual(symbol2.toSketchJSON());
  });
  it('传入的不是 Symbol 时报错', function () {
    const group = new Group();

    // @ts-ignore
    expect(() => adjustSymbolParams(group)).toThrow(
      Error('传入对象不是 Symbol 对象,请检查!'),
    );
  });
});
