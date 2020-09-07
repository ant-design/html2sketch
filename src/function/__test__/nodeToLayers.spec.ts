import { Bitmap, nodeToLayers, Rectangle } from 'html2sketch';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';

describe('nodeToLayers', () => {
  beforeAll(() => {
    document.head.innerHTML = `
    <style>
    .pseudo:before{
    content: '';
    background: red;
    display: block;
    position: absolute;
    left: 0;
    width: 100px;
    height: 100px;
    }
    .background{
    background-image: url("https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png");
    }
</style>
    `;

    const node = document.createElement('div');

    node.innerHTML = `
<div>
   <img
      id="png"
      src="https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png"
      style="width: 200px; height: 200px"
    />
     <div
      id="background-image"
      class="background"
      style="width: 200px; height: 200px"
    />

     <div id="default" style="background: aliceblue">123</div>


    <div id="pseudo" class="pseudo" />

    <canvas id="canvas" style="width: 100px;height: 100px;"/>

    <input id="input" placeholder="请输入" />


</div>
`;

    document.body.append(node);
  });
  it('default 图层正常解析', async () => {
    const node = document.getElementById('default') as HTMLDivElement;
    const layers = await nodeToLayers(node);

    expect(layers.length).toBe(2);
    const rect = layers[0].toSketchJSON();
    expect(rect._class).toBe('rectangle');
    expect(rect.style?.fills?.[0].color).toStrictEqual({
      _class: 'color',
      alpha: 1,
      blue: 1,
      green: 0.9725490196078431,
      red: 0.9411764705882353,
    });
    expect(layers[1].toSketchJSON()._class).toBe('text');
  });

  it('pseudo 正常解析', async () => {
    const node = document.getElementById('pseudo') as HTMLDivElement;
    const layers = await nodeToLayers(node);

    console.log(layers);
    expect(layers.length).toBe(1);
  });

  it('canvas 正常解析', async () => {
    const node = document.getElementById('canvas') as HTMLCanvasElement;
    const layers = await nodeToLayers(node);

    expect(layers.length).toBe(1);
    const canvas = layers[0].toSketchJSON();
    expect(canvas._class).toBe('bitmap');
    expect(canvas.frame.width).toBe(100);
    expect(canvas.frame.height).toBe(100);
    expect(layers[0].nodeType).toBe('canvas');
  });

  it('png 正常解析', async () => {
    const node = document.getElementById('png') as HTMLImageElement;
    const layers = await nodeToLayers(node);

    expect(layers.length).toBe(1);
    const bitmap = layers[0] as Bitmap;
    expect(bitmap.url).toBe(
      'https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png',
    );
    const png = bitmap.toSketchJSON();
    expect(png._class).toBe('bitmap');
    expect(png.frame.width).toBe(200);
    expect(png.frame.height).toBe(200);
    expect((png.image as SketchFormat.DataRef).data._data).toBe(
      'iVBORw0KGgoAAAANSUhEUgAAALoAAAC6CAMAAAAu0KfDAAABa1BMVEUAAAAy/MoNt+ELtOUc0cMc2LwUxNgVyM4j4bEm56og4K8SwtQYz8UPvNwZzsYVyc0i2L1c5dMPvtoRwdUWycso7KoRvdwOtOUp8Zwc1b8MtuIl5qkf27ga0sAr8pwMtOQp8pwr9Joe2bko66Yh4a8Ux88i5KsKtOQNt+Er9Zgb1r4Pu9sm6qUNt98c1b8MtuMq85kr9Joc08Ac170p750b1MAp85sd1bwb08ALtuEo8JwLteIKs+Qa1L0Z078o8pkn750Z0sEp85kTxs4p9Jgb1b0o8poKtOQZ074RwtMg4a4o8psSxNAY0MAi5Koh4q0Sxc8Mt98h46sSw9Ih4qwSwtEa1L4a1bsi5KwTxNEj5aoo8J0QwNYi5Kkl6qMb17oc2bgj6KYm7KEOvNoVysoXz8QPvtgf3rId2rYe3LQVy8gXzcYf37Ak6aUNutwUyMwj5qgn7p8Mud4e3LMm7aAY0MIg4a8Tx84WzMikfcgIAAAAOXRSTlMABe6fN3YarV9J/p+fn+6fEQLu7u4hVy3lhHhAKvb025NaVjL48e7IuLKwkHL05OLbzMvFr417c2nUVZYYAAAEnUlEQVR42u3WaVMTQRAG4F5F1HhlVU5RDu/7PghXIARJCAFCIuHGQDgCGEUg/Hx7J5md2lqT0pk41Fj9VBfdM7MNb/lJIIQQQgghhBBCCCGEEELIvxHsftw6qtXjbhvqwOoacYyOjGKN8Bl5zliic/wssf8qCMqa7ogoQyNDDA5YvPvvvOT2X6snH/Lgf8J/Hhsawxrykd6/C2qsO/jrsMYYPou7arMgvf8M1HRNOMYmxhgcsDydv1d7k9//AEqCodBEaAKLdcTn33dOnBX2b4GS7tCpabVBybsQEw6Fw4vhRSa06LnDs5jxB44hvOKz9P6dJlDTGj4drV0WKAq7gpZOoO6HywLDGBz90GVc9Fwud5g7xMqZGL2Momu0ksut5FYc5kV3UHTN9leY/ZV986JzFF2jry6Krs93g6O7KLo+ywvchYsqbjXZoBlGX15YZnDAYp3jZ19PLiSTy0lxhx7cBb2SdaQru4ieSqZceMDydEbcud9xYv+BBTqlyrKpLINDKp1KY4mOl+we8Vnw7DeBTulsNp1Nu7LszLoD2x/dV1wEnaa80lNpBgcs3n13VXSATlPx+FR8ionzuRbxnX++Z4FO8Tq6BVoFAoHjwPFx/DjOBOIBLG9HbMaPsHxvfP+e5uQQcD27oKKnwwLN9lzG/R/G4Ohbe3tbe1sO86I7KLpmP13mRd/Z+bljZvQdF0XXZ2ebMy76trnR17aZte0186JzFL06ii6suih6VRRduL26Orc652g7p8fHngYL6uHt3Fx0LoolOmIzqnbP4VFq/0kjqGuLRgeiA1hRH7xE/I1/JzontX8OlHUM1ML/VA2y+09Alf3iy8CXAQYHLNY5fvZ1z5vcfhuoahjnBscHscYlyO03gar3+OewBqvi795ZkN1/A6rsy/hrhgeHGRx88BLLNwuy+0FQ9mnSNTw5jMU6qj2L7yX3e0BdsO328O8jse6/85PZPwf1YAc7GnS5PVlxGUxzdfKozMDoR/n8Ud7M6PkKiq7R1d08s2tm9N387q6R0R0UXa+rhZOTwkmhUDAxuoOi63WzsMEUroFpbm5UUHSNbhY3mKKJ0csouk73i6VSsVQslrRHDzZfO6+kFClhRSIR3dGbI/WhP3pDxNTo9v3p+rkEOgWnEx7TiWksb0fY+LtvFvRGb0zMzyfmE1ise8z73/g94m+ia45uZcp/NjOfySRwxh8OPHrvePffi33N0eFSJjObmWVwwGId8Vm8e7/xv2c0R7duzMZmYwwOLjxgiS6+qfGmOTpYT2P1cgl0s4ONSm6I6Ka5sRSLLcWWlpZMjO6g6DVR9P8i+vXNCoOjXwHTmBx9fXNzfXN9fd3E6A6Krtf1bwZHrzAv+hmTox8cfDswM/pBBUXX6MxMhXL0lkfPz2g1w7WDmvaZ3plerBlGzJ6z6P5v5febFf/Ne09PIyh52vvX+nr7sPhJfr8T1Lzs88BfieWfOf+9/H4LqHnUd1rOgqLmz1L6P/djsVFy/6ENiuxOjMCi8M6Js4fvXW7/rA3Kgg/79etsgbpoaT+rVXtzIxBCCCGEEEIIIYQQQgj5c78Aun4NkqgvDW0AAAAASUVORK5CYII=',
    );
  });

  it('放在背景图片的 png 也能正常解析', async () => {
    const node = document.getElementById('background-image') as HTMLDivElement;
    const layers = await nodeToLayers(node);

    expect(layers.length).toBe(1);
    const rectangle = layers[0] as Rectangle;
    const fill = rectangle.style.fills[0];
    expect(fill.image?.url).toBe(
      'https://gw.alipayobjects.com/zos/rmsportal/mZBWtboYbnMkTBaRIuWQ.png',
    );
    const png = rectangle.toSketchJSON();
    expect(png._class).toBe('rectangle');
    expect(png.frame.width).toBe(200);
    expect(png.frame.height).toBe(200);
    const fillImage = png.style?.fills?.[0].image as SketchFormat.DataRef;
    expect(fillImage.data._data).toBe(
      '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',
    );
  });
  it('input 正常解析', async () => {
    const node = document.getElementById('input') as HTMLInputElement;
    const layers = await nodeToLayers(node);

    expect(layers.length).toBe(2);
  });
});
