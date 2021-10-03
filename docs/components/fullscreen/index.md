# Fullscreen 全屏

全屏组件。

### 何时使用

当用户需要将某一区域进行全屏展示时。

### 沉浸式全屏

充满整个显示器屏幕的沉浸式全屏（待完善）。



### 普通全屏

充满当前浏览器窗口的普通全屏。

:::demo

```vue
<template>
  <d-fullscreen :mode='"normal"' @fullscreenLaunch='fullscreenLaunch'>
    <div fullscreen-target>
      <d-button bsStyle="common" fullscreen-launch>{{btnContent}}</d-button>
    </div>
  </d-fullscreen>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const btnContent = ref('普通')
    const fullscreenLaunch = (val) => {
      if (val) {
        btnContent.value = '退出'
      } else {
        btnContent.value = '普通'
      }
    }
    return {
      btnContent,
      fullscreenLaunch
    }
  },
}
</script>
```
:::

### 参数及API

|    参数     |   类型   |   默认    | 说明                     |
| :---------: | :------: | :-------: | :----------------------- |
|    mode     | `immersive` 或 `normal` |    `immersive`    | 可选，设置全屏模式          |
|    zIndex     | `Number` |  10  | 可选，设置全屏层级           |
|    fullscreenLaunch    | `EventEmitter<boolean>` |  | 可选，全屏之后的回调           |