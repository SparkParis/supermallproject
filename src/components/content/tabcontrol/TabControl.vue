<template>
  <div class="tab-control">
    <!-- 这里只有title不一样直接用数组遍历的方式即可 -->
    <div
      v-for="(item,index) of titles"
      :key="index"
      :class="{active:index==currentIndex}"
      @click="tabClickControl(index)"
      class="tab-control-item"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    tabClickControl(index) {
      this.currentIndex = index;
      // 将子组件点击的信息传递给父组件,父组件根据对应的内容进行展示

      this.$emit("tabclick", index);
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-text);
}
/* 点击的下面添加边框 */
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>