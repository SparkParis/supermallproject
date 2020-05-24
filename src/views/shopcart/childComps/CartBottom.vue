<template>
  <div class="cart-bottom">
    <div class="select-all">
      <check-button class="select-all-button" :is-checked="isSelect" @click.native="allCheckClick"></check-button>
      <span class="select-all-text">全选</span>
    </div>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="buy" @click="calcClick">去计算({{cartList.length}})</span>
  </div>
</template>

<script>
import CheckButton from "./CheckButton";
import { mapGetters } from "vuex";
export default {
  name: "CartBottom",
  components: {
    CheckButton
  },
  methods: {
    allCheckClick() {
      if (this.isSelect) {
        this.cartList.forEach(item => {
          item.checked = false;
        });
      } else {
        this.cartList.forEach(item => {
          item.checked = true;
        });
      }
    },
    calcClick() {
      if (!this.isSelect) {
        this.$toast.show("请选择购买的商品 ");
      }
    }
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      const cartList = this.cartList;
      return cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return (preValue += item.count * item.price);
        }, 0)
        .toFixed(2);
    },
    isSelect() {
      if (this.cartList.length == 0) {
        return false;
      } else {
        return (
          this.cartList.filter(item => {
            return item.checked;
          }).length == this.cartList.length
        );
      }
      // return this.cartList.find(item => item.checked === false) === undefined;
    }
  }
};
</script>

<style scoped>
.cart-bottom {
  height: 44px;
  background-color: #eee;
  color: #888;
  display: flex;
}
.select-all {
  width: 80px;
  display: flex;
  /* flex布局中设置垂直居中,此时的line-height不起作用 */
  align-items: center;
}
.select-all-button {
  width: 20px;
  height: 20px;
  margin-left: 10px;
  margin-right: 5px;
}
.total-price {
  flex: 1;
  line-height: 44px;
  text-align: center;
}
.buy {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 44px;
  text-align: center;
  line-height: 44px;
}
</style>