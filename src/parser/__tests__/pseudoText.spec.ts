import { isUpdate, outputJSONData, pseudoTextJSON } from '@test-utils';
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

  it('text 解析成文本', () => {
    const node = document.getElementById('text') as HTMLDivElement;
    const text = parsePseudoToText(node, 'before') as Text;

    const textLayer = text.toSketchJSON();
    if (isUpdate) {
      outputJSONData(textLayer, 'pseudo-text');
    }
    expect(textLayer).toStrictEqual(pseudoTextJSON);
  });
});
