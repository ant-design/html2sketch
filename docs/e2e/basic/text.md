---
title: 文本解析
---

## 不同 display 测试

### InlineBlock

<code src="./demos/Text/SpanInlineBlock.tsx"></code>

## 解析文本对齐

### 解析 Block 文本对齐

<code src="./demos/Text/BlockAlign.tsx"></code>

### 解析 Flex 文本对齐

<code src="./demos/Text/FlexAlign.tsx"></code>

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

<code src="./demos/Text/TagInlineBlock.tsx"></code>

## 解析 span + Icon

测试 span 下带文本和 icon 的解析

<code src="./demos/Text/SpanIcon.tsx"></code>

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

<code src="./demos/Text/Ellipsis.tsx"></code>

## 文本行数

### 解析一行文本

<code src="./demos/Text/SpanLinkRow.tsx"></code>

### 解析多行文本

<code src="./demos/Text/MutliLine.tsx"></code>

## 解析 span strong 文本

span 是 inline;

strong 也是 inline, 采用加粗样式

<code src="./demos/Text/Span.tsx"></code>

填的坑:

1. `b` 和 `strong`标签采用了 `bolder` , css 解析出来是 700 , 700 对应的是 `Bold` ,但是苹方没有 Bold,必须人为处理成 Semibold
2. 之前(`<=0.4.1`) trim 掉了文本所有的前后空格,但是这个场景下`2`和`条`的间距是用空格来填的, 所以去掉了 trim 空格的情况

## 文本伪类

### 解析 `after` 和 `before`

<code src="./demos/Text/Label.tsx"></code>

### 解析 Input `placeholder` 和 `value`

placeholder 和输入的值都在伪类里

<code src="./demos/Text/Input.tsx"></code>

### 解析 TextArea `placeholder` 和 `value`

placeholder 和输入的值都在伪类里

<code src="./demos/Text/TextArea.tsx"></code>

### Input 文本居中

<code src="./demos/Text/InputAligin.tsx"></code>

### Input 文本垂直居中

#### Case1: line-height 超过 input 高度

目前这种垂直居中是因为 `line-height` 值超过了 input 的高度使得文本默认在垂直轴上是居中的

<code src="./demos/Text/InputVerticalAligin.tsx"></code>

### 文本对齐方式

原来在网页中设置了 `text-align: right` 的会得到 Sketch Alignment 为 `SketchFormat.TextHorizontalAlignment.Right`，而这个数据传入到 sketch 中则会导致 sketch 中文本位置的解析出错

[用例来源](https://github.com/ant-design/html2sketch/issues/51)

<code src="./demos/Text/TextAlignment/index.tsx"></code>
