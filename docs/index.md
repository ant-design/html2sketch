---
title: 介绍
order: 10
side: false
footer: Open-source MIT Licensed | Copyright © 2020-present
---

## 安装

```bash
npm i html2sketch --save
// or
yarn add html2sketch
```

## 使用

html2sketch 包含 2 个主要方法 `nodeToGroup` 和 `nodeToSketchSymbol` 。

### nodeToGroup

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

### nodeToSketchSymbol

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

## 有了 Sketch JSON 下一步?

生成的 Sketch JSON 严格符合 [Sketch FileFormat](https://developer.sketch.com/file-format/) 结构，因此只需要简单地将相应的 JSON 按照 Sketch 文件规范合成 `.sketch` 文件，即可获得可用的 Sketch。

相关可以用的 API 模块:

- [sketch-json-api](https://github.com/ant-design/sketch-json-api)
- [node-sketch](https://github.com/oscarotero/node-sketch)
- [sketch-constructor](https://github.com/amzn/sketch-constructor)

如果希望直接使用该 JSON 对象，可以使用 [Sketch JSON](https://github.com/arvinxx/sketch-json) 插件，一键粘贴 JSON 进入 Sketch 中。
