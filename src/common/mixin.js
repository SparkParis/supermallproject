import { debounce } from './utils'
import BackTop from "components/content/backtop/BackTop";
import { TOP_POSITION } from './const'

export const imageLoadMixin = {
  data() {
    return {
      itemImageLister: null,
      newRefresh: null
    }
  },
  mounted() {
    // 获取到防抖函数
    this.newRefresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImageLister = () => {
      this.newRefresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImageLister);

  },
}
// 回到顶部混入
// 注意混入是一个对象
export const backToMixin = {
  data() {
    return {
      isShowTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 判断回到顶部按钮是否显示
    backTopPosition(position) {
      this.isShowTop = -position > TOP_POSITION;
    },
    topBackClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    }
  }

}