# fabric-remove-bg

**需求提出**

BasePanel 可拖动位置，触摸有粉笔cursor，且支持调整粉笔半径，可缩放的hook能力

FabricPanel Fabric的canvas画布
useFabric 创建Fabric的画布,支持画笔，历史记录等

一个画板，支持左右对画布涂抹，画笔修改

抠图接口，自动抠图

这些不讲但实现掉 历史记录 设置颜色与背景

@use-gesture 实现拖拽

vue-drag-resize 实现自定义/按比例裁剪

**具体实现**

- 搭建index页面，左右两个面板布局，容器relative

- BasePanel 实现基础面板能力

  - 拖拽√，编写useDraggable.js，使用use-gesture实现
  - 缩放

- FabricPanel 实现画布面板的能力
  - 独立FabricPanel组件，包含初始化 fabric 画布，并绘制底图(initFabricCanvas),自适应宽高和居中位置实现
  - 编写useFabric.js增强fabric能力，可绘画画笔(fabric-eraser-brush + isDrawingMode)
  - 笔触（cursor）支持,Cursor.vue + provide/inject
  - 画笔实现：擦除,画笔大小:实现FabricPanel的setIsDrawingMode
    setDrawingBrush，修补实现：添加一个默认被擦除的底图至于抠图下层
  - 拖拽和绘制模式切换,画布位置联动

### clipdrop API

https://clipdrop.co/apis/docs/remove-background

Your user ID is 3ne3zDTGfYS4OUWNT6QZBWdIZWT2

Your email is heyutongxue@gmail.com

api key 9b53c57298957089000f5996d17ef2e5162608a32fe3a5bda03a99fef442e9895043303f160381bda29d836d37adf8bf

### remove-api

Bmg4H1JDpvJRxCFh1x4fBt5E

https://www.remove.bg/g/developers

image_file
size: "auto"

x-api-key Bmg4H1JDpvJRxCFh1x4fBt5E
