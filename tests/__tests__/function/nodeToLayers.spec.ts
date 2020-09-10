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

<div id="row-text" style="padding: 16px 24px;">规划应用 <a>全局设置</a> <span role="img" aria-label="right" class="anticon anticon-right" style="color: rgba(0, 0, 0, 0.25);"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141V218.3C302 223.20000000000002 304.3 227.9 308.1 230.9L668.1 512L308.1 793.1C304.20000000000005 796.1 302 800.8000000000001 302 805.7V883C302 889.7 309.7 893.4 314.9 889.3L765.7 537.1999999999999A31.96 31.96 0 0 0 765.7 486.79999999999995z" style="fill: rgba(0, 0, 0, 0.25); color: rgba(0, 0, 0, 0.25); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.25); text-rendering: optimizelegibility;"></path></svg></span> 创建应用 <a>应用管理</a> <span role="img" aria-label="right" class="anticon anticon-right" style="color: rgba(0, 0, 0, 0.25);"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141V218.3C302 223.20000000000002 304.3 227.9 308.1 230.9L668.1 512L308.1 793.1C304.20000000000005 796.1 302 800.8000000000001 302 805.7V883C302 889.7 309.7 893.4 314.9 889.3L765.7 537.1999999999999A31.96 31.96 0 0 0 765.7 486.79999999999995z" style="fill: rgba(0, 0, 0, 0.25); color: rgba(0, 0, 0, 0.25); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.25); text-rendering: optimizelegibility;"></path></svg></span> 配置资源 <a>应用实例</a> <span role="img" aria-label="right" class="anticon anticon-right" style="color: rgba(0, 0, 0, 0.25);"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141V218.3C302 223.20000000000002 304.3 227.9 308.1 230.9L668.1 512L308.1 793.1C304.20000000000005 796.1 302 800.8000000000001 302 805.7V883C302 889.7 309.7 893.4 314.9 889.3L765.7 537.1999999999999A31.96 31.96 0 0 0 765.7 486.79999999999995z" style="fill: rgba(0, 0, 0, 0.25); color: rgba(0, 0, 0, 0.25); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.25); text-rendering: optimizelegibility;"></path></svg></span> 部署应用 <a>发布部署</a> <span role="img" aria-label="right" class="anticon anticon-right" style="color: rgba(0, 0, 0, 0.25);"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 0 0 302 141V218.3C302 223.20000000000002 304.3 227.9 308.1 230.9L668.1 512L308.1 793.1C304.20000000000005 796.1 302 800.8000000000001 302 805.7V883C302 889.7 309.7 893.4 314.9 889.3L765.7 537.1999999999999A31.96 31.96 0 0 0 765.7 486.79999999999995z" style="fill: rgba(0, 0, 0, 0.25); color: rgba(0, 0, 0, 0.25); font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgba(0, 0, 0, 0.25); text-rendering: optimizelegibility;"></path></svg></span> 监控运维 <a>监控分析平台 <span role="img" aria-label="link" class="anticon anticon-link"><svg viewBox="64 64 896 896" focusable="false" class="" data-icon="link" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M574 665.4A8.03 8.03 0 0 0 562.7 665.4L446.5 781.6C392.7 835.4 301.9 841.1 242.5 781.6C183 722.1 188.7 631.4000000000001 242.5 577.6L358.7 461.40000000000003C361.8 458.3 361.8 453.20000000000005 358.7 450.1L318.9 410.3A8.03 8.03 0 0 0 307.59999999999997 410.3L191.4 526.5C106.80000000000001 611.1 106.80000000000001 748 191.4 832.5S412.9 917.1 497.4 832.5L613.6 716.3C616.7 713.1999999999999 616.7 708.0999999999999 613.6 705L574 665.4zM832.6 191.39999999999998C748 106.79999999999998 611.1 106.79999999999998 526.6 191.39999999999998L410.3 307.6A8.03 8.03 0 0 0 410.3 318.90000000000003L450 358.6C453.1 361.70000000000005 458.2 361.70000000000005 461.3 358.6L577.5 242.40000000000003C631.3 188.60000000000002 722.1 182.90000000000003 781.5 242.40000000000003C841 301.90000000000003 835.3 392.6 781.5 446.40000000000003L665.3 562.6A8.03 8.03 0 0 0 665.3 573.9L705.0999999999999 613.6999999999999C708.1999999999999 616.8 713.3 616.8 716.3999999999999 613.6999999999999L832.5999999999999 497.49999999999994C917.0999999999999 412.9 917.0999999999999 275.99999999999994 832.5999999999999 191.39999999999992zM610.1 372.3A8.03 8.03 0 0 0 598.8000000000001 372.3L372.3 598.7A8.03 8.03 0 0 0 372.3 610L411.90000000000003 649.6C415.00000000000006 652.7 420.1 652.7 423.20000000000005 649.6L649.6 423.20000000000005C652.7 420.1 652.7 415.00000000000006 649.6 411.90000000000003L610.1 372.3z" style="fill: rgb(24, 144, 255); color: rgb(24, 144, 255); cursor: pointer; font-size: 14px; font-variant: tabular-nums; text-decoration: none solid rgb(24, 144, 255); text-rendering: optimizelegibility;"></path></svg></span></a></div>
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
      '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',
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
