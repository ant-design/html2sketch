---
title: Canvas 解析
order: 30
---

## 基本 Canvas 解析

<code src="./demos/CanvasBasic.tsx" />

## Canvas 跨域图片解析

<code src="./demos/CanvasCors.tsx" />

### 跨域问题说明

某些 Canvas 由于绘制了跨域图片,因此无法使用 `toDataURL` 方法 ，会报错:

```
 Tainted canvases may not be exported
```

### 解决方案

这个时候解决方案有两种:

#### 你可以控制 `img`

如果你可以控制提供 canvas 渲染的 img 节点,那一切都行相对容易,给 img 节点添加上 `crossOrigin` 属性即可

```html
<img src="otherdomain.com" crossorigin="Anonymous" />

<!-- Or with Javascript -->
<script>
  var image = new Image();
  image.crossOrigin = "Anonymous";
  ...
</script>
```

不过这样的前提是你的图片服务器请求头中必须带有 `Access-Control-Allow-Origin "*"` ,否则就会提示跨域问题

PS: 如果无法处理图片服务器,可以利用 `cors-anywhere` 进行中转,或自行搭建代理

```
https://cors-anywhere.herokuapp.com/${url}
```

#### 你不能控制 `img`

如果你没法拿到 image 的 src 只能通过禁用 chrome 的同源策略才能解决

禁用方法(以 macOS 为例):

macOS:

```bash
open -a "/Applications/Google Chrome.app" --args \
--disable-web-security  \
--user-data-dir=/Users/{your account name}/chromeTempData/
```

第一次打开如下图,就说明已经禁用同源策略了: ![](https://gw.alipayobjects.com/zos/antfincdn/hokkCFfJB9/1a018628-ae13-4fbc-82c4-eac5626e33c6.png)
