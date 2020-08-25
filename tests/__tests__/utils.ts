import { join, resolve } from 'path';
import puppeteer from 'puppeteer';
import SketchFormat from '@sketch-hq/sketch-file-format-ts';
import { writeFileSync } from 'fs';

interface Options {
  headless?: boolean;
  close?: boolean;
  noSandbox?: boolean;
  port?: number;
  baseUrl?: string;
}

export const initHtml2Sketch = async ({
  headless = true,
  close = true,
  noSandbox = true,
  port = 8000,
}: Options) => {
  const isLocal = process.env.LOCAL === '1';
  const httpURL = `http://localhost:${port}/case`;
  const fileURL = `file://${resolve(__dirname, '../dist')}/case`;
  const baseURL = isLocal ? httpURL : fileURL;

  const browser = await puppeteer.launch({
    headless,
    args: noSandbox ? ['--no-sandbox', '--disable-setuid-sandbox'] : undefined,
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 1000, deviceScaleFactor: 1 }); // 设置宽高
  return {
    nodeToSketchSymbol: async (
      url: string,
      selector: (dom: Document) => Element | Element[],
    ): Promise<SketchFormat.SymbolMaster> => {
      await page.goto(`${baseURL}${url}${isLocal ? '' : '.html'}`);

      try {
        await page.evaluate(`window.IS_TEST_ENV=true`);

        const sketchJSON = (await page.evaluate(
          `html2sketch.nodeToSketchSymbol(${selector}(document)).toSketchJSON()`,
        )) as SketchFormat.SymbolMaster;
        if (close) {
          await browser.close();
        }

        return sketchJSON;
      } catch (e) {
        if (close) {
          await browser.close();
        }
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
        if (close) {
          await browser.close();
        }

        return json;
      } catch (e) {
        if (close) {
          await browser.close();
        }
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

export const isUpdate = process.env.TEST_UPDATE === '1';
