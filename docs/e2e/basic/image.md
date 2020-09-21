---
title: 图片解析
order: 40
---

## 说明

测试模块解析图片类型的能力

测试对象:

- image 节点
- SVG 节点

加载方式:

- 网址
- Base64

图片类型

- svg
- png

## image 节点 + 内联 Png 图片

<code src="./demos/ImageInline.tsx" />

## image 节点 + 内联 Png 图片 测试两个图片

<code src="./demos/TwoInlineImage.tsx" />

## image 节点 + png 网址

<code src="./demos/ImagePng.tsx" />

## image 节点 + png 网址不带协议头

<code src="./demos/ImageNoProtocol.tsx" />

## image 节点 + svg 网址

<code src="./demos/ImageSvg.tsx" />

## 背景图片为 image 节点

<code src="./demos/ImageBackground.tsx" />

## 背景为 Svg

<code src="./demos/ImageBackgroundSvg.tsx" />
