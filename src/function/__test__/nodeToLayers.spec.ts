import nodeToLayers from '../nodeToLayers';
import { isUpdate, outputJSONData } from '@test-utils';

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
</style>
    `;
    document.body.innerHTML = `
<div>
    <div id="default" style="background: aliceblue">123</div>
    <div id="pseudo" class="pseudo"></div>
    <canvas id="canvas" style="width: 100px;height: 100px;"/>
</div>
`;
  });
  it('default 图层正常解析', () => {
    const node = document.getElementById('default') as HTMLDivElement;
    const layers = nodeToLayers(node);

    if (isUpdate) {
      const obj: any[] = [];
      layers.forEach((l) => {
        obj.push(l.toSketchJSON());
      });
      outputJSONData(obj, 'node-to-layers');
    }
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

  it('pseudo 正常解析', () => {
    const node = document.getElementById('pseudo') as HTMLDivElement;
    const layers = nodeToLayers(node);

    if (isUpdate) {
      const obj: any[] = [];
      layers.forEach((l) => {
        obj.push(l.toSketchJSON());
      });
      outputJSONData(obj, 'node-to-layers-pseudo');
    }
    expect(layers.length).toBe(1);
  });

  it('canvas 正常解析', () => {
    const node = document.getElementById('canvas') as HTMLCanvasElement;
    const layers = nodeToLayers(node);

    if (isUpdate) {
      const obj: any[] = [];
      layers.forEach((l) => {
        obj.push(l.toSketchJSON());
      });
      outputJSONData(obj, 'node-to-layers-canvas');
    }
    expect(layers.length).toBe(1);
    const canvas = layers[0].toSketchJSON();
    expect(canvas._class).toBe('bitmap');
    expect(canvas.frame.width).toBe(100);
    expect(canvas.frame.height).toBe(100);
    expect(layers[0].nodeType).toBe('canvas');
  });
});
