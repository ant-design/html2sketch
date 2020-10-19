---
title: 解析逻辑
order: 1
group:
  order: 4
  title: Svg
---

SVG 的解析是 `html2sketch` 中最复杂的一个解析模块,原因有三点:

一、svg 的解析入口存在两种:

1. Svg Element;

2. 样式的 `background-image` 或 `<img>` 加载的 URL;

二、svg 中包含诸多元素例如 `path`、`g`、`circle`、`rect` 等等基本图形元素,也有 `use`、`def` 等特殊元素

三、svg 也支持内联样式因此样式需要重新解析,同时存在例如 `currentColor` 的特殊填充颜色,使得解析难度再次提升

上述三点原因导致解析 Svg 约等于重新解析一种 DSL 语言.

整个解析的流程如下图所示:

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Ffa1IkMMzjfjU09tHtgVUkK%2Fhtml2sketch%3Fnode-id%3D10%253A5" allowfullscreen></iframe>

## 使用 use Symbol 的 svg

`<use>` 类型元素的解析测试

指带有 symbol 的对象和 use 的对象,需要使用 render 方法进行一次替换后才可以正常解析

```html
<svg
  width="1em"
  height="1em"
  fill="currentColor"
  aria-hidden="true"
  focusable="false"
  class=""
>
  <symbol id="icon-facebook" viewBox="0 0 1024 1024">
    <path
      d="M535.9 1023.9c68.2 0 132.6 0 159.6 0l0 0.1C668.4 1024 604.1 1024 535.9 1023.9L535.9 1023.9zM253.5 0.6c-23 0.4-46.2 1.9-67 5.8-22.6 4.3-43.2 10-63.8 20.5-20.9 10.6-38.9 25.1-55 40.8-15.7 16.1-30.2 34.2-40.8 55-10.4 20.6-16.2 41.1-20.5 63.8-3.9 20.8-5.4 44-5.8 67-0.1 5.2-0.1 10-0.2 17.5l-0.3 450c0 5.7 0.1 11.9 0.1 18.7 0.2 16.3 0.3 23 0.4 30.7 0.4 23 1.9 46.2 5.8 67 1.9 9.9 4 19.4 6.7 28.6 3.5 11.9 7.9 23.5 13.8 35.1 10.6 20.9 25.1 38.9 40.8 55 16.1 15.7 34.2 30.2 55 40.8 20.6 10.4 41.1 16.2 63.8 20.5 20.8 3.9 44 5.4 67 5.8 7.7 0.1 14.4 0.2 30.7 0.4 15.5 0.1 28.2 0.2 37.6 0.2 26.1 0 123.5 0 214 0l0-397L407.1 626.8 407.1 478.3l127.8 0L534.9 340.1C534.9 234 616.9 158 722.9 158l137.2 3 0 142.6L755.3 303.6c-30.3 0-54.9 33.5-54.9 63.9l0 110.8 154.6 0-22 148.6L695.5 626.9l0 397c2.5 0 4.8 0 6.6 0 9.4 0 22.1-0.1 37.6-0.2 12.9-0.1 19.8-0.2 25.9-0.2 1.6 0 3.2 0 4.9-0.1 23-0.4 46.2-1.9 67-5.8 22.6-4.3 43.2-10 63.8-20.5 20.9-10.6 38.9-25.1 55-40.8 15.7-16.1 30.2-34.2 40.8-55 10.4-20.6 16.2-41.1 20.5-63.8 3.9-20.8 5.4-44 5.8-67 0.1-7.7 0.2-14.4 0.4-30.7 0.1-15.5 0.2-28.2 0.2-37.6L1024 321.9c0-3.2 0-6.9 0-10.9 0-7.6-0.1-16.6-0.2-26.8-0.2-16.3-0.3-23-0.4-30.7-0.4-23-1.9-46.2-5.8-67-4.3-22.6-10-43.2-20.5-63.8-10.6-20.9-25.1-38.9-40.8-55-16.1-15.7-34.2-30.2-55-40.8-20.6-10.4-41.1-16.2-63.8-20.5-20.8-3.9-44-5.4-67-5.8-7.7-0.1-14.4-0.2-30.7-0.4C724.2 0.1 711.5 0 702.1 0L321.8 0c-9.4 0-22.1 0.1-37.6 0.2C267.9 0.4 261.2 0.5 253.5 0.6z"
    ></path>
  </symbol>
  <use xlink:href="#icon-facebook"></use>
</svg>
```

<code src="./demos/UseSymbol.tsx" />

## svg 文本元素

<code src="./demos/Text.tsx" />

## 渐变

### 圆形渐变

<code src="./demos/RadialGradient.tsx" />

## 子级需要继承父级 fill 属性

如果 `g` 是 `fill="none"` 那么子级都不会有 fill

```svg
<g fill="none" fill-rule="evenodd">
 <g>
   <g>
     <circle cx="80" cy="80" r="40" stroke="#60ACFF"/>
   </g>
 </g>
</g>
```

<code src="./demos/GroupNoFill.tsx" />

## 解析 Transform 属性

使用模块 [transformation-matrix](https://www.npmjs.com/package/transformation-matrix#fromTransformAttribute) 完成相应的解析

<code src="./demos/TransformAttr.tsx" />
