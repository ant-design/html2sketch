---
title: 依赖安装
order: 1
group:
  order: 1
  title: 开发
---

## 特殊依赖说明

正常开发基本用不到下述特殊依赖,但是涉及到单元测试和 e2e 测试时需要使用

### Puppeteer

e2e 使用到 Puppeteer, 默认情况下会直接安装

国内加速可以在`.npmrc` 中添加

```
puppeteer_download_host=https://npm.taobao.org/mirrors
```

### jest-electron

开发中测试环境依赖模块 `jest-electron`

国内加速可以在 `.npmrc` 添加

```
electron_mirror=https://cdn.npm.taobao.org/dist/electron/
```

#### Apple M1 安装问题

如果是 Apple M1 的话，jest-electron 目前版本（^0.1.11）会报下述错误。

```shell
Error: Failed to find Electron v6.1.12 for darwin-arm64 at https://github.com/electron/electron/releases/download/v6.1.12/electron-v6.1.12-darwin-arm64.zip
    at Request.<anonymous> (/Users/robblovell/code/node-monorepo/node_modules/nugget/index.js:169:61)
    at Request.emit (node:events:378:20)
    at Request.onRequestResponse (/Users/robblovell/code/node-monorepo/node_modules/request/request.js:1059:10)
    at ClientRequest.emit (node:events:378:20)
    at HTTPParser.parserOnIncomingClient [as onIncoming] (node:_http_client:636:27)
    at HTTPParser.parserOnHeadersComplete (node:_http_common:129:17)
    at TLSSocket.socketOnData (node:_http_client:502:22)
    at TLSSocket.emit (node:events:378:20)
    at addChunk (node:internal/streams/readable:313:12)
    at readableAddChunk (node:internal/streams/readable:288:9)
```

原因是 `jest-electron` 使用的 `electron` 依赖版本过低，不支持 M1 的苹果电脑。 相关 issue：[Support for Mac M1.](https://github.com/hustcc/jest-electron/issues/39)

临时解决方案：手动修改 `node_modules/jest-electron` 下 `package.json` 的 `electron` 为 `11.4.6` 然后在该目录下执行

```shell
yarn install --production
```

#### 实现思路

DOM -> 解析器 -> DIM -> SketchJSON

![解析流程](https://user-images.githubusercontent.com/28616219/91637898-379b0680-ea3e-11ea-95e6-74694ed72a57.png)
