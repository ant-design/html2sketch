import { isUpdate, outputJSONData, groupJSON } from '@test-utils';
import { Group, parseToGroup } from 'html2sketch';

describe('parseToGroup', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  beforeAll(() => {
    document.body.innerHTML = `<div id="group" style="line-height: 22px">123</div>`;
  });
  it('文本正常解析', () => {
    const node = document.getElementById('group') as HTMLDivElement;

    const group = (parseToGroup(node) as unknown) as Group;
    expect(group).toBeTruthy();
    // expect(group.toSketchJSON()).toMatchSnapshot();
    if (isUpdate) {
      // 如果出现小数点的不一致 进行重新输出
      outputJSONData(group.toSketchJSON(), 'group');
    }

    const { userInfo, frame, ...groupSketchJSON } = group.toSketchJSON();
    expect(groupSketchJSON).toStrictEqual(groupJSON);
  });
});
