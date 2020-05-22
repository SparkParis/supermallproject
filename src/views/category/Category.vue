<template>
  <div class="wrapper" ref="wrapper">
    <ul class="content">
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
      <li>分类类别</li>
    </ul>
  </div>
</template>

<script>
//导入插件
import BestScroll from "better-scroll";
export default {
  name: "Category",
  data() {
    return {
      scroll: null
    };
  },
  created() {},
  // 组件创建完后调用
  mounted() {
    // 样式挂载之后就使用滚动插件,参数1:dom对象,可以通过类名会自定加载,这里直接通过dom对象获取有问题,应该是class中有多个wrapper,
    this.scroll = new BestScroll(this.$refs.wrapper, {
      // 设置属性获取滚动的距离
      probeType: 3,
      pullUpLoad: true
    });
    // 添加滚动事件
    this.scroll.on("scroll", function(position) {
      console.log(position);
    });
    // 添加上拉加载更多事件
    this.scroll.on("pullingUp", function() {
      console.log("上拉加载");
      // this.scroll.finishPullUp();
    });
  }
};
</script>

<style scoped>
.wrapper {
  height: 400px;
  background-color: #ff0;
  overflow: hidden;
  /* 原生的局部滚动 */
  /* overflow: scroll; */
}
</style>