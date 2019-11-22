<template>
<div>
  <detail-nav-bar></detail-nav-bar>
  <detail-swiper :top-images="topImages"></detail-swiper>
</div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";

import { getDetail } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: []
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper
  },
  created() {
    //保存传入的iid
    //this.iid = this.$route.params.iid;

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      this.topImages = res.result.itemInfo.topImages;
    });
  }
};
</script>
<style scoped>
</style>