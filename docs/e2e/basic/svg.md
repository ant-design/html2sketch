---
title: Svg 解析
order: 10
---

## svg icon 解析

icon 定义: 只包含一条或若干条 path 的 svg

### 包含多条 path 的 svg

<code src="./demos/SvgMutliPath.tsx" />

### 一条 path 中包含两个图形 的 svg

<code src="./demos/SvgPathGroup.tsx" />

### 测试 路径 的 svg

<code src="./demos/SvgTest.tsx" />

### 使用 use Symbol 的 svg

<code src="./demos/SvgUseSymbol.tsx" />

### 多组 Icon 组合的 svg

解析过程中遇到的坑代表

[填坑记录](https://www.yuque.com/design-engineering/sketch-dev/ib5htf)

<code src="./demos/SvgIcons.tsx" />

### Group 类型的 SVG 和按钮的组合

<code src="./demos/SvgGroup.tsx" />

## svg 插画

插画的定义: 除了纯 `path` 以外的 svg 对象统称为插画

常见包含 `g` `rect` `text` 等等其他 svg 元素

### 一个常规的例子

<code src="./demos/SvgSimpleIllustration.tsx" />

### svg 文本元素

<code src="./demos/SvgText.tsx" />

### 超复杂的例子

<code src="./demos/SvgIllustration.tsx" />
