import { writeFileSync } from 'fs';
import { join } from 'path';

import defaultModalJSON from './json/default-modal.json';
import radioJSON from './json/radio.json';

import svgButtonJSON from './json/svg-button.json';
import svgIconJSON from './json/svg-icon.json';

export { radioJSON, svgButtonJSON, svgIconJSON, defaultModalJSON };

declare global {
  interface Window {
    loadAntdCSS: boolean;
  }
}

export const saveJSONData = (json: any | any[], name?: string) => {
  writeFileSync(join(__dirname, `./json/${name || 'json'}.json`), JSON.stringify(json));
};

export const sleep = (time: number) =>
  new Promise((r) => {
    setTimeout(r, time);
  });

const loadcss = (src: string) =>
  new Promise((resolve) => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = src;

    document.head.insertBefore(linkElement, document.head.firstChild);

    function poll(node: HTMLLinkElement, callback: { (): void; (arg0: null, arg1: any): void }) {
      let isLoaded = false;

      //webkit
      if (/webkit/i.test(navigator.userAgent)) {
        if (node['sheet']) {
          isLoaded = true;
        }
      }

      if (isLoaded) {
        setTimeout(function () {
          callback(null, node);
        }, 1);
      } else {
        setTimeout(function () {
          poll(node, callback);
        }, 10);
      }
    }
    //other browser
    setTimeout(function () {
      poll(linkElement, () => {
        resolve(true);
      });
    }, 5);

    linkElement.onload = () => {
      resolve(true);
    };
  });

export const setupAntdTestEnv = async () => {
  // 1. 插入 antd 样式
  await loadcss('https://unpkg.com/antd@5/dist/reset.css');

  return new Promise<void>((resolve) => {
    const baseJSFile = [
      'https://unpkg.com/react@18/umd/react.development.js',
      'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
      'https://unpkg.com/antd@5/dist/antd.min.js',
      'https://unpkg.com/@babel/standalone@7/babel.min.js',
    ];

    // 2. 插入 react 等基础 js 环境
    baseJSFile.forEach((src) => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = src;

      document.head.prepend(script);
    });

    // 3. 创建 dom 容器
    const node = document.createElement('div');

    node.id = 'container';

    document.body.prepend(node);

    resolve();
  });
};
