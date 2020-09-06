import { Bitmap, Group, parseToShape, Rectangle } from 'html2sketch';

describe('parseToShape', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
.background {
  background-image: url('https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png');
}

.linear-gradient {
  background-image: linear-gradient(red, yellow, blue)
}

.radial-gradient {
  background-image: radial-gradient(red, yellow, blue)
}

</style>
    `;
    document.body.innerHTML = `
<div
  id="radial-gradient"
  class="radial-gradient"
  style="width: 200px; height: 200px;"
/>



<div
  id="linear-gradient"
  class="linear-gradient"
  style="width: 200px; height: 200px;"
/>

<div
  id="background-image"
  class="background"
  style="width: 200px; height: 200px;"
/>

<div id="shape" style="background: rgba(124,14,53,0.12);width:200px" />


<div
  id="clip-background-image"
  class="background"
  style="width: 150px; height: 200px;"
/>


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
  it('shape 正常解析', async () => {
    const node = document.getElementById('shape') as HTMLDivElement;

    const shapeJSON = (await parseToShape(node)).toSketchJSON();

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
  it('shadow 正常解析', async () => {
    const node = document.getElementById('shadow') as HTMLDivElement;

    const shadowJSON = (await parseToShape(node)).toSketchJSON();
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
  it('inner-shadow 正常解析', async () => {
    const node = document.getElementById('inner-shadow') as HTMLDivElement;

    const shadowJSON = (await parseToShape(node)).toSketchJSON();
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
  it('multi-shadow 正常解析', async () => {
    const node = document.getElementById('multi-shadow') as HTMLDivElement;

    const shadowJSON = (await parseToShape(node)).toSketchJSON();
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
  it('border 正常解析', async () => {
    const node = document.getElementById('border') as HTMLDivElement;

    const borderJSON = (await parseToShape(node)).toSketchJSON();
    expect(borderJSON.style?.borders?.length).toBe(1);
    const border = borderJSON.style?.borders?.[0]!;
    expect(border.thickness).toBe(2);
    expect(border.color.blue).toBe(1);
  });
  it('dashed-border 正常解析', async () => {
    const node = document.getElementById('dashed-border') as HTMLDivElement;

    const borderJSON = (await parseToShape(node)).toSketchJSON();
    expect(borderJSON.style?.borders?.length).toBe(1);
    expect(borderJSON.style?.borderOptions.dashPattern).toStrictEqual([6, 6]);
  });
  it('dotted-border 正常解析', async () => {
    const node = document.getElementById('dotted-border') as HTMLDivElement;
    const borderJSON = (await parseToShape(node)).toSketchJSON();
    expect(borderJSON.style?.borderOptions.dashPattern).toStrictEqual([2, 2]);
  });
  it('single-border 正常解析', async () => {
    const node = document.getElementById('single-border') as HTMLDivElement;
    const borderJSON = (await parseToShape(node)).toSketchJSON();
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
  it('background-image 正常解析', async () => {
    const node = document.getElementById('background-image') as HTMLDivElement;
    const rectangle = (await parseToShape(node)) as Rectangle;

    expect(rectangle.class).toBe('rectangle');
    const fill = rectangle.style.fills[0];
    expect(fill.type).toBe(4);

    expect(fill.image?.url).toBe(
      'https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png',
    );

    expect(rectangle.frame.width).toBe(200);
    expect(rectangle.frame.height).toBe(200);
    expect(fill.image?.base64).toBe(
      'iVBORw0KGgoAAAANSUhEUgAAALoAAAC6CAMAAAAu0KfDAAABa1BMVEUAAAAy/MoNt+ELtOUc0cMc2LwUxNgVyM4j4bEm56og4K8SwtQYz8UPvNwZzsYVyc0i2L1c5dMPvtoRwdUWycso7KoRvdwOtOUp8Zwc1b8MtuIl5qkf27ga0sAr8pwMtOQp8pwr9Joe2bko66Yh4a8Ux88i5KsKtOQNt+Er9Zgb1r4Pu9sm6qUNt98c1b8MtuMq85kr9Joc08Ac170p750b1MAp85sd1bwb08ALtuEo8JwLteIKs+Qa1L0Z078o8pkn750Z0sEp85kTxs4p9Jgb1b0o8poKtOQZ074RwtMg4a4o8psSxNAY0MAi5Koh4q0Sxc8Mt98h46sSw9Ih4qwSwtEa1L4a1bsi5KwTxNEj5aoo8J0QwNYi5Kkl6qMb17oc2bgj6KYm7KEOvNoVysoXz8QPvtgf3rId2rYe3LQVy8gXzcYf37Ak6aUNutwUyMwj5qgn7p8Mud4e3LMm7aAY0MIg4a8Tx84WzMikfcgIAAAAOXRSTlMABe6fN3YarV9J/p+fn+6fEQLu7u4hVy3lhHhAKvb025NaVjL48e7IuLKwkHL05OLbzMvFr417c2nUVZYYAAAEnUlEQVR42u3WaVMTQRAG4F5F1HhlVU5RDu/7PghXIARJCAFCIuHGQDgCGEUg/Hx7J5md2lqT0pk41Fj9VBfdM7MNb/lJIIQQQgghhBBCCCGEEELIvxHsftw6qtXjbhvqwOoacYyOjGKN8Bl5zliic/wssf8qCMqa7ogoQyNDDA5YvPvvvOT2X6snH/Lgf8J/Hhsawxrykd6/C2qsO/jrsMYYPou7arMgvf8M1HRNOMYmxhgcsDydv1d7k9//AEqCodBEaAKLdcTn33dOnBX2b4GS7tCpabVBybsQEw6Fw4vhRSa06LnDs5jxB44hvOKz9P6dJlDTGj4drV0WKAq7gpZOoO6HywLDGBz90GVc9Fwud5g7xMqZGL2Momu0ksut5FYc5kV3UHTN9leY/ZV986JzFF2jry6Krs93g6O7KLo+ywvchYsqbjXZoBlGX15YZnDAYp3jZ19PLiSTy0lxhx7cBb2SdaQru4ieSqZceMDydEbcud9xYv+BBTqlyrKpLINDKp1KY4mOl+we8Vnw7DeBTulsNp1Nu7LszLoD2x/dV1wEnaa80lNpBgcs3n13VXSATlPx+FR8ionzuRbxnX++Z4FO8Tq6BVoFAoHjwPFx/DjOBOIBLG9HbMaPsHxvfP+e5uQQcD27oKKnwwLN9lzG/R/G4Ohbe3tbe1sO86I7KLpmP13mRd/Z+bljZvQdF0XXZ2ebMy76trnR17aZte0186JzFL06ii6suih6VRRduL26Orc652g7p8fHngYL6uHt3Fx0LoolOmIzqnbP4VFq/0kjqGuLRgeiA1hRH7xE/I1/JzontX8OlHUM1ML/VA2y+09Alf3iy8CXAQYHLNY5fvZ1z5vcfhuoahjnBscHscYlyO03gar3+OewBqvi795ZkN1/A6rsy/hrhgeHGRx88BLLNwuy+0FQ9mnSNTw5jMU6qj2L7yX3e0BdsO328O8jse6/85PZPwf1YAc7GnS5PVlxGUxzdfKozMDoR/n8Ud7M6PkKiq7R1d08s2tm9N387q6R0R0UXa+rhZOTwkmhUDAxuoOi63WzsMEUroFpbm5UUHSNbhY3mKKJ0csouk73i6VSsVQslrRHDzZfO6+kFClhRSIR3dGbI/WhP3pDxNTo9v3p+rkEOgWnEx7TiWksb0fY+LtvFvRGb0zMzyfmE1ise8z73/g94m+ia45uZcp/NjOfySRwxh8OPHrvePffi33N0eFSJjObmWVwwGId8Vm8e7/xv2c0R7duzMZmYwwOLjxgiS6+qfGmOTpYT2P1cgl0s4ONSm6I6Ka5sRSLLcWWlpZMjO6g6DVR9P8i+vXNCoOjXwHTmBx9fXNzfXN9fd3E6A6Krtf1bwZHrzAv+hmTox8cfDswM/pBBUXX6MxMhXL0lkfPz2g1w7WDmvaZ3plerBlGzJ6z6P5v5febFf/Ne09PIyh52vvX+nr7sPhJfr8T1Lzs88BfieWfOf+9/H4LqHnUd1rOgqLmz1L6P/djsVFy/6ENiuxOjMCi8M6Js4fvXW7/rA3Kgg/79etsgbpoaT+rVXtzIxBCCCGEEEIIIYQQQgj5c78Aun4NkqgvDW0AAAAASUVORK5CYII=',
    );
  });
  it('clip-background-image 正常解析', async () => {
    const node = document.getElementById(
      'clip-background-image',
    ) as HTMLDivElement;
    const group = (await parseToShape(node)) as Group;

    console.log(group);
    expect(group.class).toBe('group');
    expect(group.layers.length).toBe(2);
    expect(group.frame.width).toBe(150);
    expect(group.frame.height).toBe(200);

    const [rect, bitmap] = group.layers;
    expect(rect.class).toBe('rectangle');
    expect(rect.name).toBe('Mask');
    expect(rect.x).toBe(0);
    expect(rect.y).toBe(0);
    expect(rect.hasClippingMask).toBeTruthy();
    expect(rect.toSketchJSON().hasClippingMask).toBeTruthy();

    expect(bitmap.class).toBe('bitmap');
    expect(bitmap.x).toBe(0);
    expect(bitmap.y).toBe(0);

    expect((bitmap as Bitmap).url).toBe(
      'https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png',
    );
    expect((bitmap as Bitmap).base64).toBe(
      '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',
    );
  });
  it('linear-gradient 正常解析', async () => {
    const node = document.getElementById('linear-gradient') as HTMLDivElement;
    const rectangle = (await parseToShape(node)) as Rectangle;

    expect(rectangle.class).toBe('rectangle');
    const fill = rectangle.style.fills[0];

    expect(fill.type).toBe(1);

    expect(rectangle.frame.width).toBe(200);
    expect(rectangle.frame.height).toBe(200);
    expect(fill.gradient?.stops.length).toBe(3);
  });
  it('radial-gradient 暂不支持解析', async () => {
    const node = document.getElementById('radial-gradient') as HTMLDivElement;
    const rectangle = (await parseToShape(node)) as Rectangle;

    expect(rectangle.class).toBe('rectangle');
    expect(rectangle.frame.width).toBe(200);
    expect(rectangle.frame.height).toBe(200);

    const fill = rectangle.style.fills[0];

    expect(fill).toBeUndefined();
  });
});
