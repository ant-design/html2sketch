import { parsePseudoToShape, Rectangle } from 'html2sketch';

describe('parsePseudoToShape', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
  .before:before{
      content: '';
      background: red;
      display: block;
      position: absolute;
      left: 0;
      top: 200px;
      width: 100px;
      height: 100px;
  }
  .after:after{
      content: '';
      background: green;
      display: block;
      position: absolute;
      right: 0;
      width: 50px;
      height: 50px;
  }
  .mix:before{
      content: '';
      background: aquamarine;
      display: block;
      position: absolute;
      left: 0;
      width: 100px;
      height: 100px;
  }
  .mix:after{
      content: '';
      background: blue;
      display: block;
      position: absolute;
      left: 100px;
      width: 100px;
      height: 100px;
  }
  .no-content:before{
    background: blueviolet;
    display: block;
    position: absolute;
    left: 0;
    top: 300px;
    width: 100px;
    height: 100px;
  }
  .inline:before{
    content: '';
    background: blueviolet;
    display: inline;
    position: absolute;
    left: 0;
    top: 300px;
    width: 100px;
    height: 100px;
  }
  .radio:before{
    position: absolute;
    top: 400px;
    left: 0;
    background-color: #fff;
    border-radius: 9px;
    box-shadow: 0 2px 4px 0 rgba(0,255,0,0.2);
    content: '';
  }
  .ant-checkbox-inner {
    position: relative;
    top: 0;
    left: 0;
    display: block;
    width: 16px;
    height: 16px;
    direction: ltr;
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 2px;
    border-collapse: separate;
    transition: all 0.3s;
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #1890ff;
    border-color: #1890ff;
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    position: absolute;
    display: table;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    opacity: 1;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    content: ' ';
  }
  .ant-checkbox-checked .ant-checkbox-inner::after {
    position: absolute;
    display: table;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
    transform: rotate(45deg) scale(1) translate(-50%, -50%);
    opacity: 1;
    transition: all 0.2s cubic-bezier(0.12, 0.4, 0.29, 1.46) 0.1s;
    content: ' ';
}
.ant-checkbox-inner::after {
    position: absolute;
    top: 50%;
    left: 22%;
    display: table;
    width: 5.71428571px;
    height: 9.14285714px;
    border: 2px solid #fff;
    border-top: 0;
    border-left: 0;
}

.with-padding-button-wrapper {
  background: #fff;
  border-color: #d9d9d9;
  border-style: solid;
  border-width: 1.02px 1px 1px 0;
  color: rgba(0, 0, 0, 0.85);
  cursor: pointer;
  display: inline-block;
  font-size: 14px;
  height: 32px;
  line-height: 30px;
  margin: 0;
  padding: 0 15px;
  position: relative;
}

.with-padding-button-wrapper:first-child {
  border-left: 1px solid #d9d9d9;
  border-radius: 2px 0 0 2px;
}

.with-padding-button-wrapper:not(:first-child):before {
  background-color: red;
  box-sizing: content-box;
  content: "";
  display: block;
  height: 100%;
  left: -1px;
  padding: 1px 0;
  position: absolute;
  top: -1px;
  width: 1px;
}
</style>
    `;

    const node = document.createElement('div');

    node.innerHTML = `
<div>
    <div id="normal"></div>
    <div id="text" class="text"></div>
    <div id="before" class="before"></div>
    <div id="after" class="after"></div>
    <div id="mix" class="mix" />
    <div id="no-content" class="no-content" />
    <div id="inline" class="inline" />
    <div id="radio" class="radio" />


    <span class="ant-checkbox ant-checkbox-checked">
      <input type="checkbox" class="ant-checkbox-input" value="" checked="">
      <span id="checkbox" class="ant-checkbox-inner"/>
    </span>

    <div >
      <div id="no-padding" class="with-padding-button-wrapper">button</div>
      <div id="with-padding" class="with-padding-button-wrapper">button</div>
    </div>
</div>
`;
    document.body.append(node);
  });

  it('radio 可解析', async () => {
    const node = document.getElementById('radio') as HTMLDivElement;
    const shape = (await parsePseudoToShape(node, 'before')) as Rectangle;

    const radio = shape.toSketchJSON();
    expect(radio.style?.fills?.[0].color).toStrictEqual({
      _class: 'color',
      red: 1,
      green: 1,
      blue: 1,
      alpha: 1,
    });
    const shadow = radio.style?.shadows?.[0];
    expect(shadow).toBeTruthy();
    expect(shadow?.offsetX).toBe(0);
    expect(shadow?.offsetY).toBe(2);
    expect(shadow?.blurRadius).toBe(4);
    expect(shadow?.color).toStrictEqual({
      _class: 'color',
      red: 0,
      green: 1,
      blue: 0,
      alpha: 0.2,
    });
  });
  it('checkbox 可解析', async () => {
    const node = document.getElementById('checkbox') as HTMLDivElement;
    const shape = (await parsePseudoToShape(node, 'after')) as Rectangle;
    const checkbox = shape.toSketchJSON();

    expect(Math.round(checkbox.rotation)).toEqual(-45);
  });

  it('带 padding 的伪类宽高解析正常', async () => {
    const node = document.getElementById('with-padding') as HTMLDivElement;
    const shape = (await parsePseudoToShape(node, 'before')) as Rectangle;
    const paddingBtn = shape.toSketchJSON();

    expect(paddingBtn.frame.height).toBe(34);

    const node1 = document.getElementById('no-padding') as HTMLDivElement;
    const shape1 = await parsePseudoToShape(node1, 'before');
    expect(shape1).toBeUndefined();
  });
});
