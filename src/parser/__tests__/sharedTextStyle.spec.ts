import { parseToSharedTextStyle } from 'html2sketch';

describe('parseToSharedTextStyle', () => {
  beforeAll(() => {
    document.body.innerHTML = `
<div>
    <div id="default" style="background: aliceblue">
    aaa
    </div>
</div>
`;
  });
  it('default 正常解析', () => {
    const node = document.getElementById('default') as HTMLDivElement;
    const layers = parseToSharedTextStyle(node);

    expect(layers.length).toBe(1);
    expect(layers[0].name).toBe('aaa');
  });
});
