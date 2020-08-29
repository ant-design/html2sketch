import { isUpdate, outputJSONData, shapeJSON } from '@test-utils';
import { parseToShape } from 'html2sketch';

describe('parseToShape', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  beforeAll(() => {
    document.body.innerHTML = `<div id="shape" style="background: aqua;width:200px"></div>`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('shape') as HTMLDivElement;

    const shape = parseToShape(node);
    expect(shape).toBeTruthy();
    expect(shape.toSketchJSON()).toMatchSnapshot();
    if (isUpdate) {
      // 如果出现小数点的不一致 进行重新输出
      outputJSONData(shape.toSketchJSON(), 'shape');
    }

    expect(shape.toSketchJSON()).toStrictEqual(shapeJSON);
  });
});
