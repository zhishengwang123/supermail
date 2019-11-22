<template>
<div class="wrapper" ref="wrapper">
  <div class="content">
    <slot></slot>
  </div>
  
</div>
</template>
<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      dafault: 0
    },
    pullUpLoad: {
      type: Boolean,
      dafault: false
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    //创建Scroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    });
    //监听scroll滚动的位置
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on("scroll", position => {
        //console.log(position);
        this.$emit("scroll", position);
      });
    }

    //监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //scroll滚动到某一位置
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    //上拉下载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    //刷新scroll重新计算
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
};
</script>
<style scoped>
</style>