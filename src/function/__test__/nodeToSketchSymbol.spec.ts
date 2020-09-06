import nodeToSketchSymbol from '../nodeToSketchSymbol';

describe('nodeToSketchSymbol', async () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  beforeAll(() => {
    document.body.innerHTML = `<div id="group">123</div>`;
  });
  it('单个正常解析', async () => {
    const node = document.getElementById('group') as HTMLDivElement;

    const symbol = await nodeToSketchSymbol(node);
    expect(symbol.toSketchJSON()._class).toBe('symbolMaster');
  });
});
