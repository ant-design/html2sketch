import { isDefaultStyles } from 'html2sketch/utils/style';

describe('isDefaultStyles', () => {
  it('是默认样式', () => {
    const styles = {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      backgroundImage: 'none',
      borderWidth: '0px',
      boxShadow: 'none',
      overflow: 'visible',
    } as CSSStyleDeclaration;

    expect(isDefaultStyles(styles)).toBeTruthy();
  });
});
