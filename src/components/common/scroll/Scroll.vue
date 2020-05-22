<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BestScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null
    };
  },
  props: {
    // 通过父组件传递过来的probeType决定当前是否派发scroll事件
    probeType: {
      type: Number,
      default: 0
    },
    // 是否允许向上加载
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    // 加载完成之后
    // 1.创建BScroll对象
    this.scroll = new BestScroll(this.$refs.wrapper, {
      //在滚动内,按钮是否可用
      click: true,
      // 实时派发scroll事件,3表示实时,0,表示不触发
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    // 2.页面挂载完成就回到顶部
    this.scroll.scrollTo(0, 0);

    //3. 监听事件滚动的位置scroll(在挂载完成之后就要监听)
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", position => {
        // position是滚动到当前位置的坐标
        // console.log(position);
        // 监听位置滑动到指定位置则隐藏backtop
        // 发送当前位置给父组件
        this.$emit("scroll", position.y);
      });
    }

    // 4.页面加载事件的监听
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // 将事件发送给父组件,让父组件进行处理,触发该事件会自动进行加载(pullUpLoad=true的情况下)
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 表示上一次加载结束
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    // 回到顶部方法的封装
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 刷新方法refresh()
    refresh() {
      // 刷新页面重新计算当前的scroll
      this.scroll && this.scroll.refresh();
      // console.log("refresh"); //设置防抖操作效果
    },
    // 获取当前滚动的Y位置
    getScrollY() {
      return this.scroll && this.scroll.y;
    }
  }
};
</script>

<style scoped>
</style>