import { parseToSvg } from 'html2sketch';
import {
  antdParserJSON,
  isUpdate,
  outputJSONData,
  setupTestNode,
  basicParserJSON,
  upCircleParserJSON,
} from '@test-utils';

describe('parseToSvg', () => {
  beforeAll(() => {
    const innerHTML = `
<svg id="svg" viewBox="64 64 736.652344 814.2161138351329" focusable="false" class="" width="300px" height="300px" fill="#aaa" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M73.2226562,282.36788 C517.988281,268.985067 740.371094,312.330119 740.371094,412.403036 C740.371094,562.512411 706.574547,689.414193 665.761719,731.926473 C585.929687,815.082723 381.128906,824.973348 240.128906,815.082723 C193.160156,721.491578 114.450521,640.427775 4,571.891317 L73.2226562,282.36788 Z M288.371094,399.757812 L569.023438,399.757812 L569.023438,629.085937 L288.371094,629.085937 L288.371094,399.757812 Z M460,4 L640.652344,4 C695.880819,4 740.652344,48.771525 740.652344,104 L740.652344,233.328125 L460,233.328125 L460,4 Z M68,4 L248.652344,4 C303.880819,4 348.652344,48.771525 348.652344,104 L348.652344,233.328125 L68,233.328125"></path></svg>
<svg id="up-circle" width="300px" height="300px"  fill="currentColor" aria-hidden="true" data-icon="up-circle" viewBox="64 64 896 896"><path fill="rgba(0,0,0,.85)" d="M518.5 360.3a7.95 7.95 0 00-12.9 0l-178 246c-3.8 5.3 0 12.7 6.5 12.7H381c10.2 0 19.9-4.9 25.9-13.2L512 460.4l105.2 145.4c6 8.3 15.6 13.2 25.9 13.2H690c6.5 0 10.3-7.4 6.5-12.7l-178-246z" color="rgba(0,0,0,.85)" font-variant="tabular-nums" text-decoration="none solid rgba(0,0,0,.85)" text-rendering="optimizelegibility"/><path fill="rgba(0,0,0,.85)" d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" color="rgba(0,0,0,.85)" font-variant="tabular-nums" text-decoration="none solid rgba(0,0,0,.85)" text-rendering="optimizelegibility"/></svg>
<svg id="antd" width="300px" height="300px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><defs><linearGradient id="a" x1="62.102%" x2="108.197%" y1="0%" y2="37.864%"><stop offset="0%" stop-color="#4285EB"/><stop offset="100%" stop-color="#2EC7FF"/></linearGradient><linearGradient id="b" x1="69.644%" x2="54.043%" y1="0%" y2="108.457%"><stop offset="0%" stop-color="#29CDFF"/><stop offset="37.86%" stop-color="#148EFF"/><stop offset="100%" stop-color="#0A60FF"/></linearGradient><linearGradient id="c" x1="69.691%" x2="16.723%" y1="-12.974%" y2="117.391%"><stop offset="0%" stop-color="#FA816E"/><stop offset="41.473%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient><linearGradient id="d" x1="68.128%" x2="30.44%" y1="-35.691%" y2="114.943%"><stop offset="0%" stop-color="#FA8E7D"/><stop offset="51.264%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient></defs><g fill="none" fill-rule="evenodd"><g fill-rule="nonzero"><path fill="url(#a)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0 4.209-4.205 4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/><path fill="url(#b)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786 5.186-.883 10.855 1.062 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/><path fill="url(#c)" d="M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228z"/></g><ellipse cx="100.519" cy="100.437" fill="url(#d)" rx="23.6" ry="23.581"/></g></svg>
`;
    setupTestNode(innerHTML);
  });
  describe('icon 类型', () => {
    it('basic 图形正常解析', async () => {
      const node = document.getElementById('svg');

      const svg = await parseToSvg((node as unknown) as SVGElement);
      expect(svg).toBeTruthy();
      // expect(svg.toSketchJSON()).toMatchSnapshot();
      if (isUpdate) {
        // 如果出现小数点的不一致 进行重新输出
        outputJSONData(svg.toSketchJSON(), 'parser/basic');
      }

      expect(svg.toSketchJSON()).toStrictEqual(basicParserJSON);
    });
    it('up-circle 图形正常解析', async () => {
      const node = document.getElementById('up-circle');

      const svg = await parseToSvg((node as unknown) as SVGElement);
      expect(svg).toBeTruthy();
      // expect(svg.toSketchJSON()).toMatchSnapshot();
      const json = svg.toSketchJSON();
      if (isUpdate) {
        // 如果出现小数点的不一致 进行重新输出
        outputJSONData(json, 'parser/up-circle');
      }

      const { frame, ...originJSON } = json;
      const { frame: ff, ...targetJSON } = upCircleParserJSON;
      expect(originJSON).toStrictEqual(targetJSON);
    });
  });

  describe('插画类型', () => {
    it('antd 图形正常解析', async () => {
      const node = (document.getElementById('antd') as unknown) as SVGElement;

      const svg = await parseToSvg(node);
      expect(svg).toBeTruthy();
      const json = svg.toSketchJSON();

      if (isUpdate) {
        // 如果出现小数点的不一致 进行重新输出
        outputJSONData(json, 'parser/antd');
      }

      expect(json).toStrictEqual(antdParserJSON);
    });
  });
});
