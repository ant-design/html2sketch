// import colorAsset from '../colorAsset';

describe('colorAsset', () => {
  beforeAll(() => {
    document.body.innerHTML = `
    <table>
      <tbody>
        <thead>
          <tr>
            <th class="table" >
              Header 1
              <span/>
            </th>
          </tr>
        </thead>
      </tbody>
    </table>
    <div id="text">文本对象</div>
    <div id="no-text"></div>
    `;
  });
  afterAll(() => {
    document.body.innerHTML = '';
  });

  it('RGB should work fine', function () {
    // const color = colorAsset()
  });
});
