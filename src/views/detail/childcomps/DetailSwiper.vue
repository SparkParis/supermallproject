<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item,index) of topImages" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
// 导入轮播图组件
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.detail-swiper {
  height: 300px;
}
</style>