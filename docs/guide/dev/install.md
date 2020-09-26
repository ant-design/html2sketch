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

#### 实现思路

DOM -> 解析器 -> DIM -> SketchJSON

![解析流程](https://user-images.githubusercontent.com/28616219/91637898-379b0680-ea3e-11ea-95e6-74694ed72a57.png)
