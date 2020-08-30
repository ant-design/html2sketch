import { parseToShape } from 'html2sketch';

describe('parseToShape', () => {
  beforeAll(() => {
    document.body.innerHTML = `
<div id="shape" style="background: rgba(124,14,53,0.12);width:200px" />
<div id="shadow" style="box-shadow: 0 2px 4px black;" />
<div id="border" style="border: 2px solid blue;" />
<div id="dashed-border" style="border: 2px dashed blue;" />
<div id="dotted-border" style="border: 2px dotted blue;" />
<div id="single-border" style="
  border-top: 3px solid red;
  border-left: 2px solid blue;
  border-right: 1px solid rgb(0,255,0);
  border-bottom: 3px solid black;
" />

<div id="inner-shadow" style="box-shadow: 0 1px 2px red inset;" />
<div id="multi-shadow" style="
  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);"
/>
`;
  });
  it('shape 正常解析', () => {
    const node = document.getElementById('shape') as HTMLDivElement;

    const shapeJSON = parseToShape(node).toSketchJSON();

    expect(shapeJSON._class).toBe('rectangle');

    // 校验宽度
    expect(shapeJSON.frame.width).toBe(200);

    expect(shapeJSON.style?.fills?.length).toBe(1);

    // 校验颜色
    const color = shapeJSON.style?.fills?.[0].color!;
    const getColor = (colorValue: number) => (colorValue * 256).toFixed(0);

    expect(getColor(color.red)).toBe('124');
    expect(getColor(color.green)).toBe('14');
    expect(getColor(color.blue)).toBe('53');
    expect(color?.alpha).toBe(0.12);
  });
  it('shadow 正常解析', () => {
    const node = document.getElementById('shadow') as HTMLDivElement;

    const shadowJSON = parseToShape(node).toSketchJSON();
    expect(shadowJSON._class).toBe('rectangle');
    // 校验颜色
    expect(shadowJSON.style?.fills?.length).toBe(0);
    const shadow = shadowJSON.style?.shadows?.[0]!;
    expect(shadow._class).toBe('shadow');
    // 阴影颜色
    expect(shadow.color.red).toBe(0);
    expect(shadow.color.blue).toBe(0);
    expect(shadow.color.green).toBe(0);
    expect(shadow.color.alpha).toBe(1);
    // 阴影样式
    expect(shadow.offsetX).toBe(0);
    expect(shadow.offsetY).toBe(2);
    expect(shadow.blurRadius).toBe(4);
    expect(shadow.spread).toBe(0);
  });
  it('inner-shadow 正常解析', () => {
    const node = document.getElementById('inner-shadow') as HTMLDivElement;

    const shadowJSON = parseToShape(node).toSketchJSON();
    expect(shadowJSON._class).toBe('rectangle');
    // 校验颜色
    expect(shadowJSON.style?.fills?.length).toBe(0);
    expect(shadowJSON.style?.shadows?.length).toBe(0);

    const shadow = shadowJSON.style?.innerShadows?.[0]!;
    expect(shadow._class).toBe('innerShadow');
    // 阴影颜色
    expect(shadow.color.red).toBe(1);
    expect(shadow.color.alpha).toBe(1);
    // 阴影样式
    expect(shadow.offsetX).toBe(0);
    expect(shadow.offsetY).toBe(1);
    expect(shadow.blurRadius).toBe(2);
    expect(shadow.spread).toBe(0);
    expect(shadow.isEnabled).toBe(true);
  });
  it('multi-shadow 正常解析', () => {
    const node = document.getElementById('multi-shadow') as HTMLDivElement;

    const shadowJSON = parseToShape(node).toSketchJSON();
    expect(shadowJSON._class).toBe('rectangle');
    // 校验颜色
    expect(shadowJSON.style?.fills?.length).toBe(0);
    const shadows = shadowJSON.style?.shadows;
    expect(shadows?.length).toBe(3);

    const shadow1 = shadows?.[0]!;

    expect(shadow1._class).toBe('shadow');
    expect(shadow1.color.alpha).toBe(0.12);
    expect(shadow1.offsetY).toBe(3);
    expect(shadow1.blurRadius).toBe(6);
    expect(shadow1.spread).toBe(-4);

    const shadow2 = shadows?.[1]!;

    expect(shadow2._class).toBe('shadow');
    expect(shadow2.color.alpha).toBe(0.08);
    expect(shadow2.offsetY).toBe(6);
    expect(shadow2.blurRadius).toBe(16);
    expect(shadow2.spread).toBe(0);

    const shadow3 = shadows?.[2]!;

    expect(shadow3._class).toBe('shadow');
    expect(shadow3.color.alpha).toBe(0.05);
    expect(shadow3.offsetY).toBe(9);
    expect(shadow3.blurRadius).toBe(28);
    expect(shadow3.spread).toBe(8);
  });
  it('border 正常解析', () => {
    const node = document.getElementById('border') as HTMLDivElement;

    const borderJSON = parseToShape(node).toSketchJSON();
    expect(borderJSON.style?.borders?.length).toBe(1);
    const border = borderJSON.style?.borders?.[0]!;
    expect(border.thickness).toBe(2);
    expect(border.color.blue).toBe(1);
  });
  it('dashed-border 正常解析', () => {
    const node = document.getElementById('dashed-border') as HTMLDivElement;

    const borderJSON = parseToShape(node).toSketchJSON();
    expect(borderJSON.style?.borders?.length).toBe(1);
    expect(borderJSON.style?.borderOptions.dashPattern).toStrictEqual([6, 6]);
  });
  it('dotted-border 正常解析', () => {
    const node = document.getElementById('dotted-border') as HTMLDivElement;
    const borderJSON = parseToShape(node).toSketchJSON();
    expect(borderJSON.style?.borderOptions.dashPattern).toStrictEqual([2, 2]);
  });
  it('single-border 正常解析', () => {
    const node = document.getElementById('single-border') as HTMLDivElement;
    const borderJSON = parseToShape(node).toSketchJSON();
    const shadows = borderJSON.style?.innerShadows;
    expect(shadows?.length).toBe(4);
    // 1 Top
    const shadow1 = shadows?.[0];
    expect(shadow1?.offsetY).toBe(3);
    expect(shadow1?.color.red).toBe(1);
    expect(shadow1?.blurRadius).toBe(0);
    expect(shadow1?.spread).toBe(0);
    // 2 Right
    const shadow2 = shadows?.[1];
    expect(shadow2?.offsetX).toBe(-1);
    expect(shadow2?.color.green).toBe(1);
    // 3 Bottom
    const shadow3 = shadows?.[2];
    expect(shadow3?.offsetY).toBe(-3);
    expect(shadow3?.color.green).toBe(0);
    expect(shadow3?.color.red).toBe(0);
    expect(shadow3?.color.blue).toBe(0);
    // 4 Left
    const shadow4 = shadows?.[3];
    expect(shadow4?.offsetX).toBe(2);
    expect(shadow4?.color.blue).toBe(1);
  });
});
