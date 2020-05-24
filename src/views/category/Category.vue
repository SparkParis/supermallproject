<template>
  <div class="category">
    <!-- 标题导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <!-- 内容 -->
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem" />
      <tab-control
        @tabclick="tabClick"
        :titles="['综合', '新品', '销量']"
        class="tab-control-isshow"
        ref="tabControl1"
        v-show="isShowTabControl"
      />
      <scroll id="tab-content" ref="scroll" @scroll="contentScroll" :probeType="3">
        <div>
          <tab-content-category :subcategories="subcategories" @imgLoad="imgLoad" />
          <tab-control @tabclick="tabClick" :titles="['综合', '新品', '销量']" ref="tabControl" />
          <good-list :goods="categoryDetailList" />
        </div>
      </scroll>
      <back-top @click.native="topBackClick" v-show="isShowTop" />
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childcomps/TabMenu";
import Scroll from "components/common/scroll/Scroll";
import TabContentCategory from "./childcomps/TabContentCategory";
import TabControl from "components/content/tabcontrol/TabControl";
import GoodList from "components/content/goods/GoodList";
import BackTop from "components/content/backtop/BackTop";

import { POP, NEW, SELL } from "common/const";
import { backToMixin, tabControlMixin } from "common/mixin";
import { debounce } from "common/utils";

// 网络请求
import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "network/category";

export default {
  name: "Category",
  data() {
    return {
      categories: [],
      categoryData: {},

      subcategories: {},
      categoryDetailList: [],
      currentIndex: 0,
      // 吸顶效果的tabControl是否显示
      isShowTabControl: false,
      // 获取当前tabControl的offsetTop
      tabControlOffset: 0
    };
  },
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    GoodList,
    BackTop,
    Scroll
  },
  mixins: [backToMixin, tabControlMixin],
  computed: {
    // // 获取子目录
    // showSubcategory() {
    //   if (this.currentIndex == -1) return {};
    //   this.subcategories = this.categoryData[this.currentIndex].subcategories;
    //   return this.subcategories;
    // },
    // // 获取子目录下的详细信息
    // showCategoryDetail() {
    //   if (this.currentIndex == -1) return {};
    //   return this.categoryData[this.currentIndex].categoryDetail[
    //     this.currentType
    //   ];
    // }
  },
  created() {
    // 1.页面创建就加载数据
    this._getCategory();
  },
  methods: {
    /*事件点击相关的方法*/
    selectItem(index) {
      this._getSubcategories(index);
      // 回到顶部
      this.$refs.scroll.scrollTo(0, 0, 100);
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP;
          break;
        case 1:
          this.currentType = NEW;
          break;
        case 2:
          this.currentType = SELL;
          break;
      }
      // 确保点击的两个的tabControl的选项是一致的
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl.currentIndex = index;
    },
    // 滚动事件
    contentScroll(position) {
      // backTop显示与隐藏,v-show指令
      // this.isShowTop = -position > 1000;
      this.backTopPosition(position);

      // 吸顶的tabControl是否显示,滚动事件监听的位置>tbControl时显示

      this.isShowTabControl = -position + 44 >= this.tabControlOffset;
    },
    // tabcontentCategory加载完成
    imgLoad() {
      // 图片加载完成
      // 重新计算tabControl的offsetTop
      // 组件不能直接计算offsetTop只有dom元素才行,$el可以获取组件的绑定的dom元素
      this.tabControlOffset = this.$refs.tabControl.$el.offsetTop;
    },

    /*网络请求相关的方法*/

    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个类别的子数据
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              pop: [],
              new: [],
              sell: []
            }
          };
        }
        // 3.请求第一个分类数据
        this._getSubcategories(0);
      });
    },
    _getSubcategories(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;

      getSubCategory(mailKey).then(res => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        if (this.currentIndex == index) {
          this.subcategories = this.categoryData[
            this.currentIndex
          ].subcategories;
        }

        this._getCategoryDetail(POP);
        this._getCategoryDetail(SELL);
        this._getCategoryDetail(NEW);
      });
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type)
        .then(res => {
          // 3.将获取的数据保存下来
          this.categoryData[this.currentIndex].categoryDetail[type] = res;
          this.categoryData = { ...this.categoryData };
        })
        .then(res => {
          if (this.currentType == type) {
            this.categoryDetailList = this.categoryData[
              this.currentIndex
            ].categoryDetail[this.currentType];
          }
        });
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
.content {
  display: flex;
  height: calc(100vh - 44px - 49px);

  overflow: hidden;
}
#tab-content {
  height: 100%;
  flex: 1;
}
.tab-control-isshow {
  /* 设置相对定位,是的吸附的tabControl层级最高,只有设置了position,才能使用z-index */
  position: fixed;
  left: 100px;
  right: 0;
  z-index: 9;
}
</style>