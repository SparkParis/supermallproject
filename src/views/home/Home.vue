<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物车</div>
    </nav-bar>
    <!-- 设置吸顶效果:滑动到指定位置让它显示 -->
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control-isshow"
      @tabclick="tabClick"
      ref="tabControl1"
      v-show="isShowTabControl"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad" />
      <home-recommend :recommend="recommend" />
      <home-feature />
      <tab-control :titles="['流行', '新款', '精选']" @tabclick="tabClick" ref="tabControl" />

      <good-list :goods="showGoods" />
    </scroll>
    <!-- 回到顶部是并列的,这里需要使用组件的事件的修饰符native来监听根元素的点击事件,并在兄弟组件之间进行信息的传递 ,同时为兄弟子组件设置ref属性便于获取-->
    <back-top @click.native="topBackClick" v-show="isShowTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "components/content/goods/GoodList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backtop/BackTop";

import { debounce } from "common/utils";
import { imageLoadMixin, backToMixin } from "common/mixin";

import HomeSwiper from "views/home/childcomps/HomeSwiper";
import HomeRecommend from "views/home/childcomps/HomeRecommend";
import HomeFeature from "views/home/childcomps/HomeFeature";

import { getHomeMultidata, getHomeGoods } from "network/home";
export default {
  name: "Home",
  data() {
    return {
      // multidata中的数据
      banner: [],
      recommend: [],
      dKeyword: [],
      keywords: [],
      // goods中的数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      // isShowTop: false,
      // 获取当前tabControl的offsetTop
      tabControlOffset: 0,
      // 吸顶效果的tabControl是否显示
      isShowTabControl: false,
      // 离开时保存当前的位置
      saveY: 0
    };
  },
  activated() {
    // 判断一下是否移动
    if (this.saveY < 0) {
      this.$refs.scroll.scrollTo(0, this.saveY);
    }
  },
  deactivated() {
    //离开时保存当前的位置
    this.saveY = this.$refs.scroll.getScrollY();
  },

  created() {
    //发送请求之后保存数据,这里的res返回的是拦截器过滤之后的数据(res.data),将方法封装在methods中在created中直接通过this调用methods中的方法(封装)
    // 1.保存更多数据(这里的getHomeMultidata是methods中的方法)

    this.getHomeMultidata();
    // 2.获取goods
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },

  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixins: [imageLoadMixin, backToMixin],
  mounted() {
    // 3.图片加载完成就刷新scroll,保证最新的scrollHeight,一定要在mounted挂载之后在获取组件,否则会出现组件不存在的情况
    // 这里需要设置防抖操作,在每个图片加载完都请求刷新服务器压力大,设置防抖(定时器),减少刷新次数
    // const refresh = debounce(this.$refs.scroll.refresh, 800);
    // this.$bus.$on("itemImageLoad", () => {
    //   refresh();
    // });
    // 封装之后放在mixin的混入对象中
  },
  methods: {
    /*
    事件监听
    */
    //  tanControl点击事件
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 确保点击的两个的tabControl的选项是一致的
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    // 子组件backtop点击事件(封装在混入中)
    // topBackClick() {
    // 通过ref获取到子组件,获取到scroll子组件中的scroll属性,通过该属性的scrollTo()方法回到顶部
    // this.$refs.scroll.scroll.scrollTo(0, 0, 500);
    //通过调用子组的方法来回到顶部
    // this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    contentScroll(position) {
      // backTop显示与隐藏,v-show指令
      // this.isShowTop = -position > 1000;
      this.backTopPosition(position);

      // 吸顶的tabControl是否显示,滚动事件监听的位置>tbControl时显示
      this.isShowTabControl = -position >= this.tabControlOffset;
    },

    // 加载更多内容展示
    loadMore() {
      // 加载事件之后的操作,会将加载的事件添加到对应的list中
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      //轮播图图片加载完成
      // 重新计算tabControl的offsetTop
      // 组件不能直接计算offsetTop只有dom元素才行,$el可以获取组件的绑定的dom元素
      this.tabControlOffset = this.$refs.tabControl.$el.offsetTop;
    },

    /*
    网络请求相关的方法
    */
    getHomeMultidata() {
      // 这里的getHomeMultidata是从网络请求模块中导入的方法
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
        this.dKeyword = res.data.dKeyword.list;
        this.keywords = res.data.keywords.list;
      });
    },
    getHomeGoods(type) {
      // 这里默认加载的是第一页,在图片懒加载之后需要修改page和将加载的数据保存在对应的数组中,通过剩余参数的方式,将加载的数据push到数组中

      const page = this.goods[type].page + 1;
      type = type + "";
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 加载完成之后需要finishedPullUp,不然后续不会再加载
        this.$refs.scroll.finishPullUp();
      });
    }
  },
  components: {
    HomeSwiper,
    HomeRecommend,
    HomeFeature,

    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
/* 给不同的页面设置背景颜色 */
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 设置原生滚动时,为了不让导航跟随鼠标一起滚动设置的绝对定位,但是现在使用的是better=scroll的局部滚动,导航栏的部分就不会脱标了 */
  /* 设置固定定位 */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0; */
  /* 设置级别 */
  /* z-index: 3; */
}
/* .tab-control {
  设置吸附 
  position: sticky;
  top: 44px;
  z-index: 9;
} */
.tab-control-isshow {
  /* 设置相对定位,是的吸附的tabControl层级最高,只有设置了position,才能使用z-index */
  position: relative;
  z-index: 9;
}
/* 局部滚动需要设置高度 */
/* 方式1:绝对定位的方式 */
.content {
  /* 注意这里的hidden会使sticky吸附失效,删除隐藏则可以正常显示吸附效果 */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
/* 方式2 */
/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */
</style>