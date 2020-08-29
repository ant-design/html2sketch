import nodeToGroup from '../nodeToGroup';

describe('单个', function () {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  beforeEach(() => {
    document.body.innerHTML = `<div id="group">123</div>`;
  });
  it('正常解析', function () {
    const node = document.getElementById('group') as HTMLDivElement;
    const group = nodeToGroup(node);
    expect(group.toSketchJSON()).toMatchSnapshot();
  });
});

describe('多个解析', function () {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  beforeEach(() => {
    document.body.innerHTML = `<div id="group"><div>123</div><div>13333</div></div>`;
  });
  it('多个解析', () => {
    const node = document.getElementById('group') as HTMLDivElement;
    const group = nodeToGroup(node);
    expect(group.toSketchJSON()).toMatchSnapshot();
  });
});
