<p align="center">
  <a href="https://github.com/ant-design/html2sketch">
   <img src="https://gw.alipayobjects.com/zos/antfincdn/Q0VnKtVzuB/Logo.png" height="200" width="200" alt="html2sketch"/>
  </a>
</p>

<h1 align="center"><a href="https://ant-design.github.io/html2sketch/">html2sketch</a></h1>

<div align="center">

[![NPM version][npm-image]][npm-url] [![NPM version][npm-next-image]][npm-url] [![NPM downloads][download-image]][download-url] [![install size][npm-size]][npm-size-url]

[![Test CI status][test-ci]][test-ci-url] ![Deploy CI][deploy-ci] [![Coverage][coverage]][codecov-url]

[![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/html2sketch.svg?style=flat-square&color=deepgreen&label=latest
[npm-next-image]: https://img.shields.io/npm/v/html2sketch/next?label=next&style=flat-square
[npm-url]: http://npmjs.org/package/html2sketch
[npm-size]: https://img.shields.io/bundlephobia/minzip/html2sketch?color=deepgreen&label=gizpped%20size&style=flat-square
[npm-size-url]: https://packagephobia.com/result?p=html2sketch

<!-- coverage -->

[coverage]: https://codecov.io/gh/ant-design/html2sketch/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ant-design/html2sketch/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/ant-design/html2sketch/workflows/Test%20CI/badge.svg
[deploy-ci]: https://github.com/ant-design/html2sketch/workflows/Deploy%20CI/badge.svg
[test-ci-url]: https://github.com/ant-design/html2sketch/actions?query=workflow%3ATest%20CI
[deploy-ci-ci]: https://github.com/ant-design/html2sketch/actions?query=workflow%3ADeploy%20CI
[david-image]: https://img.shields.io/david/ant-design/html2sketch?style=flat-square
[david-dev-url]: https://david-dm.org/ant-design/html2sketch?type=dev
[david-dev-image]: https://img.shields.io/david/dev/ant-design/html2sketch?style=flat-square
[david-url]: https://david-dm.org/ant-design/html2sketch
[download-image]: https://img.shields.io/npm/dm/html2sketch.svg?style=flat-square
[download-url]: https://npmjs.org/package/html2sketch

</div>

## 简介

一个将网页转 sketch 的模块

## 快速上手

### 安装

```bash
npm i html2sketch --save
// or
yarn add html2sketch
```

### 使用

html2sketch 包含 2 个主要方法 `nodeToGroup` 和 `nodeToSketchSymbol` 。

#### nodeToGroup

将 html 节点转 Group 对象

```js
import { nodeToGroup } from 'html2sketch';

const fn = async () => {
  // 1. 获取 Dom 节点
  const node = document.getElementById('id');

  // 2. 调用转换方法
  const group = await nodeToGroup(node);

  // 3. 生成为 Sketch JSON
  const sketchJSON = group.toSketchJSON();

  console.log(sketchJSON);
};

fn();
```

#### nodeToSketchSymbol

将 html 节点转 Sketch Symbol

```js
import { nodeToSketchSymbol } from 'html2sketch';

const fn = async () => {
  // 1. 获取 Dom 节点
  const node = document.getElementById('id');

  // 2. 调用转换方法
  const symbol = await nodeToSketchSymbol(node);

  // 3. 生成为 Sketch JSON
  const sketchJSON = symbol.toSketchJSON();

  console.log(sketchJSON);
};

fn();
```

## 有了 Sketch JSON 的下一步?

生成的 Sketch JSON 严格符合 [Sketch FileFormat](https://developer.sketch.com/file-format/) 结构，因此只需要简单地将相应的 JSON 按照 Sketch 文件规范合成 `.sketch` 文件，即可获得 Sketch 文件。

社区相关 API 模块:

- [sketch-json-api](https://github.com/ant-design/sketch-json-api)
- [node-sketch](https://github.com/oscarotero/node-sketch)
- [sketch-constructor](https://github.com/amzn/sketch-constructor)

如果希望直接使用该 JSON 对象，可以使用 [Sketch JSON](https://github.com/arvinxx/sketch-json) 插件，一键粘贴 JSON 进入 Sketch 中。

## 开发

查看 [开发止指南](https://github.com/ant-design/html2sketch/guide)
