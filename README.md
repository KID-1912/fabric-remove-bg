# fabric-remove-bg

<h3 align="center">
  基于 Fabric.js 的图片编辑工具，结合remove.bg API 能够实现图片背景的快速去除。
</h3>

[在线示例demo](https://kid-1912.github.io/fabric-remove-bg)

<br/>

[![](https://raw.githubusercontent.com/KID-1912/Github-PicGo-Images/master/2024/10/10/20241010120320.png)](https://kid-1912.github.io/fabric-remove-bg)

<br/>

---

## Features

- 去除背景：remove.bg API 去除图片背景

- 修改背景：设置图片背景图、背景色

- 画笔绘图：擦除/修补图片内容

- 历史记录：撤销/重做

- 查看图片：拖拽、缩放

- 本地上传/下载图片

- 裁剪图片(todo)

## Remove.bg API

Configure your API key in `.env` file

```bash
VITE_REMOVE_BG_API_KEY=your_remove.bg_api_key
VITE_REMOVE_BG_API_KEY2=your_clipdrop_api_key
```

you can get your API key from [remove.bg](https://www.remove.bg/api#remove-background)
you can get your API key2 from [clipdrop API](https://clipdrop.co/apis/)

**Note**：

`VITE_APP_REMOVE_BG_KEY` is the key for _remove.bg API_;

`VITE_APP_REMOVE_BG_KEY2` is the key for _clipdrop API_;

**Usage**：

Check the [`src/pages/index/composables/useRemoveBg.js`](https://github.com/KID-1912/fabric-remove-bg/blob/master/src/pages/index/composables/useRemoveBg.js) call api methods：

```js
const blob = await http.fetchRemoveBg(params); // 使用 remove.bg API
// const blob = await http.fetchRemoveBg2(params); // 使用 clipdrop API
```

## Development

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
```

**Relations**

[fabric.js](https://github.com/fabricjs/fabric.js)

[remove.bg API](https://www.remove.bg/zh/api)

[fabric-eraser-brush](https://www.npmjs.com/package/fabric-eraser-brush)

[fabricjs-history](https://www.npmjs.com/package/fabricjs-history)
