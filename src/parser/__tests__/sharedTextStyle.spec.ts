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
  it('default 正常解析', async () => {
    const node = document.getElementById('default') as HTMLDivElement;
    const layers = await parseToSharedTextStyle(node);

    expect(layers.length).toBe(1);
    expect(layers[0].name).toBe('aaa');
  });
});
