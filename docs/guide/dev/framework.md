---
title: 架构说明
order: 2
---

## 架构说明

### 开发框架

开发框架采用 [dumi](https://d.umi.org) , 兼具模块开发 打包 说明文档 demo 展示于一体

相关开发指令:

- 模块打包: `npm run build`
- 文档开发: `npm run site:dev`
- 单元测试: `npm run test`
- E2E 测试: `npm run e2e`

### 目录架构

```bash
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
├── webpack.config.js              # webpack 打包配置
├── README.md                      # 说明文档
├── changelog.en-US.md             # 更新日志
└── changelog.zh-CN.md             # 更新日志
```

### 模块架构

```bash
.src
├── function                       # 解析方法
├── parser                         # 解析器
├── models                         # 对象实体
├── types                          # 类型定义
├── utils                          # 工具函数
└── index.ts                       # 索引
```

#### types

包含相关类型定义文件
