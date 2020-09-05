import { parsePseudoToShape, Rectangle } from 'html2sketch';

describe('parseToShape', () => {
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
  }
</style>
    `;
    document.body.innerHTML = `
<div>
    <div id="normal"></div>
    <div id="text" class="text"></div>
    <div id="before" class="before"></div>
    <div id="after" class="after"></div>
    <div id="mix" class="mix" />
    <div id="no-content" class="no-content" />
    <div id="inline" class="inline" />
    <div id="radio" class="radio" />
</div>
`;
  });

  it('radio 可解析', () => {
    const node = document.getElementById('radio') as HTMLDivElement;
    const shape = parsePseudoToShape(node, 'before') as Rectangle;

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
});
