import TextStyle, {
  TextHorizontalAlign,
  TextVerticalAlign,
} from '../TextStyle';

describe('TextStyle 类', function () {
  describe('parseTextHorizontalAlign', function () {
    it('display 为 block 时解析正确', function () {
      const leftStyle = {
        display: 'block',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextHorizontalAlign(leftStyle)).toBe(
        TextHorizontalAlign.Left,
      );

      const rightStyle = {
        display: 'block',
        textAlign: 'right',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextHorizontalAlign(rightStyle)).toBe(
        TextHorizontalAlign.Right,
      );

      const centerStyle = {
        display: 'block',
        textAlign: 'center',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextHorizontalAlign(centerStyle)).toBe(
        TextHorizontalAlign.Center,
      );
    });
    it('display 为 flex 时解析正确', function () {
      const leftStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'start',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextHorizontalAlign(leftStyle)).toBe(
        TextHorizontalAlign.Left,
      );

      const rightStyle = {
        display: 'flex',
        justifyContent: 'end',
      } as CSSStyleDeclaration;
      const rightStyle2 = {
        display: 'flex',
        justifyContent: 'right',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextHorizontalAlign(rightStyle)).toBe(
        TextHorizontalAlign.Right,
      );
      expect(TextStyle.parseTextHorizontalAlign(rightStyle2)).toBe(
        TextHorizontalAlign.Right,
      );

      const centerStyle = {
        display: 'flex',
        justifyContent: 'center',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextHorizontalAlign(centerStyle)).toBe(
        TextHorizontalAlign.Center,
      );

      const justifyStyle = {
        display: 'flex',
        justifyContent: 'space-between',
      } as CSSStyleDeclaration;

      const justifyStyle2 = {
        display: 'flex',
        justifyContent: 'space-around',
      } as CSSStyleDeclaration;

      expect(TextStyle.parseTextHorizontalAlign(justifyStyle)).toBe(
        TextHorizontalAlign.Justify,
      );
      expect(TextStyle.parseTextHorizontalAlign(justifyStyle2)).toBe(
        TextHorizontalAlign.Justify,
      );
    });
  });

  describe('parseTextVerticalAlign', function () {
    it('display 为 block 时解析正确', function () {
      const topStyle = {
        display: 'block',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(topStyle)).toBe(
        TextVerticalAlign.Top,
      );
    });
    it('display 为 flex 时解析正确', function () {
      const topStyle = {
        display: 'flex',
        flexDirection: 'row',
        // alignItems:
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(topStyle)).toBe(
        TextVerticalAlign.Top,
      );
      const topStyle2 = {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'end',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(topStyle2)).toBe(
        TextVerticalAlign.Top,
      );

      const centerStyle = {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'center',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(centerStyle)).toBe(
        TextVerticalAlign.Middle,
      );

      const bottomStyle = {
        display: 'flex',
        flexDirection: 'row-reverse',
        alignItems: 'start',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(bottomStyle)).toBe(
        TextVerticalAlign.Bottom,
      );
      const bottomStyle2 = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'end',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(bottomStyle2)).toBe(
        TextVerticalAlign.Bottom,
      );

      const bottomStyle3 = {
        display: 'flex',
        flexDirection: 'row-reverse',
      } as CSSStyleDeclaration;
      expect(TextStyle.parseTextVerticalAlign(bottomStyle3)).toBe(
        TextVerticalAlign.Bottom,
      );
    });
  });

  describe('toSketchJSON', function () {
    it('正常解析', function () {
      const textStyle = new TextStyle();

      expect(textStyle.toSketchJSON()).toMatchSnapshot();
    });
  });
});
