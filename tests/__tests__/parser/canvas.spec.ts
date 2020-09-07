import { parseCanvasToBitmap } from 'html2sketch';

describe('parseCanvasToBitmap', () => {
  const emptyImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAEYklEQVR4Xu3UAQkAAAwCwdm/9HI83BLIOdw5AgQIRAQWySkmAQIEzmB5AgIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlAABg+UHCBDICBisTFWCEiBgsPwAAQIZAYOVqUpQAgQMlh8gQCAjYLAyVQlKgIDB8gMECGQEDFamKkEJEDBYfoAAgYyAwcpUJSgBAgbLDxAgkBEwWJmqBCVAwGD5AQIEMgIGK1OVoAQIGCw/QIBARsBgZaoSlACBB1YxAJfjJb2jAAAAAElFTkSuQmCC';
  describe('正常解析', () => {
    afterAll(() => {
      document.body.innerHTML = '';
    });
    beforeAll(() => {
      document.body.innerHTML = `<canvas id="canvas" />`;
    });

    it('传入空值 则返回未定义对象', () => {
      const img = document.getElementById('im') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer).toBeUndefined();
    });
    it('传入不正确的节点 则返回未定义对象', () => {
      const img = document.getElementById('div') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer).toBeUndefined();
    });

    it('可正常解析', () => {
      const img = document.getElementById('canvas') as HTMLCanvasElement;
      const imageLayer = parseCanvasToBitmap(img);
      expect(imageLayer?.url).toBe(emptyImage);
    });
  });

  describe('带有 URL 解析', () => {
    afterAll(() => {
      document.body.innerHTML = '';
    });
    beforeAll(() => {
      document.body.innerHTML = `<canvas id="canvas" />`;
    });

    it('渲染样式不同', () => {
      const canvas = document.getElementById('canvas') as HTMLCanvasElement;
      const context = canvas.getContext('2d');
      if (context) {
        context.beginPath();
        context.moveTo(150, 50);
        context.lineTo(650, 50);
        context.lineTo(650, 550);
        context.lineTo(150, 550);
        context.lineTo(150, 50); // 最后一笔可以不画
        context.closePath(); // 使用closePath()闭合图形

        context.fillStyle = 'yellow'; // 选择油漆桶的颜色
        context.lineWidth = 5;
        context.strokeStyle = 'black';

        context.fill(); // 确定填充
        const imageLayer = parseCanvasToBitmap(canvas);
        expect(imageLayer?.url).not.toBe(emptyImage);
      }
    });
  });
});
