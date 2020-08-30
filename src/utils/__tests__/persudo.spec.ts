import { isExistPseudoShape, isExistPseudoText } from '../pseudo';

describe('isExistPseudoShape', () => {
  beforeAll(() => {
    document.head.innerHTML = `
<style>
  .before:before{
      content: '';
      background: red;
      display: block;
      position: absolute;
      left: 0;
      width: 100px;
      height: 100px;
  }
  .after:after{
      content: '';
      background: green;
      display: block;
      position: absolute;
      right: 0;
      width: 50px;
      height: 50px;
  }
  .mix:before{
      content: '';
      background: aquamarine;
      display: block;
      position: absolute;
      left: 0;
      width: 100px;
      height: 100px;
  }
  .mix:after{
      content: '';
      background: blue;
      display: block;
      position: absolute;
      left: 100px;
      width: 100px;
      height: 100px;
  }
</style>
    `;
    document.body.innerHTML = `
<div>
    <div id="normal"></div>
    <div id="text" class="text"></div>
    <div id="before" class="before"></div>
    <div id="after" class="after"></div>
    <div id="mix" class="mix" />
</div>
`;
  });

  it('normal 不存在伪类', () => {
    const node = document.getElementById('normal') as HTMLDivElement;
    const normal = isExistPseudoShape(node);
    expect(normal.exist).toBeFalsy();
    expect(normal.after).toBeFalsy();
    expect(normal.before).toBeFalsy();
  });

  it('before 存在 before 伪类', () => {
    const node = document.getElementById('before') as HTMLDivElement;
    const before = isExistPseudoShape(node);
    expect(before.exist).toBeTruthy();
    expect(before.before).toBeTruthy();
    expect(before.after).toBeFalsy();
  });
  it('after 存在 after 伪类', () => {
    const node = document.getElementById('after') as HTMLDivElement;
    const hasPseudoType = isExistPseudoShape(node);
    expect(hasPseudoType.exist).toBeTruthy();
    expect(hasPseudoType.before).toBeFalsy();
    expect(hasPseudoType.after).toBeTruthy();
  });
  it('mix 存在 after 和 before 伪类', () => {
    const node = document.getElementById('mix') as HTMLDivElement;
    const hasPseudoType = isExistPseudoShape(node);
    expect(hasPseudoType.exist).toBeTruthy();
    expect(hasPseudoType.before).toBeTruthy();
    expect(hasPseudoType.after).toBeTruthy();
  });
});

describe('isExistPseudoText', () => {
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
      </div>
`;
  });

  it('normal 不存在 before 文本伪类', () => {
    const node = document.getElementById('normal-text') as HTMLDivElement;

    const hasPseudoType = isExistPseudoText(node);

    expect(hasPseudoType.exist).toBeFalsy();
    expect(hasPseudoType.before).toBeFalsy();
    expect(hasPseudoType.after).toBeFalsy();
  });
  it('before 节点存在 before 伪类', () => {
    const node = document.getElementById('before') as HTMLDivElement;

    const before = isExistPseudoText(node);

    expect(before.exist).toBeTruthy();
    expect(before.before).toBeTruthy();
    expect(before.after).toBeFalsy();
  });
  it('after 节点存在 after 伪类', () => {
    const node = document.getElementById('after') as HTMLDivElement;

    const after = isExistPseudoText(node);

    expect(after.exist).toBeTruthy();
    expect(after.after).toBeTruthy();
    expect(after.before).toBeFalsy();
  });
  it('mix 节点同时存在 before 和 after 伪类', () => {
    const node = document.getElementById('mix') as HTMLDivElement;
    const mix = isExistPseudoText(node);
    expect(mix.exist).toBeTruthy();
    expect(mix.after).toBeTruthy();
    expect(mix.before).toBeTruthy();
  });
  it('opacity 节点不存在伪类', () => {
    const node = document.getElementById('opacity') as HTMLDivElement;

    const before = isExistPseudoText(node);

    expect(before.exist).toBeFalsy();
    expect(before.before).toBeFalsy();
    expect(before.after).toBeFalsy();
  });
  it('none 节点存在 before 伪类', () => {
    const node = document.getElementById('none') as HTMLDivElement;

    const none = isExistPseudoText(node);

    expect(none.exist).toBeTruthy();
    expect(none.before).toBeTruthy();
    expect(none.after).toBeFalsy();
  });
});
