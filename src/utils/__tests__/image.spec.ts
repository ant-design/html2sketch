import { JSDOM } from 'jsdom';
import { getImageBase64URL } from '../image';

describe('getImageBase64URL', () => {
  xit('should ', () => {
    const dom = new JSDOM(
      `<img id='img' alt="Ant Design" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />`,
    );
    const { document } = dom.window;

    const img = document.getElementById('img') as HTMLImageElement;
    const base64URL = getImageBase64URL(img);
    expect(base64URL).toBe('123');
  });
});
