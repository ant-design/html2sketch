---
title: 文本解析
order: 2
group:
  order: 2
  title: 基础元素
---

## 不同 display 测试

### InlineBlock

<code src="./demos/Text/SpanInlineBlock.tsx" />

## 解析文本对齐

### 解析 Block 文本对齐

<code src="./demos/Text/BlockAlign.tsx" />

### 解析 Flex 文本对齐

<code src="./demos/Text/FlexAlign.tsx" />

### 文本高度上垂直居中

场景特征:

```css
 {
  display: inline-block;
  line-height: 20px;
}
```

这种场景没有文本对齐参数,

可以直接使用 range 的 bcr 作为 text 的 XY 坐标和高度值

<code src="./demos/Text/TagInlineBlock.tsx" />

## 解析 span + Icon

测试 span 下带文本和 icon 的解析

<code src="./demos/Text/SpanIcon.tsx" />

## 解析省略号

测试带省略号的文本

### 一行省略号

测试样式:

```css
 {
  width: 190px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
```

<code src="./demos/Text/Ellipsis.tsx" />

## 文本行数

### 解析一行文本

<code src="./demos/Text/SpanLinkRow.tsx" />

### 解析多行文本

<code src="./demos/Text/MutliLine.tsx" />

## 解析 span strong 文本

span 是 inline;

strong 也是 inline, 采用加粗样式

<code src="./demos/Text/Span.tsx" />

填的坑:

1. `b` 和 `strong`标签采用了 `bolder` , css 解析出来是 700 , 700 对应的是 `Bold` ,但是苹方没有 Bold,必须人为处理成 Semibold
2. 之前(`<=0.4.1`) trim 掉了文本所有的前后空格,但是这个场景下`2`和`条`的间距是用空格来填的, 所以去掉了 trim 空格的情况

## 文本伪类

### 解析 `after` 和 `before`

<code src="./demos/Text/Label.tsx" />

### 解析 Input `placeholder` 和 `value`

placeholder 和输入的值都在伪类里

<code src="./demos/Text/Input.tsx" />

### Input 文本居中

<code src="./demos/Text/InputAligin.tsx" />
