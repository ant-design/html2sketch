import { join, resolve } from 'path';
import puppeteer from 'puppeteer';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { writeFileSync } from 'fs';
import { NodeToSketchSymbolOptions, SymbolMaster } from 'html2sketch';

export type HandleSymbolFn = (symbol: SymbolMaster) => void;

interface Options {
  showWindows?: boolean;
  close?: boolean;
  noSandbox?: boolean;
  port?: number;
  debug?: boolean;
}

/**
 * 初始化解析方法
 * @param options
 */
export const initHtml2Sketch = async (
  {
    close = true,
    showWindows = false,
    port = 8000,
    noSandbox = true,
    debug = false,
  }: Options = {
    showWindows: false,
    close: true,
    noSandbox: true,
    port: 8000,
    debug: false,
  },
) => {
  const isOnline = process.env.ONLINE === '1';
  const httpURL = `http://localhost:${port}/case`;
  const fileURL = `file://${resolve(__dirname, '../dist')}/case`;
  const baseURL = isOnline ? fileURL : httpURL;

  const browser = await puppeteer.launch({
    headless: debug ? false : !showWindows,
    args: noSandbox ? ['--no-sandbox', '--disable-setuid-sandbox'] : undefined,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1000, deviceScaleFactor: 1 }); // 设置宽高

  const closeFn = async () => {
    // 如果没有 debug 的话
    if (!debug && close) {
      await browser.close();
    }
  };

  return {
    nodeToSketchSymbol: async (
      url: string,
      selector: (dom: Document) => Element | Element[],
      options?: NodeToSketchSymbolOptions,
    ): Promise<SketchFormat.SymbolMaster> => {
      await page.goto(`${baseURL}${url}${isOnline ? '.html' : ''}`);

      try {
        await page.evaluate(`window.IS_TEST_ENV=true`);

        const symbolOptionsArr = [];
        if (options) {
          if (options.handleSymbol) {
            symbolOptionsArr.push(`handleSymbol:${options.handleSymbol}`);
          }
          if (options.layerParams) {
            symbolOptionsArr.push(
              `layerParams:${JSON.stringify(options.layerParams)}`,
            );
          }
          if (options.symbolLayout) {
            symbolOptionsArr.push(`symbolLayout:${options.symbolLayout}`);
          }
        }
        const symbolOptions =
          symbolOptionsArr.length === 0
            ? ''
            : `,{${symbolOptionsArr.join(',')}}`;

        const sketchJSON = (await page.evaluate(
          `html2sketch.nodeToSketchSymbol(${selector}(document)${symbolOptions}).toSketchJSON()`,
        )) as SketchFormat.SymbolMaster;

        await closeFn();

        return sketchJSON;
      } catch (e) {
        await closeFn();
        throw e;
      }
    },
    nodeToGroup: async (
      url: string,
      selector: (dom: Document) => Element | Element[],
    ) => {
      await page.goto(baseURL + url);
      await page.addScriptTag({
        path: resolve(__dirname, './dist/html2sketch.js'),
      });

      try {
        const json = await page.evaluate(
          `html2sketch.nodeToGroup(${selector}(document))`,
        );
        await closeFn();

        return json;
      } catch (e) {
        await closeFn();
        throw e;
      }
    },
  };
};

/**
 * 打印出 JSON 数据到路径中
 *
 * 如果出现不一致了,可以重新输出 JSON 对象
 * 类似 Enzyme 的快照功能
 *
 * @param json
 * @param name
 */
export const outputJSONData = (
  json:
    | SketchFormat.Group
    | SketchFormat.ShapeGroup
    | SketchFormat.SymbolMaster,
  name: string,
) => {
  writeFileSync(join(__dirname, `./json/${name}.json`), JSON.stringify(json));
};

export const isUpdate = process.env.UPDATE === '1';
