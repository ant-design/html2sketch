import { isNodeVisible, isTextVisible } from 'html2sketch/utils/visibility';

describe('isNodeVisible', () => {
  describe('正确识别可见节点', () => {
    afterAll(() => {
      document.body.innerHTML = '';
    });
    beforeAll(() => {
      document.body.innerHTML = `
       <p class='check-me'>text</p>
    <div style='position: absolute'>
      <p class='check-me' />
    </div>
    <div class='check-me' style='width: 0'>text</div>
    <div class='check-me' style='opacity: 0.1'>text</div>
      `;
    });
    it('正确识别可见节点', () => {
      const nodesToCheck = Array.from(document.querySelectorAll('.check-me'));
      const invisibleNodes = nodesToCheck.filter((n) => !isNodeVisible(n));

      expect(invisibleNodes).toEqual([]);
    });
  });

  describe('正确识别不可见节点', () => {
    afterAll(() => {
      document.body.innerHTML = '';
    });
    beforeAll(() => {
      document.head.innerHTML = `
        <style>
    .one {
      display: none;
    }
    .two {
      width: 0;
      height: 0;
      /* jsdom doesn't translate overflow:hidden to overflowX:hidden and overflowY:hidden */
      overflowX: hidden;
      overflowY: hidden;
    }
    .three {opacity: 0}
    .four {visibility: hidden}
    .five {
      clip: rect(0px, 0px, 0px, 0px);
      position: absolute;
    }
    .six {visibility: collapse}
  </style>
`;
      document.body.innerHTML = `
       <p class='one check-me'>text</p>
    <div class='two check-me'>text</div>
    <div class='three check-me'>text</div>
    <div class='four check-me'><div class='check-me'></div></div>
    <div class='five check-me'></div>
    <div class='six check-me'></div>
    <div class='remove-me check-me'></div>
      `;
    });
    xit('正确识别不可见节点', () => {
      const nodesToCheck = Array.from(document.querySelectorAll('.check-me'));
      // detach node .remove-me
      document.body.removeChild(document.querySelector('.remove-me')!);

      const visibleNodes = nodesToCheck.filter((n) => isNodeVisible(n));
      expect(visibleNodes).toEqual([]);
    });
  });
});

describe('isTextVisible', () => {
  afterAll(() => {
    document.body.innerHTML = '';
  });
  beforeAll(() => {
    document.head.innerHTML = `
    <style>
      .one {
        overflowX: hidden;
        overflowY: hidden;
        text-indent: -99999px;
      }
    </style>
`;
    document.body.innerHTML = `
          <p class='one check-me'>text</p>
      `;
  });

  xit('正确识别不可见文本', () => {
    const nodesToCheck = Array.from(document.querySelectorAll('.check-me'));
    const visibleText = nodesToCheck.filter((n) =>
      isTextVisible(getComputedStyle(n)),
    );

    expect(visibleText).toEqual([]);
  });
});
