<template>
  <div id="profile">
    <nav-bar class="nav">
      <div slot="center">我的档案</div>
    </nav-bar>
    <user-info />
    <normal-list-view :list-data="orderList" />
    <account-info :list-data="serviceList" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import UserInfo from "./childcomps/UserInfo";
import NormalListView from "./childcomps/NormalListView";
import AccountInfo from "./childcomps/AccountInfo";

export default {
  name: "Profile",
  components: {
    NavBar,
    UserInfo,
    NormalListView,
    AccountInfo
  },
  data() {
    return {
      orderList: [
        { icon: "message.svg", info: "我的消息" },
        { icon: "pointer.svg", info: "积分商城" },
        { icon: "vip.svg", info: "会员卡" }
      ],
      serviceList: [
        { icon: "cart.svg", info: "我的购物车" },
        { icon: "shopping.svg", info: "下载购物APP" }
      ]
    };
  }
};
</script>

<style scoped>
#profile {
  background-color: #f2f2f2;
}

.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>