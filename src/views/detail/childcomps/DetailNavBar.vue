<template>
  <nav-bar>
    <div slot="left">
      <img src="~assets/img/common/back.svg" class="back" @click="backClick" />
    </div>
    <div slot="center" class="title">
      <div
        v-for="(item,index) of titles"
        :key="index"
        class="nav-item"
        @click="itemClick(index)"
        :class="{active:currentIndex==index}"
      >{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  props: {
    titles: {
      type: Array,
      default() {
        return ["商品", "参数", "评论", "推荐"];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      // 发送点击事件
      this.$emit("titleDetailClick", index);
    },
    backClick() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
  padding: 0 20px;
}
.nav-item {
  flex: 1;
}
.nav-item.active {
  color: var(--color-high-text);
}
.back {
  margin-top: 12px;
}
</style>