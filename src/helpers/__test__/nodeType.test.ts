import { isGroupNode, isTextNode } from '../nodeType';

describe('isTextNode', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <table>
      <tbody>
        <thead>
          <tr>
            <th class="table" >
              Header 1
              <span/>
            </th>
          </tr>
        </thead>
      </tbody>
    </table>
    <div id="text">文本对象</div>
    <div id="no-text"></div>
    `;
  });
  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('#text 是文本节点', () => {
    expect(isTextNode(document.getElementById('text')!)).toBeTruthy();
  });
  it('#no-text 不是文本节点', () => {
    expect(isTextNode(document.getElementById('no-text')!)).toBeFalsy();
  });

  it('#th 是文本节点', () => {
    expect(isTextNode(document.getElementsByTagName('th')[0])).toBeTruthy();
  });
});

describe('isGroupNode', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <div id="div">1</div>
    <span id="span"></span>
`;
  });
  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('#div 是组节点', () => {
    expect(isGroupNode(document.getElementById('div')!)).toBeTruthy();
  });
  it('#span 是组节点', () => {
    expect(isGroupNode(document.getElementById('span')!)).toBeTruthy();
  });
});
