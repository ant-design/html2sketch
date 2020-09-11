import { Ellipse } from 'html2sketch';

describe('Ellipse', () => {
  it('正常创建', () => {
    const ellipse = new Ellipse({ x: 0, y: 50, width: 200, height: 100 });

    expect(ellipse).toBeTruthy();
    expect(ellipse.x).toBe(0);
    expect(ellipse.y).toBe(50);
    expect(ellipse.right).toBe(200);
    expect(ellipse.left).toBe(0);
    expect(ellipse.width).toBe(200);
    expect(ellipse.height).toBe(100);
    expect(ellipse.top).toBe(50);
    expect(ellipse.bottom).toBe(150);

    expect(ellipse.cx).toBe(100);
    expect(ellipse.cy).toBe(100);
    expect(ellipse.rx).toBe(100);
    expect(ellipse.ry).toBe(50);
  });

  it('以 rx ry cx cy 创建', () => {
    const ellipse = new Ellipse({
      cx: 100,
      cy: 100,
      rx: 25,
      ry: 25,
    });
    expect(ellipse.cx).toBe(100);
    expect(ellipse.cy).toBe(100);
    expect(ellipse.rx).toBe(25);
    expect(ellipse.ry).toBe(25);
  });
  it('修改 rx 正常响应', () => {
    const ellipse = new Ellipse({ x: 0, y: 50, width: 200, height: 100 });

    expect(ellipse.cx).toBe(100);
    ellipse.rx = 50;
    expect(ellipse.frame.width).toBe(100);
    expect(ellipse.frame.left).toBe(50);
    expect(ellipse.frame.right).toBe(150);
    expect(ellipse.cx).toBe(100);
    expect(ellipse.rx).toBe(50);
    expect(ellipse.left).toBe(50);
    expect(ellipse.right).toBe(150);
  });
});
