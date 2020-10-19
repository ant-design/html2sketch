import { Svg } from 'html2sketch';
import {
  isUpdate,
  outputJSONData,
  svgPath,
  dropboxSvgPath,
  behanceSvg,
  upCircleSvg,
  plusSvg,
  antdJSON,
  upCircleJSON,
  plusJSON,
} from '@test-utils';

describe('Svg 类', () => {
  describe('toSketchJSON', () => {
    describe('单条 path', () => {
      it('svgPath 复合对象转换正常', () => {
        const svg = new Svg({
          svgString: svgPath.svgString,
          height: 814.2161138351328,
          width: 736.652344,
          x: -90,
          y: 4,
        });
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'svg-path');
        }
        expect(svg.toSketchJSON()).toStrictEqual(svgPath.sketchJSON);
      });
      it('dropbox 转换正常', () => {
        const svg = new Svg({
          height: 100,
          width: 100,
          x: 520,
          y: 349,
          svgString: dropboxSvgPath.svgString,
        });
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'dropbox');
        }
        expect(svg.toSketchJSON()).toStrictEqual(dropboxSvgPath.sketchJSON);
      });
      it('behance 转换正常', () => {
        const svg = new Svg({
          height: 56.01562500000003,
          width: 89.22991071428572,
          x: 123,
          y: 18.01116071428572,
          svgString: behanceSvg.svgString,
        });
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'behance');
        }
        expect(svg.toSketchJSON()).toStrictEqual(behanceSvg.sketchJSON);
      });
    });

    describe('多条 path', () => {
      it('plusSvg 转换正常', () => {
        const svg = new Svg({
          height: 25,
          width: 24,
          x: 164,
          y: 22,
          svgString: plusSvg.svgString,
        });
        // 如果出现小数点的不一致 进行重新输出
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'plus');
        }
        expect(svg.toSketchJSON()).toStrictEqual(plusJSON);
      });

      it('多条路径 up-circle 转换正常', () => {
        const svg = new Svg({
          svgString: upCircleSvg.svgString,
          height: 300,
          width: 300,
          x: 25,
          y: -102,
        });
        // expect(svg.toSketchJSON()).toMatchSnapshot();
        // 如果出现小数点的不一致 进行重新输出
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'up-circle');
        }
        expect(svg.toSketchJSON()).toStrictEqual(upCircleJSON);
      });
    });

    describe('解析复杂插画', () => {
      it('antd 可正常解析', () => {
        const svgString = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<defs>
  <linearGradient id="a" x1="62.102%" x2="108.197%" y1="0%" y2="37.864%"><stop offset="0%" stop-color="#4285EB"/><stop offset="100%" stop-color="#2EC7FF"/></linearGradient>
  <linearGradient id="b" x1="69.644%" x2="54.043%" y1="0%" y2="108.457%"><stop offset="0%" stop-color="#29CDFF"/><stop offset="37.86%" stop-color="#148EFF"/><stop offset="100%" stop-color="#0A60FF"/></linearGradient>
  <linearGradient id="c" x1="69.691%" x2="16.723%" y1="-12.974%" y2="117.391%"><stop offset="0%" stop-color="#FA816E"/><stop offset="41.473%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient>
  <linearGradient id="d" x1="68.128%" x2="30.44%" y1="-35.691%" y2="114.943%"><stop offset="0%" stop-color="#FA8E7D"/><stop offset="51.264%" stop-color="#F74A5C"/><stop offset="100%" stop-color="#F51D2C"/></linearGradient>
</defs>
<g fill="none" fill-rule="evenodd">
  <g fill-rule="nonzero">
    <path fill="url(#a)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c1.17-1.169 2.944-1.169 4.114 0l27.783 27.76c4.209 4.205 11.032 4.205 15.24 0 4.209-4.205 4.209-11.022 0-15.227L108.581 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/>
    <path fill="url(#b)" d="M91.588 4.177L4.18 91.513a11.981 11.981 0 000 16.974l87.408 87.336a12.005 12.005 0 0016.989 0l36.648-36.618c4.209-4.205 4.209-11.023 0-15.228-4.208-4.205-11.031-4.205-15.24 0l-27.783 27.76c-1.17 1.169-2.945 1.169-4.114 0l-69.802-69.744c-1.17-1.169-1.17-2.942 0-4.11l69.802-69.745c2.912-2.51 7.664-7.596 14.642-8.786 5.186-.883 10.855 1.062 17.009 5.837L108.58 4.056c-4.719-4.594-12.312-4.557-16.993.12z"/>
    <path fill="url(#c)" d="M153.686 135.855c4.208 4.205 11.031 4.205 15.24 0l27.034-27.012c4.7-4.696 4.7-12.28 0-16.974l-27.27-27.15c-4.218-4.2-11.043-4.195-15.254.013-4.209 4.205-4.209 11.022 0 15.227l18.418 18.403c1.17 1.169 1.17 2.943 0 4.111l-18.168 18.154c-4.209 4.205-4.209 11.023 0 15.228z"/>
  </g>
  <ellipse cx="100.519" cy="100.437" fill="url(#d)" rx="23.6" ry="23.581"/>
</g>
</svg>
`;
        const svg = new Svg({
          height: 100,
          width: 100,
          x: 0,
          y: 0,
          svgString,
        });

        expect(svg.layers.length).toBe(2);

        const [container, group] = svg.layers;
        expect(container.width).toBe(100);
        expect(container.height).toBe(100);
        expect(container.x).toBe(0);
        expect(container.y).toBe(0);
        expect(group.class).toBe('group');
        expect(group.layers).toHaveLength(2);

        const [subGroup, ellipse] = group.layers;
        expect(subGroup.layers).toHaveLength(3);
        expect(ellipse.class).toBe('ellipse');
        if (isUpdate) {
          // 如果出现小数点的不一致 进行重新输出
          outputJSONData(svg.toSketchJSON(), 'antd');
        }
        expect(svg.toSketchJSON()).toStrictEqual(antdJSON);
      });
    });
  });
});
