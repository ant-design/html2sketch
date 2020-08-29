import { getBase64ImageString } from '../url';

describe('getBase64ImageString', () => {
  it('不符合 Base64 则返回空', () => {
    const url = 'str';
    expect(getBase64ImageString(url)).toBeUndefined();
  });
  it('符合 Base64 则返回可用的Base64 值', () => {
    const url =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==';

    expect(getBase64ImageString(url)).toBe(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mM8w8DwHwAEOQHNmnaaOAAAAABJRU5ErkJggg==',
    );
  });
});
