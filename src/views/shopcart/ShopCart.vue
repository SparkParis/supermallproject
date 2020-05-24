<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartCount}})</div>
    </nav-bar>
    <scroll class="cart-list" ref="scroll">
      <cart-list />
    </scroll>
    <cart-bottom></cart-bottom>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/scroll/Scroll";
import CartList from "./childComps/CartList";
import CartBottom from "./childComps/CartBottom";
// 导入getters的辅助函数
import { mapGetters } from "vuex";

export default {
  name: "ShopCart",
  components: {
    NavBar,
    Scroll,
    CartList,
    CartBottom
  },
  computed: {
    ...mapGetters(["cartCount"])
  },
  activated() {
    // 跳到cart页面就刷新scroll获取scrollHeight
    this.$refs.scroll.refresh();
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.cart-list {
  height: calc(100% - 44px - 49px - 44px);
  overflow: hidden;
}
</style>