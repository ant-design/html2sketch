import { parsePseudoToText, Text } from 'html2sketch';

describe('parseToShape', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
  .before:before{
        content: 'before';
  }
  .after:after{
        content: 'after';
  }
  .mix:after{
        content: 'mix-after';
  }
  .mix:before{
        content: 'mix-before';
  }
  .opacity:before {
    content: '1';
    opacity: 0;
  }
  .none-text:before{
    content: 'none';
  }
  .text:before{
    content: '';
  }
  .empty-text:before{
    content: '   ';
  }
</style>
    `;
    document.body.innerHTML = `
      <div>
          <div id="normal-text"></div>
          <div id="before" class="before"></div>
          <div id="after" class="after"></div>
          <div id="mix" class="mix"></div>
          <div id="opacity" class="opacity"></div>
          <div id="none" class="none-text"></div>
          <div id="text" class="text"></div>
          <div id="empty-text" class="empty-text"></div>
      </div>
`;
  });

  it('before 解析成文本', () => {
    const node = document.getElementById('before') as HTMLDivElement;
    const text = parsePseudoToText(node, 'before') as Text;

    const textJSON = text.toSketchJSON();

    expect(textJSON._class).toBe('text');
    expect(textJSON.attributedString.string).toBe('before');
  });
  it('after 解析成文本', () => {
    const node = document.getElementById('after') as HTMLDivElement;
    const text = parsePseudoToText(node, 'after') as Text;

    const textJSON = text.toSketchJSON();

    expect(textJSON._class).toBe('text');
    expect(textJSON.attributedString.string).toBe('after');
  });
  it('mix 解析成文本', () => {
    const node = document.getElementById('mix') as HTMLDivElement;
    const mixBefore = parsePseudoToText(node, 'before') as Text;
    const mixAfter = parsePseudoToText(node, 'after') as Text;
    const beforeJSON = mixBefore.toSketchJSON();
    const afterJSON = mixAfter.toSketchJSON();

    expect(beforeJSON._class).toBe('text');
    expect(beforeJSON.attributedString.string).toBe('mix-before');
    expect(afterJSON._class).toBe('text');
    expect(afterJSON.attributedString.string).toBe('mix-after');
  });
});
