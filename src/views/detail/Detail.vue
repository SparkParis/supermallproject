<template>
  <div id="detail">
    <detail-nav-bar @titleDetailClick="titleDetailClick" ref="nav" />
    <scroll class="detail-content" ref="scroll" :probeType="3" @scroll="contentScroll">
      <!-- 注意浏览器不区分大小写,驼峰式变小写-连接 -->
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :params-info="paramsInfo" ref="paramsInfo" />
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo" />
      <goods-list :goods="recommendList" ref="recommendInfo" />
    </scroll>
    <!-- 底部工具栏的使用   -->
    <detail-bottom-bar @addCartClick="addCartClick" />
    <!-- 回到顶部 -->
    <back-top @click.native="topBackClick" v-show="isShowTop" @addCartClick="addCartClick" />
  </div>
</template>

<script>
import DetailNavBar from "./childcomps/DetailNavBar";
import DetailSwiper from "./childcomps/DetailSwiper";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import Scroll from "components/common/scroll/Scroll";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
// 推荐数据的展示goodslist
import GoodsList from "components/content/goods/GoodList";
import DetailBottomBar from "./childcomps/DetailBottomBar";
import BackTop from "components/content/backtop/BackTop";

// 调入actions的辅助函数mapActions直接使用action中的方法
import { mapActions } from "vuex";

import { imageLoadMixin, backToMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParams,
  getRecommend
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      // 轮播图数据
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTops: [],
      currentIndex: 0
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Scroll
  },
  mixins: [imageLoadMixin, backToMixin],
  methods: {
    // actions中的方法
    ...mapActions(["addToCart"]),

    imageLoad() {
      // 图片加载完成之后重新加载scroll
      // this.$refs.scroll.refresh();
      // 调入混入中的方法,和home中的监听一样,也可以直接添加到事件总线中解决防抖问题
      this.newRefresh();
      // 1.实现点击主题->对应位置
      // 图片加载完成之后获取对应的offsetTop
      this.getThemeTops();
    },
    // 给themeTop传值,返回结果,执行时间在图片加载完成之后
    getThemeTops() {
      this.themeTops = [];
      this.themeTops.push(0);
      this.themeTops.push(this.$refs.paramsInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
      this.themeTops.push(this.$refs.recommendInfo.$el.offsetTop);
      return this.themeTops;
    },
    // 详情页主题点击事件
    titleDetailClick(index) {
      // 单击注意主题之后跳转到指定位置,这里通过数组的方式保存主题对应的位置所在,通过ref获取指定的元素
      // 跳转到指定位置
      this.$refs.scroll.scrollTo(0, -this.themeTops[index], 500);
    },
    // 2.实现滚动对应位置->显示对应主题
    // 获取滚动事件
    contentScroll(position) {
      //1. topBack显示与隐藏
      this.backTopPosition(position);

      // 2. 根据滚动的位置获取currentIndex的主题序号发送给NavBar
      position = -position;
      let length = this.themeTops.length;
      for (let i = 0; i < length; i++) {
        let iPos = this.themeTops[i];
        // 这里的条件要分开判断
        //<length-1和==length-1
        if (
          (i < length - 1 &&
            position >= iPos &&
            position < this.themeTops[i + 1]) ||
          (i === length - 1 && position >= this.themeTops[i])
        ) {
          if (this.currentIndex !== i) {
            this.currentIndex = i;
          }
          break;
        }
      }
      // 传值给子组件
      this.$refs.nav.currentIndex = this.currentIndex;
    },

    // 加入购物车点事件
    addCartClick() {
      // 将商品信息添加到购物车中
      const obj = {};
      obj.iid = this.iid;
      obj.imgUrl = this.topImages[0];
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.price = this.goods.lowNowPrice;

      // 加入store,发送请求,注意这里返回的是promise对象,可以直接通过then
      // 1.写法1
      // this.$store.dispatch("addToCart", obj);
      // 2.写法2(mapActions)
      this.addToCart(obj).then(res => {
        this.$toast.show(res);
      });
    },

    // networks详情获取
    _getDetail(iid) {
      // 2.发送请求获取数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        //1.保存数据到data中
        let data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.创建基本信息的class实例保存信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3.获取商家信息
        this.shop = new Shop(data.shopInfo);

        // 4.获取商品详情信息
        this.detailInfo = data.detailInfo;

        // 5.保存参数信息
        this.paramsInfo = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 6.获取评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      }); // 2.发送请求获取数据
      getDetail(this.iid).then(res => {
        //1.保存数据到data中
        let data = res.result;
        this.topImages = data.itemInfo.topImages;

        // 2.创建基本信息的class实例保存信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 3.获取商家信息
        this.shop = new Shop(data.shopInfo);

        // 4.获取商品详情信息
        this.detailInfo = data.detailInfo;

        // 5.保存参数信息
        this.paramsInfo = new GoodsParams(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 6.获取评论数据
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    _getRecommand() {
      getRecommend().then(res => {
        this.recommendList = res.data.list;
      });
    }
  },
  created() {
    //1. 获取iid,并保存
    this.iid = this.$route.params.iid;
    // 获取详情页数据
    this._getDetail(this.iid);

    // 获取推荐数据
    this._getRecommand();
  }
};
</script>

<style scoped>
/* 设置样式覆盖tabbar */
#detail {
  position: relative;
  z-index: 9;
  /* 设置背景颜色完全覆盖 */
  background-color: #fff;

  /* 设置视口 */
  height: 100vh;
}
.detail-content {
  /* 通过计算的方式 */

  height: calc(100% - 44px - 49px);
  overflow: hidden;
  position: relative;
}
</style>