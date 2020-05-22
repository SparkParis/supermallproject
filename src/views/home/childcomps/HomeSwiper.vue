<template>
  <swiper>
    <swiper-item v-for="(item,index)  of banner" :key="index">
      <a :href="item.link">
        <img :src="item.image
              " alt @load="imageload" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
// 默认获取下面的index.js文件
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: "HomeSwiper",
  data() {
    return {
      // 用于记录图片是否加载完成的状态
      isLoad: false
    };
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    // 获取父组件传递过来的值
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageload() {
      if (!this.isLoad) {
        // 向父组件发送加载完成的请求
        this.$emit("swiperImageLoad");
        this.isLoad = true;
      }
    }
  }
};
</script>

<style>
</style>