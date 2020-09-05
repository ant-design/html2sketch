import Image from '../Image';

describe('Image 类', () => {
  it('默认创建', () => {
    const image = new Image('');
    expect(image.url).toBe('');
  });
});
