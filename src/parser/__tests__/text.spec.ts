import { isUpdate, outputJSONData } from '@test-utils';
import { parseToText, Text } from 'html2sketch';

describe('parseToText', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  beforeAll(() => {
    document.body.innerHTML = `<div id="text"">123</div>`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('text') as HTMLDivElement;

    const text = (parseToText(node) as unknown) as Text;
    expect(text).toBeTruthy();
    // expect(text.toSketchJSON()).toMatchSnapshot();
    if (isUpdate) {
      // 如果出现小数点的不一致 进行重新输出
      outputJSONData(text.toSketchJSON(), 'text');
    }

    expect(text.toSketchJSON().attributedString.string).toBe('123');
  });
  it('空文本不解析', () => {
    const node = document.createElement('div');

    const text = parseToText(node);
    expect(text).toBeUndefined();
  });
  it('多个文本解析正常', () => {
    // const node = document.createElement('div');
    // node.innerHTML = `<div id="text" style="font-family:"PingFang TC""><span>13</span>123</div>`;
    // console.log(node);
    // const text = parseToText(node);
    // expect(text).toBeTruthy();
    // expect((text as Text[]).length).toBe(2);
  });
});
