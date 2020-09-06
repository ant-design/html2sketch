import { nodeToGroup } from 'html2sketch';

describe('单个', async () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  beforeEach(() => {
    document.body.innerHTML = `<div id="group">123</div>`;
  });
  it('正常解析', async () => {
    const node = document.getElementById('group') as HTMLDivElement;
    const group = await nodeToGroup(node);

    expect(group.toSketchJSON()._class).toBe('text');
  });
});

describe('多个解析', async () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  beforeEach(() => {
    document.body.innerHTML = `<div id="group"><div>123</div><div>13333</div></div>`;
  });
  it('多个解析', async () => {
    const node = document.getElementById('group') as HTMLDivElement;
    const group = await nodeToGroup(node);

    expect(group.toSketchJSON()._class).toBe('group');
  });
});
