<h1 align="center"><a href="">html2sketch</a>](https://ant-design.github.io/html2sketch/)</h1>

<div align="center">

[![NPM version][npm-image]][npm-url] [![NPM downloads][download-image]][download-url]

[![Test CI status][test-ci]][test-ci-url] ![Deploy CI][deploy-ci] [![Coverage][coverage]][codecov-url]

[![david deps][david-image]][david-url] [![david devDeps][david-dev-image]][david-dev-url]

[![ docs by dumi][dumi-url]](https://d.umijs.org/) [![Build With father][father-url]](https://github.com/umijs/father/)

[dumi-url]: https://img.shields.io/badge/docs%20by-dumi-blue
[father-url]: https://img.shields.io/badge/build%20with-father-028fe4.svg

<!-- npm url -->

[npm-image]: http://img.shields.io/npm/v/html2sketch.svg?style=flat-square
[npm-url]: http://npmjs.org/package/html2sketch

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

## 开发

### 依赖安装

```basg
npm i
```

或者

```bash
yarn install
```

### 特殊依赖说明

正常开发基本用不到下述特殊依赖,但是涉及到单元测试和 e2e 测试时需要使用

#### Puppeteer

e2e 使用到 Puppeteer, 默认情况下会直接安装

国内加速可以在`.npmrc` 中添加

```
puppeteer_download_host=https://npm.taobao.org/mirrors
```

#### jest-electron

开发中测试环境依赖模块 `jest-electron`

国内加速可以在 `.npmrc` 添加

```
electron_mirror=https://cdn.npm.taobao.org/dist/electron/
```

## 架构说明

### 开发框架

开发框架采用 [dumi](https://d.umi.org) , 兼具模块开发 打包 说明文档 demo 展示于一体

相关开发指令:

- 模块打包: `npm run build`
- 文档开发: `npm run site:dev`
- 单元测试: `npm run test`
- E2E 测试: `npm run e2e`

### 目录架构

```
├── src                            # 源代码
├── docs                           # 说明网站与演示 demo
├── e2e                            # e2e 测试文件夹
├── tests                          # 单元测试文件夹
├── config                         # Dumi 配置文件夹
├── public                         # 静态资源文件
├── tsconfig-check.json            # ts lint 静态资源文件
├── jest.config.js                 # Jest 单元测试配置
├── jest.e2e.config.js             # Jest e2e 测试配置
├── package.json                   # package.json
├── jsconfig.json                  # jsconfig 配置
├── tsconfig.json                  # tsconfig 配置
├── tsconfig-check.json            # 为 lint 使用的 tsconfig
└── webpack.config.js              # webpack 打包配置
├── README.md                      # 说明文档
├── changelog.en-US.md             # 更新日志
├── changelog.zh-CN.md             # 更新日志
```

### 模块架构

```
src
├── function                       # 解析方法
├── parser                         # 解析器
├── model                          # 对象实体
└── utils                          # 工具函数
├── index.ts                       # 索引
├── type.ts                        # 类型定义
```

#### 实现思路

DOM -> 解析器 -> DIM -> SketchJSON

![解析流程](https://user-images.githubusercontent.com/28616219/91637898-379b0680-ea3e-11ea-95e6-74694ed72a57.png)
