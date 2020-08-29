import { isUpdate, outputJSONData, textJSON } from '@test-utils';
import { parseToText, Text } from 'html2sketch';

describe('parseToText', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  beforeAll(() => {
    document.body.innerHTML = `<div id="text">123</div>`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('text') as HTMLDivElement;

    const text = (parseToText(node) as unknown) as Text;
    expect(text).toBeTruthy();
    expect(text.toSketchJSON()).toMatchSnapshot();
    if (isUpdate) {
      // 如果出现小数点的不一致 进行重新输出
      outputJSONData(text.toSketchJSON(), 'text');
    }

    expect(text.toSketchJSON()).toStrictEqual(textJSON);
  });
});
