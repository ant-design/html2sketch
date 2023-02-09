---
title: Svg 解析逻辑
---

# Svg 解析逻辑

SVG 的解析是 `html2sketch` 中最复杂的一个解析模块,原因有三点:

一、svg 的解析入口存在两种:

1. Svg Element;

2. 样式的 `background-image` 或 `<img>` 加载的 URL;

二、svg 中包含诸多元素例如 `path`、`g`、`circle`、`rect` 等等基本图形元素,也有 `use`、`def` 等特殊元素

三、svg 也支持内联样式因此样式需要重新解析,同时存在例如 `currentColor` 的特殊填充颜色,使得解析难度再次提升

上述三点原因导致解析 Svg 约等于重新解析一种 DSL 语言.

整个解析的流程如下图所示:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Ffa1IkMMzjfjU09tHtgVUkK%2Fhtml2sketch%3Fnode-id%3D10%253A5" allowfullscreen></iframe>
