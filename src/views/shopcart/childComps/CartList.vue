<template>
  <div>
    <div v-for="(item,index) of cartList" :key="index">
      <cart-list-item :cartListItem="item" />
    </div>
  </div>
</template>

<script>
import CartListItem from "./CartListItem";

import { mapGetters } from "vuex";

export default {
  name: "CartList",
  computed: {
    ...mapGetters({
      // 辅助函数可以进行重命名
      cartList: "cartList"
    })
  },
  components: {
    CartListItem
  }
};
</script>

<style>
</style>