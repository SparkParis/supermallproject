<template>
  <div class="recommend">
    <div v-for="(item,index) of recommend" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
      </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommend",
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style>
/* 设置样式 */
.recommend {
  display: flex;
  /* 宽度设置100%,在一行显示 */
  width: 100%;
  font-size: 12px;
  text-align: center;
  padding: 10px 0 20px;
}
.recommend-item {
  /* 均等划分 */
  flex: 1;
}
.recommend-item img {
  /* 图片过大.这里需要设置图片大小 */
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>