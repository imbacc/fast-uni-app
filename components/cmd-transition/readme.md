### Transition 动画

动画组件，组件名：``cmd-transition``，代码块： cmdTransition。

**使用方式：**

在 ``script`` 中引用组件 

```javascript
import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
export default {
    components: {cmdTransition}
}
```

用法    
H5内容变化时动画自动执行，非H5需要重新创建组件实例才会执行。

```html
<!-- data属性 show: true -->
<button type="primary" v-on:click="show = !show">你好</button>
<!-- 使用示例 -->
<!-- #ifdef H5 -->
<cmd-transition name="fade">
  <view v-if="show">你好，uni-app</view>
</cmd-transition>
<!-- #endif -->

<!-- #ifndef H5 -->
<cmd-transition v-if="show" name="fade">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="fade-up">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="fade-down">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="fade-left">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="fade-right">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="slide-up">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="slide-down">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="slide-left">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="slide-right">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="bounce">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="punch">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="zoom">
  <view>你好，uni-app</view>
</cmd-transition>
<cmd-transition v-if="show" name="fly">
  <view>你好，uni-app</view>
</cmd-transition>
<!-- #endif -->
```
 
**属性说明：**

|属性名	|类型		|默认值	|说明		|
|---		|----		|---		|---		|
|name		|String	|fade		|动画名	|

```html
使用动画名
淡入淡出： fade、fade-up、fade-down、fade-left、fade-right
滑动： slide-up、slide-down、slide-left、slide-right
弹动： bounce
中部弹出： zoom
中部弹入： punch
飞入： fly
```
