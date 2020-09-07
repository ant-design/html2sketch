import { parseToGroup } from 'html2sketch';

describe('parseToGroup', () => {
  beforeAll(() => {
    document.body.innerHTML = `<div id="group" style="line-height: 30px">123</div>`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('group') as HTMLDivElement;

    const group = parseToGroup(node);
    expect(group).toBeTruthy();

    const groupSketchJSON = group.toSketchJSON();
    expect(groupSketchJSON.frame.height).toBe(30);
    expect(groupSketchJSON.layers.length).toBe(0);
  });
});
