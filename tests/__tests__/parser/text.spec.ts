import { parseToText, Text, Group, parseToGroup } from 'html2sketch';
import { readFileSync } from 'fs';

import { resolve } from 'path';

describe('parseToText', () => {
  beforeAll(() => {
    document.body.innerHTML = readFileSync(
      resolve(__dirname, './text.html'),
      'utf-8',
    );
  });
  it('文本正常解析', () => {
    const node = document.getElementById('text') as HTMLDivElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();

    expect(text.toSketchJSON().attributedString.string).toBe('123');
  });
  it('空文本不解析', () => {
    const node = document.createElement('div');

    const text = parseToText(node);
    expect(text).toBeUndefined();
  });
  it('span 文本+图标 文本解析正常', () => {
    const node = document.getElementById('span-text') as HTMLSpanElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(16);
  });
  it('div 文本+图标 文本解析正常', () => {
    const node = document.getElementById('div-text') as HTMLSpanElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(16);
  });
  it('ellipsis 文本解析正常', () => {
    const node = document.getElementById('ellipsis') as HTMLDivElement;

    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.x).toBe(8);
    expect(text.text.trim()).toBe('位全眼等越子亲作向下...');
  });
  it('align-right 文本解析正常', () => {
    const node = document.getElementById('align-right') as HTMLDivElement;
    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.right).toBe(190);
    expect(text.text.trim()).toBe('div align right');
  });
  it('span-align-right 文本解析正常', () => {
    const node = document.getElementById('span-align-right') as HTMLSpanElement;
    const text = parseToText(node) as Text;
    expect(text).toBeTruthy();
    expect(text.right).toBe(190);
    expect(text.text.trim()).toBe('span align right');
  });
  it('label 文本解析正常', () => {
    const node = document.getElementById('label') as HTMLLabelElement;
    const wrapper = document.getElementById(
      'label-wrapper',
    ) as HTMLLabelElement;
    const group = parseToGroup(wrapper);
    expect(group.height).toBe(32);

    const text = parseToText(node) as Text;

    expect(text.text).toBe('右侧有伪类标签');
    expect(text.right).toBeGreaterThan(295);
    expect(text.right).toBeLessThan(296);
    expect(text.centerY).toBe(group.centerY);
  });
  it('tag 文本解析正常', () => {
    const node = document.getElementById('tag') as HTMLLabelElement;
    const text = parseToText(node) as Text;
    expect(text.text).toBe('蓝色');
    expect(text.y).toBe(3);
  });
  // 单个 div 中包含多个文本对象
  it('row-text 文本解析正常', () => {
    const node = document.getElementById('row-text') as HTMLDivElement;
    const aNode = document.getElementById('row-text-a') as HTMLAnchorElement;
    const text = parseToText(node) as Text[];
    const aText = parseToText(aNode) as Text;
    expect(text.length).toBe(3);
    expect(text[1].left - text[0].right).toBe(aText.width);
  });

  it('multi-line 文本解析正常', () => {
    const node = document.getElementById('multi-line') as HTMLDivElement;

    const text = parseToText(node) as Text;
    expect(text.textStyle.lineHeight).not.toBe(text.height);
    expect(text.multiline).toBe(true);
  });

  it('strong 文本解析正常', () => {
    const node = document.getElementById('strong-span') as HTMLSpanElement;

    const text = parseToText(node) as Text[];
    expect(text).toHaveLength(2);
    const [first, last] = text;
    expect(first.text).toBe('共 ');
    expect(first.x).toBe(0);
    expect(first.height).toBe(31);
    expect(first.textStyle.fontSize).toBe(20);
    expect(first.textStyle.lineHeight?.toFixed(2)).toBe(
      (20 * 1.5715).toFixed(2),
    );

    expect(last.text).toBe(' 条');
    expect(last.x).toBeGreaterThan(30);
    expect(last.x).toBeLessThan(34);

    const strongNode = document.getElementById('strong') as HTMLSpanElement;
    const strongText = parseToText(strongNode) as Text;

    expect(strongText.x).toBeGreaterThan(15);
    expect(strongText.height).toBe(18);
    expect(strongText.text).toBe('2');
    expect(strongText.textStyle.fontSize).toBe(12);
  });

  describe('Flex 布局解析', () => {
    it('flex-align 文本解析正常', () => {
      const node = document.getElementById('flex-align') as HTMLDivElement;

      const text = parseToText(node) as Text;

      expect(text.x).toBe(0);
      expect(text.text.trim()).toBe('左边');

      // 右对齐节点

      const rightNode = document.getElementById('flex-right') as HTMLDivElement;
      const rightText = parseToText(rightNode) as Text;
      expect(rightText.right).toBe(300);

      // 居中对齐节点

      const centerNode = document.getElementById(
        'flex-center',
      ) as HTMLDivElement;
      const centerText = parseToText(centerNode) as Text;
      expect(centerText.centerX).toBe(150);

      const group = parseToGroup(node) as Group;
      expect(text.y).toBe(group.y);
    });

    const getTextAndGroup = (id: string) => {
      const node = document.getElementById(id) as HTMLDivElement;
      const text = parseToText(node) as Text;
      const group = parseToGroup(node);
      return { text, group };
    };
    describe('Row 解析正常', () => {
      it('row left top 解析正常', () => {
        const { group, text } = getTextAndGroup('row-left-top');
        expect(text.text.trim()).toBe('左上');
        expect(text.left).toEqual(group.left);
        expect(text.top).toEqual(group.top);
      });

      it('row center top 解析正常', () => {
        const { group, text } = getTextAndGroup('row-center-top');
        expect(text.text.trim()).toBe('中上');
        expect(text.centerX).toEqual(group.centerX);
        expect(text.top).toEqual(group.top);
      });

      it('row right top 解析正常', () => {
        const { group, text } = getTextAndGroup('row-right-top');
        expect(text.text.trim()).toBe('右上');
        expect(text.right).toEqual(group.right);
        expect(text.top).toEqual(group.top);
      });

      it('row left middle 解析正常', () => {
        const { group, text } = getTextAndGroup('row-left-middle');
        expect(text.text.trim()).toBe('左中');
        expect(text.left).toEqual(group.left);
        expect(text.centerY).toEqual(group.centerY);
      });

      it('row center middle 解析正常', () => {
        const { group, text } = getTextAndGroup('row-center-middle');
        expect(text.text.trim()).toBe('中中');
        expect(text.centerX).toEqual(group.centerX);
        expect(text.centerY).toEqual(group.centerY);
      });

      it('row right middle 解析正常', () => {
        const { group, text } = getTextAndGroup('row-right-middle');
        expect(text.text.trim()).toBe('右中');
        expect(text.right).toEqual(group.right);
        expect(text.centerY).toEqual(group.centerY);
      });

      it('row left bottom 解析正常', () => {
        const { group, text } = getTextAndGroup('row-left-bottom');
        expect(text.text.trim()).toBe('左下');
        expect(text.left).toEqual(group.left);
        expect(text.bottom).toEqual(group.bottom);
      });

      it('row center bottom 解析正常', () => {
        const { group, text } = getTextAndGroup('row-center-bottom');
        expect(text.text.trim()).toBe('中下');
        expect(text.centerX).toEqual(group.centerX);
        expect(text.bottom).toEqual(group.bottom);
      });

      it('row right bottom 解析正常', () => {
        const { group, text } = getTextAndGroup('row-right-bottom');
        expect(text.text.trim()).toBe('右下');
        expect(text.right).toEqual(group.right);
        expect(text.bottom).toEqual(group.bottom);
      });
    });

    describe('Column 解析正常', () => {
      it('column left top 解析正常', () => {
        const { group, text } = getTextAndGroup('column-left-top');
        expect(text.text.trim()).toBe('左上');
        expect(text.left).toEqual(group.left);
        expect(text.top).toEqual(group.top);
      });

      it('column center top 解析正常', () => {
        const { group, text } = getTextAndGroup('column-center-top');
        expect(text.text.trim()).toBe('中上');
        expect(text.centerX).toEqual(group.centerX);
        expect(text.top).toEqual(group.top);
      });

      it('column right top 解析正常', () => {
        const { group, text } = getTextAndGroup('column-right-top');
        expect(text.text.trim()).toBe('右上');
        expect(text.right).toEqual(group.right);
        expect(text.top).toEqual(group.top);
      });

      it('column left middle 解析正常', () => {
        const { group, text } = getTextAndGroup('column-left-middle');
        expect(text.text.trim()).toBe('左中');
        expect(text.left).toEqual(group.left);
        expect(text.centerY).toEqual(group.centerY);
      });

      it('column center middle 解析正常', () => {
        const { group, text } = getTextAndGroup('column-center-middle');
        expect(text.text.trim()).toBe('中中');
        expect(text.centerX).toEqual(group.centerX);
        expect(text.centerY).toEqual(group.centerY);
      });

      it('column right middle 解析正常', () => {
        const { group, text } = getTextAndGroup('column-right-middle');
        expect(text.text.trim()).toBe('右中');
        expect(text.right).toEqual(group.right);
        expect(text.centerY).toEqual(group.centerY);
      });

      it('column left bottom 解析正常', () => {
        const { group, text } = getTextAndGroup('column-left-bottom');
        expect(text.text.trim()).toBe('左下');
        expect(text.left).toEqual(group.left);
        expect(text.bottom).toEqual(group.bottom);
      });

      it('column center bottom 解析正常', () => {
        const { group, text } = getTextAndGroup('column-center-bottom');
        expect(text.text.trim()).toBe('中下');
        expect(text.centerX).toEqual(group.centerX);
        expect(text.bottom).toEqual(group.bottom);
      });

      it('column right bottom 解析正常', () => {
        const { group, text } = getTextAndGroup('column-right-bottom');
        expect(text.text.trim()).toBe('右下');
        expect(text.right).toEqual(group.right);
        expect(text.bottom).toEqual(group.bottom);
      });
    });
  });
});
