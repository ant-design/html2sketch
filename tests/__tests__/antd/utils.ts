import { writeFileSync } from 'fs';
import { join } from 'path';

import defaultModalJSON from './json/default-modal.json';
import radioJSON from './json/radio.json';

import svgButtonJSON from './json/svg-button.json';
import svgIconJSON from './json/svg-icon.json';

export { radioJSON, svgButtonJSON, svgIconJSON, defaultModalJSON };

export const saveJSONData = (json: any | any[], name?: string) => {
  writeFileSync(
    join(__dirname, `./json/${name || 'json'}.json`),
    JSON.stringify(json),
  );
};

export const sleep = (time: number) => new Promise((r) => setTimeout(r, time));

const loadcss = (src: string, fn: () => void) => {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href = src;

  document.head.insertBefore(linkElement, document.head.firstChild);

  //other browser
  setTimeout(function () {
    poll(linkElement, fn);
  }, 0);

  function poll(
    node: HTMLLinkElement,
    callback: { (): void; (arg0: null, arg1: any): void },
  ) {
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

  linkElement.onload = fn;
};

declare global {
  interface Window {
    loadAntdCSS: boolean;
  }
}

export const setupAntdTestEnv = () =>
  new Promise<void>((res) => {
    // 1. 插入 antd 样式
    loadcss('https://unpkg.com/antd@4/dist/antd.min.css', () => res());

    const baseJSFile = [
      'https://unpkg.com/react@17.0.2/umd/react.development.js',
      'https://unpkg.com/react-dom@17.0.2/umd/react-dom.development.js',
      'https://unpkg.com/antd@4/dist/antd.min.js',
      'https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js',
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
  });
