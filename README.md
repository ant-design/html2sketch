<h1 align="center">html2sketch</h1>

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

[coverage]: https://codecov.io/gh/arvinxx/html2sketch/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/arvinxx/html2sketch/branch/master

<!-- Github CI -->

[test-ci]: https://github.com/arvinxx/html2sketch/workflows/Test%20CI/badge.svg
[deploy-ci]: https://github.com/arvinxx/html2sketch/workflows/Deploy%20CI/badge.svg
[test-ci-url]: https://github.com/arvinxx/html2sketch/actions?query=workflow%3ATest%20CI
[deploy-ci-ci]: https://github.com/arvinxx/html2sketch/actions?query=workflow%3ADeploy%20CI
[david-image]: https://img.shields.io/david/arvinxx/html2sketch?style=flat-square
[david-dev-url]: https://david-dm.org/arvinxx/html2sketch?type=dev
[david-dev-image]: https://img.shields.io/david/dev/arvinxx/html2sketch?style=flat-square
[david-url]: https://david-dm.org/arvinxx/html2sketch
[download-image]: https://img.shields.io/npm/dm/html2sketch.svg?style=flat-square
[download-url]: https://npmjs.org/package/html2sketch

</div>

## 开发

### 前置依赖安装

#### node-canvas

由于开发中测试环境依赖模块 `node-canvas` , 需要前置安装:

| 系统 | 命令 |
| --- | --- |
| OS X | `brew install pkg-config cairo pango libpng jpeg giflib librsvg` |
| Ubuntu | `sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev` |
| Fedora | `sudo yum install gcc-c++ cairo-devel pango-devel libjpeg-turbo-devel giflib-devel` |
| Solaris | `pkgin install cairo pango pkg-config xproto renderproto kbproto xextproto` |
| OpenBSD | `doas pkg_add cairo pango png jpeg giflib` |
| Windows | See the [wiki](https://github.com/Automattic/node-canvas/wiki/Installation:-Windows) |
| Others | See the [wiki](https://github.com/Automattic/node-canvas/wiki) |

#### Puppeteer

e2e 使用到 Puppeteer, 默认情况下会直接安装

### 依赖安装

```basg
npm i
```

或者

```bash
yarn install
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
├── index.ts                       # 索引
├── type.ts                        # 相关类型定义文件
├── function                       # 合成方法
├── model                          # 设计对象实体
├── parser                         # 解析器
└── utils                          # 工具函数
```

#### 实现思路

DOM -> 解析器 -> DIM -> SketchJSON

![解析流程](https://user-images.githubusercontent.com/28616219/91637898-379b0680-ea3e-11ea-95e6-74694ed72a57.png)
