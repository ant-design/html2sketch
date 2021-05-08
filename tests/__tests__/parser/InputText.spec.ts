import { parseInputTextToText, Text } from 'html2sketch';

describe('parseInputTextToText', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
  body{
    margin: 0;
  }
  .input::placeholder{
    color:red;
  }
</style>`;

    document.body.innerHTML = `
<div>



  <input id="input" />

  <input id="input-placeholder" class="input" placeholder="测试输入框" />

  <div>
    <input id="input-value" placeholder="测试输入框" value="这是值" />
  </div>


  <div>
    <input id="input-center" type="text" value="123456" style="width: 100px;text-align:center;" />
  </div>

</div>
`;
  });

  it('input 不返回', () => {
    const node = document.getElementById('input') as HTMLInputElement;
    const input = parseInputTextToText(node);

    expect(input).toBeUndefined();
  });

  it('input-placeholder 解析成文本', () => {
    const node = document.getElementById(
      'input-placeholder',
    ) as HTMLInputElement;
    const input = parseInputTextToText(node) as Text;
    expect(input.textStyle.color.red).toBe(255);
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('测试输入框');
  });
  it('input-value 解析成文本', () => {
    const node = document.getElementById('input-value') as HTMLInputElement;
    const input = parseInputTextToText(node) as Text;
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('这是值');
    expect(input.x).toBeLessThanOrEqual(2);
  });

  it('input-center 解析成文本', () => {
    const node = document.getElementById('input-center') as HTMLInputElement;
    const input = parseInputTextToText(node) as Text;
    const json = input.toSketchJSON();
    expect(json._class).toBe('text');
    expect(json.attributedString.string).toBe('123456');

    expect(input.centerX).toBe(53);
  });
});
