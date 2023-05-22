# html2sketch 更新日志

## [1.0.2](https://github.com/ant-design/html2sketch/compare/v1.0.1...v1.0.2) (2023-05-22)

### 🐛 Bug Fixes

- 调整 engine 到 node 14 ([22bbb44](https://github.com/ant-design/html2sketch/commit/22bbb44))

## [1.0.1](https://github.com/ant-design/html2sketch/compare/v1.0.0...v1.0.1) (2023-02-16)

### 🐛 Bug Fixes

- cssRules error should not block parse ([2257640](https://github.com/ant-design/html2sketch/commit/2257640))

# [1.0.0](https://github.com/ant-design/html2sketch/compare/v0.4.7...v1.0.0) (2023-02-09)

### ♻ Code Refactoring

- rename the symbol function ([09d0de9](https://github.com/ant-design/html2sketch/commit/09d0de9))

### ✨ Features

- input support overflow ([0ff7b55](https://github.com/ant-design/html2sketch/commit/0ff7b55)), closes [#177](https://github.com/ant-design/html2sketch/issues/177)
- support almost full css transform ([f7bb06d](https://github.com/ant-design/html2sketch/commit/f7bb06d)), closes [#148](https://github.com/ant-design/html2sketch/issues/148)
- support overflow element ([f4b017b](https://github.com/ant-design/html2sketch/commit/f4b017b)), closes [#178](https://github.com/ant-design/html2sketch/issues/178)
- support rad angle line-gradient ([9860090](https://github.com/ant-design/html2sketch/commit/9860090)), closes [#96](https://github.com/ant-design/html2sketch/issues/96)
- support rotate & clip-path ([35f6628](https://github.com/ant-design/html2sketch/commit/35f6628)), closes [#180](https://github.com/ant-design/html2sketch/issues/180)
- 优化抓取 base64 图片方法 ([07dd128](https://github.com/ant-design/html2sketch/commit/07dd128))
- 提供自定义 fetch 方法的能力 ([28ed276](https://github.com/ant-design/html2sketch/commit/28ed276))
- 新增固定宽高的能力 ([f2df2e5](https://github.com/ant-design/html2sketch/commit/f2df2e5))

### 🐛 Bug Fixes

- adjust text and svg resizing constraint ([9fc8970](https://github.com/ant-design/html2sketch/commit/9fc8970))
- fix absolute position margin parsing ([120ba39](https://github.com/ant-design/html2sketch/commit/120ba39))
- fix overflow hidden node use clipping mask ([defb941](https://github.com/ant-design/html2sketch/commit/defb941))
- fix overflow hidden node use clipping mask ([055f25d](https://github.com/ant-design/html2sketch/commit/055f25d))
- fix password input text ([c8ff928](https://github.com/ant-design/html2sketch/commit/c8ff928))
- fix placeholder parsing without css rules ([505a390](https://github.com/ant-design/html2sketch/commit/505a390))
- fix position bug due to sketch text align parsing error ([1dce98f](https://github.com/ant-design/html2sketch/commit/1dce98f)), closes [#51](https://github.com/ant-design/html2sketch/issues/51)
- fix pseudo elt style issue and add test ([5c727a3](https://github.com/ant-design/html2sketch/commit/5c727a3))
- fix resizingConstraint func and update test ([c39f843](https://github.com/ant-design/html2sketch/commit/c39f843))
- gradient parse in safari ([aa374e5](https://github.com/ant-design/html2sketch/commit/aa374e5)), closes [#185](https://github.com/ant-design/html2sketch/issues/185)
- parse linear-gradient ([90f3ed8](https://github.com/ant-design/html2sketch/commit/90f3ed8)), closes [#184](https://github.com/ant-design/html2sketch/issues/184)
- set default resizingConstraint to left and top ([f897275](https://github.com/ant-design/html2sketch/commit/f897275))
- should parse textarea value and placeholder ([06d70ac](https://github.com/ant-design/html2sketch/commit/06d70ac)), closes [#161](https://github.com/ant-design/html2sketch/issues/161)
- single child overflow should not be mask ([1acab12](https://github.com/ant-design/html2sketch/commit/1acab12)), closes [#181](https://github.com/ant-design/html2sketch/issues/181)
- try to fix babel problem ([398f825](https://github.com/ant-design/html2sketch/commit/398f825))
- 修正 textStyle 缺失导致修改文本造成报错的问题 ([1a44244](https://github.com/ant-design/html2sketch/commit/1a44244))

### 💥 BREAKING CHANGES

- rename `nodeToSketchSymbol` to nodeToSymbol

# [1.0.0-beta.22](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.21...v1.0.0-beta.22) (2023-02-09)

### 🐛 Bug Fixes

- gradient parse in safari ([aa374e5](https://github.com/ant-design/html2sketch/commit/aa374e5)), closes [#185](https://github.com/ant-design/html2sketch/issues/185)

# [1.0.0-beta.21](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.20...v1.0.0-beta.21) (2023-02-09)

### 🐛 Bug Fixes

- parse linear-gradient ([90f3ed8](https://github.com/ant-design/html2sketch/commit/90f3ed8)), closes [#184](https://github.com/ant-design/html2sketch/issues/184)

# [1.0.0-beta.20](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.19...v1.0.0-beta.20) (2023-02-06)

### 🐛 Bug Fixes

- single child overflow should not be mask ([1acab12](https://github.com/ant-design/html2sketch/commit/1acab12)), closes [#181](https://github.com/ant-design/html2sketch/issues/181)

# [1.0.0-beta.19](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.18...v1.0.0-beta.19) (2023-02-02)

### ✨ Features

- support rotate & clip-path ([35f6628](https://github.com/ant-design/html2sketch/commit/35f6628)), closes [#180](https://github.com/ant-design/html2sketch/issues/180)

# [1.0.0-beta.18](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.17...v1.0.0-beta.18) (2023-01-16)

### ✨ Features

- support overflow element ([f4b017b](https://github.com/ant-design/html2sketch/commit/f4b017b)), closes [#178](https://github.com/ant-design/html2sketch/issues/178)

# [1.0.0-beta.17](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.16...v1.0.0-beta.17) (2023-01-13)

### ✨ Features

- input support overflow ([0ff7b55](https://github.com/ant-design/html2sketch/commit/0ff7b55)), closes [#177](https://github.com/ant-design/html2sketch/issues/177)

# [1.0.0-beta.16](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.15...v1.0.0-beta.16) (2022-10-20)

### 🐛 Bug Fixes

- 修正 textStyle 缺失导致修改文本造成报错的问题 ([1a44244](https://github.com/ant-design/html2sketch/commit/1a44244))

# [1.0.0-beta.15](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.14...v1.0.0-beta.15) (2022-09-14)

### 🐛 Bug Fixes

- should parse textarea value and placeholder ([06d70ac](https://github.com/ant-design/html2sketch/commit/06d70ac)), closes [#161](https://github.com/ant-design/html2sketch/issues/161)

# [1.0.0-beta.14](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.13...v1.0.0-beta.14) (2022-08-31)

# [1.0.0-beta.13](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.12...v1.0.0-beta.13) (2022-08-31)

# [1.0.0-beta.12](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.11...v1.0.0-beta.12) (2022-07-19)

### 🐛 Bug Fixes

- try to fix babel problem ([398f825](https://github.com/ant-design/html2sketch/commit/398f825))

# [1.0.0-beta.11](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.10...v1.0.0-beta.11) (2022-04-09)

# [1.0.0-beta.10](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.9...v1.0.0-beta.10) (2022-04-09)

### ✨ Features

- support almost full css transform ([f7bb06d](https://github.com/ant-design/html2sketch/commit/f7bb06d)), closes [#148](https://github.com/ant-design/html2sketch/issues/148)
- 新增固定宽高的能力 ([f2df2e5](https://github.com/ant-design/html2sketch/commit/f2df2e5))

### 🐛 Bug Fixes

- fix absolute position margin parsing ([120ba39](https://github.com/ant-design/html2sketch/commit/120ba39))
- fix resizingConstraint func and update test ([c39f843](https://github.com/ant-design/html2sketch/commit/c39f843))

# [1.0.0-beta.9](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.8...v1.0.0-beta.9) (2021-09-13)

### 🐛 Bug Fixes

- adjust text and svg resizing constraint ([9fc8970](https://github.com/ant-design/html2sketch/commit/9fc8970))

# [1.0.0-beta.8](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.7...v1.0.0-beta.8) (2021-09-13)

### ✨ Features

- support rad angle line-gradient ([9860090](https://github.com/ant-design/html2sketch/commit/9860090)), closes [#96](https://github.com/ant-design/html2sketch/issues/96)

# [1.0.0-beta.7](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.6...v1.0.0-beta.7) (2021-09-13)

### 🐛 Bug Fixes

- fix pseudo elt style issue and add test ([5c727a3](https://github.com/ant-design/html2sketch/commit/5c727a3))
- set default resizingConstraint to left and top ([f897275](https://github.com/ant-design/html2sketch/commit/f897275))

# [1.0.0-beta.6](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.5...v1.0.0-beta.6) (2021-06-29)

### 🐛 Bug Fixes

- fix overflow hidden node use clipping mask ([defb941](https://github.com/ant-design/html2sketch/commit/defb941))
- fix overflow hidden node use clipping mask ([055f25d](https://github.com/ant-design/html2sketch/commit/055f25d))

# [1.0.0-beta.5](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.4...v1.0.0-beta.5) (2021-06-23)

### 🐛 Bug Fixes

- fix password input text ([c8ff928](https://github.com/ant-design/html2sketch/commit/c8ff928))

# [1.0.0-beta.4](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.3...v1.0.0-beta.4) (2021-06-23)

### ✨ Features

- 优化抓取 base64 图片方法 ([07dd128](https://github.com/ant-design/html2sketch/commit/07dd128))

# [1.0.0-beta.3](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.2...v1.0.0-beta.3) (2021-06-22)

### ✨ Features

- 提供自定义 fetch 方法的能力 ([28ed276](https://github.com/ant-design/html2sketch/commit/28ed276))

### 🐛 Bug Fixes

- fix placeholder parsing without css rules ([505a390](https://github.com/ant-design/html2sketch/commit/505a390))

# [1.0.0-beta.2](https://github.com/ant-design/html2sketch/compare/v1.0.0-beta.1...v1.0.0-beta.2) (2021-05-13)

### 🐛 Bug Fixes

- fix position bug due to sketch text align parsing error ([1dce98f](https://github.com/ant-design/html2sketch/commit/1dce98f)), closes [#51](https://github.com/ant-design/html2sketch/issues/51)

# [1.0.0-beta.1](https://github.com/ant-design/html2sketch/compare/v0.4.7...v1.0.0-beta.1) (2021-05-08)

### ♻ Code Refactoring

- rename the symbol function ([09d0de9](https://github.com/ant-design/html2sketch/commit/09d0de9))

### 💥 BREAKING CHANGES

- rename `nodeToSketchSymbol` to nodeToSymbol

## [0.4.7](https://github.com/ant-design/html2sketch/compare/v0.4.6...v0.4.7) (2021-05-08)

### 🐛 Bug Fixes

- input line-height ([87063af](https://github.com/ant-design/html2sketch/commit/87063af))

## 0.4.6 (2020-11-04)

### 🐛 Bug Fixes

- :bug: fix: fix a color string parser problem ([9726096](https://github.com/ant-design/html2sketch/commit/9726096))

## 0.4.5 (2020-10-21)

### 🐛 Bug Fixes

- fix position parsing ([1e4549c](https://github.com/ant-design/html2sketch/commit/1e4549c))

## 0.4.4 (2020-10-21)

### 🐛 Bug Fixes

- fix null error ([9b4dc28](https://github.com/ant-design/html2sketch/commit/9b4dc28))

## 0.4.3 (2020-10-19)

### ✨ New Features

- ✨ feat: support svg radial gradient ([90f9847](https://github.com/ant-design/html2sketch/commit/90f9847))
- ✨ feat: support svg transform ([d0c0075](https://github.com/ant-design/html2sketch/commit/d0c0075))

### 🐛 Bug Fixes

- fix different border color parsing ([a6fcf5b](https://github.com/ant-design/html2sketch/commit/a6fcf5b))
- fix border options ([76d1f23](https://github.com/ant-design/html2sketch/commit/76d1f23))
- fix input node ([c4dbe20](https://github.com/ant-design/html2sketch/commit/c4dbe20))
- fix svg parsing ([f8b6a3f](https://github.com/ant-design/html2sketch/commit/f8b6a3f))
- fix typings ([1c37267](https://github.com/ant-design/html2sketch/commit/1c37267))
- svg extends parent fill attr ([08f8845](https://github.com/ant-design/html2sketch/commit/08f8845))
- fix input node ([8634d21](https://github.com/ant-design/html2sketch/commit/8634d21))

## 0.4.2 (2020-09-26)

### 🐛 Bug Fixes

- fix import path ([6dd1ef0](https://github.com/ant-design/html2sketch/commit/6dd1ef0))
- fix input text align ([359a534](https://github.com/ant-design/html2sketch/commit/359a534))
- fix text position parsing ([e3da845](https://github.com/ant-design/html2sketch/commit/e3da845))

## 0.4.1 (2020-09-24)

### ✨ New Features

- Add a temp solution for canvas ([07375ce](https://github.com/ant-design/html2sketch/commit/07375ce))
- Css transform (#30) ([8518b7a](https://github.com/ant-design/html2sketch/commit/8518b7a)), closes [#30](https://github.com/ant-design/html2sketch/issues/30)

### 🐛 Bug Fixes

- Fix background svg & png parsing ([8e38563](https://github.com/ant-design/html2sketch/commit/8e38563))
- Fix background png position ([9a42cf3](https://github.com/ant-design/html2sketch/commit/9a42cf3))
- Fix background svg parsing ([51151c7](https://github.com/ant-design/html2sketch/commit/51151c7))
- Fix symbol override (#33) ([aa0bb2d](https://github.com/ant-design/html2sketch/commit/aa0bb2d)), closes [#33](https://github.com/ant-design/html2sketch/issues/33)
- Fix pseudo absolute XY ([4140e2f](https://github.com/ant-design/html2sketch/commit/4140e2f))

## 0.4.0 (2020-09-12)

### ✨ New Features

- ✨ feat: Parse svg illustration(95%) ([3c2e1ef](https://github.com/ant-design/html2sketch/commit/3c2e1ef))

### 🐛 Bug Fixes

- fix: Fix import bug ([50b5a4f](https://github.com/ant-design/html2sketch/commit/50b5a4f))
- Fix background image svg (#19) ([aa62442](https://github.com/ant-design/html2sketch/commit/aa62442)), closes [#19](https://github.com/ant-design/html2sketch/issues/19)
- Fix multi-line text line height ([0c73bc9](https://github.com/ant-design/html2sketch/commit/0c73bc9))
- Fix image protocol parse error ([f8a97d6](https://github.com/ant-design/html2sketch/commit/f8a97d6))
- Fix text opacity parse ([a595a96](https://github.com/ant-design/html2sketch/commit/a595a96))
- Fix type ([adbd093](https://github.com/ant-design/html2sketch/commit/adbd093))

## 0.3.1 (2020-09-11)

### 🐛 Bug Fixes

- Fix image protocol parse error ([68930b1](https://github.com/ant-design/html2sketch/commit/68930b1))
- fix text parse ([2d66e71](https://github.com/ant-design/html2sketch/commit/2d66e71))
- Fix type ([48eb68a](https://github.com/ant-design/html2sketch/commit/48eb68a))

## 0.3.0 (2020-09-07)

### ✨ New Features

- Add rgba method ([4d6b6f9](https://github.com/ant-design/html2sketch/commit/4d6b6f9))
- Implement Image style ([91a685a](https://github.com/ant-design/html2sketch/commit/91a685a))
- Parse image in node func ([6d92cfe](https://github.com/ant-design/html2sketch/commit/6d92cfe)), closes [#11](https://github.com/ant-design/html2sketch/issues/11)

### 🐛 Bug Fixes

- Fix gradient parse ([94a0102](https://github.com/ant-design/html2sketch/commit/94a0102))
- Fix input parse ([3cb059b](https://github.com/ant-design/html2sketch/commit/3cb059b))
- Fix line-gradient parse ([337d460](https://github.com/ant-design/html2sketch/commit/337d460))
- Fix lint and type ([b4eb5a3](https://github.com/ant-design/html2sketch/commit/b4eb5a3))
- Fix part of pseudoShape parse ([bd4a9e6](https://github.com/ant-design/html2sketch/commit/bd4a9e6))
- Fix single border ([61686fb](https://github.com/ant-design/html2sketch/commit/61686fb))
- Fix text parse ([7a04a61](https://github.com/ant-design/html2sketch/commit/7a04a61))
- Fix Text parse ([35698ef](https://github.com/ant-design/html2sketch/commit/35698ef))
- Fix Text parse ([37b84b5](https://github.com/ant-design/html2sketch/commit/37b84b5))
- Fix type ([96e1eb8](https://github.com/ant-design/html2sketch/commit/96e1eb8))

## 0.2.2-1 (2020-08-31)

### ✨ New Features

- Add paste button ([b48633e](https://github.com/ant-design/html2sketch/commit/b48633e))
- 可正常解析 canvas ([dff0e42](https://github.com/ant-design/html2sketch/commit/dff0e42))
- 可正常解析内联图片 ([cd668e6](https://github.com/ant-design/html2sketch/commit/cd668e6))
- 添加 Svg 图片解析 ([8b44fcb](https://github.com/ant-design/html2sketch/commit/8b44fcb))
- 添加 Svg 图片解析 ([9c7f1c3](https://github.com/ant-design/html2sketch/commit/9c7f1c3))
- 添加 Image 解析 ([e995004](https://github.com/ant-design/html2sketch/commit/e995004))

### 🐛 Bug Fixes

- Fix import ([235868c](https://github.com/ant-design/html2sketch/commit/235868c))
- 修复伪类的解析问题 ([4697f85](https://github.com/ant-design/html2sketch/commit/4697f85) 、[ab043b8](https://github.com/ant-design/html2sketch/commit/ab043b8) 、[ff219d7](https://github.com/ant-design/html2sketch/commit/ff219d7))

## 0.2.2-0 (2020-08-27)

### 🐛 Bug Fixes

- fix: 优化生成 symbol 名称 ([289ffb8](https://github.com/ant-design/html2sketch/commit/289ffb8))

## 0.2.1 (2020-08-27)

### 🐛 Bug Fixes

- fix: 修正配置项识别 ([fb466ec](https://github.com/ant-design/html2sketch/commit/fb466ec))

## 0.2.0 (2020-08-26)

- 💥 更新到 dumi 架构 ([1a96c4f](https://github.com/ant-design/html2sketch/commit/1a96c4f))

### ✨ New Features

- feat: 初步集成 layout 能力 ([194ed74](https://github.com/ant-design/html2sketch/commit/194ed74))
- feat: 完成 Modal 的 symbol 定义 ([bd09b32](https://github.com/ant-design/html2sketch/commit/bd09b32))
- feat: 完成 Modal 的 symbol 定义 ([a0f3682](https://github.com/ant-design/html2sketch/commit/a0f3682))
- feat: 添加 modal layout 识别 ([8a68e27](https://github.com/ant-design/html2sketch/commit/8a68e27))
- feat: 添加 symbol 名称的支持 ([5a901e6](https://github.com/ant-design/html2sketch/commit/5a901e6))
- feat: 添加默认的支持的 symbol layout ([907556d](https://github.com/ant-design/html2sketch/commit/907556d))

### 🐛 Bug Fixes

- fix: 修复部分样式解析问题 ([ddfceb2](https://github.com/ant-design/html2sketch/commit/ddfceb2))

## 0.1.15 (2020-08-10)

### 🐛 Bug Fixes

- fix: 修复转换表格时无法转换边框的样式 ([557191c](https://github.com/ant-design/html2sketch/commit/557191c))

## 0.1.14 (2020-08-10)

### 🐛 Bug Fixes

- fix: 修复空 svg 导致的报错 ([6e379a7](https://github.com/ant-design/html2sketch/commit/6e379a7))

## 0.1.13 (2020-08-08)

### 🐛 Bug Fixes

- fix: 清理空图层的解析 ([5bf109a](https://github.com/ant-design/html2sketch/commit/5bf109a))
- fix: 清理空图层的解析 ([72443b0](https://github.com/ant-design/html2sketch/commit/72443b0))

## 0.1.12 (2020-08-08)

### ✨ New Features

### 🐛 Bug Fixes

- fix: 修复伪类的解析样式 ([3d2d99f](https://github.com/ant-design/html2sketch/commit/3d2d99f))
- fix: 修复文本的高度解析 ([e1e128c](https://github.com/ant-design/html2sketch/commit/e1e128c))
- fix: 修复文本的高度解析 ([ada6502](https://github.com/ant-design/html2sketch/commit/ada6502))
- fix: 修复文本解析 ([02d0847](https://github.com/ant-design/html2sketch/commit/02d0847))
- fix: 修复部分样式解析错误 ([eefccdb](https://github.com/ant-design/html2sketch/commit/eefccdb))

- feat: 添加伪类文本的解析 ([e3b56fb](https://github.com/ant-design/html2sketch/commit/e3b56fb))

## 0.1.1 (2020-07-27)

### 🐛 Bug Fixes

- fix: 修复 svg 样式和 group 问题 ([f6d3ed4](https://github.com/ant-design/html2sketch/commit/f6d3ed4) 、[60091c7](https://github.com/ant-design/html2sketch/commit/60091c7))

## 0.1.0 (2020-07-26)

### ✨ New Features

- feat: 完成 SVG 的图形解析 ([42b2f34](https://github.com/ant-design/html2sketch/commit/42b2f34))
- feat: 完成形状解析转换 ([2961eb4](https://github.com/ant-design/html2sketch/commit/2961eb4))
- feat: 完成形状解析转换 ([a6c08a7](https://github.com/ant-design/html2sketch/commit/a6c08a7))
- feat: 添加 ShapePath 类 ([ced0b8d](https://github.com/ant-design/html2sketch/commit/ced0b8d))
- feat: 添加 Svg 支持 ([9825978](https://github.com/ant-design/html2sketch/commit/9825978))

### 🐛 Bug Fixes

- fix: 修复 Svg 解析后尺寸问题 ([338857c](https://github.com/ant-design/html2sketch/commit/338857c))
- fix: 修复大部分单路径识别的问题 ([2f16b18](https://github.com/ant-design/html2sketch/commit/2f16b18))
- fix: 修复循环问题 ([3518125](https://github.com/ant-design/html2sketch/commit/3518125))
- fix: 修复部分路径节点丢失的问题 ([efe24ae](https://github.com/ant-design/html2sketch/commit/efe24ae))

## 0.0.3 (2020-07-20)

### ✨ New Features

- feat: 初步完成 symbol 构建流程 ([1da1d31](https://github.com/ant-design/html2sketch/commit/1da1d31))
- feat: 添加渐变模型 ([6ca272a](https://github.com/ant-design/html2sketch/commit/6ca272a))
- feat: 添加解析伪类能力 ([f20e6f2](https://github.com/ant-design/html2sketch/commit/f20e6f2))

### 🐛 Bug Fixes

- fix: 修复部分转换问题 ([f2b1728](https://github.com/ant-design/html2sketch/commit/f2b1728))
