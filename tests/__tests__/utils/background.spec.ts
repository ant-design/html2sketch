import { BackgroundImageType } from 'html2sketch';
import {
  getActualImageSize,
  parseBackgroundImage,
  parseLinearGradient,
} from 'html2sketch/utils/background';

describe('getActualImageSize', () => {
  test('background-size: contain', () => {
    const bgSize = 'contain';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 100,
      height: 50,
    });
  });

  test('background-size: cover', () => {
    const bgSize = 'cover';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 200,
      height: 100,
    });
  });

  test('background-size: Xpx', () => {
    const bgSize = '100px';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 100,
      height: 50,
    });
  });

  test('background-size: Xpx Xpx', () => {
    const bgSize = '100px 200px';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 100,
      height: 200,
    });
  });

  test('background-size: X% X%', () => {
    const bgSize = '50% 25%';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 50,
      height: 25,
    });
  });

  test('background-size: X% auto', () => {
    const bgSize = '50% auto';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 50,
      height: 25,
    });
  });

  test('background-size: auto Xpx', () => {
    const bgSize = 'auto 100px';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 200,
      height: 100,
    });
  });

  test('background-size: auto', () => {
    const bgSize = 'auto';

    const imgSize = {
      width: 400,
      height: 200,
    };

    const containerSize = {
      width: 100,
      height: 100,
    };

    expect(getActualImageSize(bgSize, imgSize, containerSize)).toEqual({
      width: 400,
      height: 200,
    });
  });
});

describe('parseBackgroundImage', () => {
  describe('渐变', () => {
    it('解析三种颜色', () => {
      const str = 'linear-gradient(red, yellow, blue)';
      const result = parseBackgroundImage(str) as BackgroundImageType;
      expect(result.type).toStrictEqual('LinearGradient');
    });
  });
});

describe('parseLinearGradient', () => {
  it('解析两种颜色', () => {
    const str = 'red, yellow';
    const result = parseLinearGradient(str);
    expect(result).toStrictEqual({
      stops: ['red', 'yellow'],
      angle: '180deg',
    });
  });
  it('解析 to 类型的方向', () => {
    const str = 'to right, rgba(255,0,0,0), rgba(255,0,0,1)';
    const result = parseLinearGradient(str);
    expect(result).toStrictEqual({
      stops: ['rgba(255,0,0,0)', 'rgba(255,0,0,1)'],
      angle: 'to right',
    });
  });
  it('解析deg 类型的方向', () => {
    const str = '90deg, red, blue';
    const result = parseLinearGradient(str);
    expect(result).toStrictEqual({
      stops: ['red', 'blue'],
      angle: '90deg',
    });
  });
  it('解析三种颜色', () => {
    const str = 'red, yellow, blue';
    const result = parseLinearGradient(str);
    expect(result).toStrictEqual({
      stops: ['red', 'yellow', 'blue'],
      angle: '180deg',
    });
  });

  it('解析多种颜色', () => {
    const str = 'to left,red, yellow, blue,green';
    const result = parseLinearGradient(str);
    expect(result).toStrictEqual({
      stops: ['red', 'yellow', 'blue', 'green'],
      angle: 'to left',
    });
  });
});
