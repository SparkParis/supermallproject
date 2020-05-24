<template>
  <div class="nav-bar">
    <!--设置导航栏的具名插槽:将每个插槽包裹在div标签中方便在后期设置样式 -->
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
.nav-bar {
  /* 设置布局flex */
  display: flex;
  /* 44->64 */
  height: 44px;
  line-height: 44px;
  /* 设置字体居中 */
  text-align: center;
  /* 设置导航阴影 */
  box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1);
}
.left,
.right {
  width: 60px;
}
.center {
  /* 设置宽度之后就可以,其与部分设置flex */
  flex: 1;
}
</style>