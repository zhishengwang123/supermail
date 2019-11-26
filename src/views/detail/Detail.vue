<template>
<div class="detail">
  <detail-nav-bar></detail-nav-bar>
  <scroll class="content">
  <detail-swiper :top-images="topImages"/>
  <detail-base-info :goods="goodsInfo"/>
  <detail-shop-info :detail-info="detailInfo"/>
  <detail-params-info :params-info="paramsInfo"/>
  <detail-comment-info :comment-info="itemParams"/>
  <goods-list :goods="recomments"/>]
  </scroll>
</div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailParamsInfo from "./childComps/DetailParamsInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";

import { getDetail, Goods, Shop, getRecommend } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {
        type: Object,
        default() {
          return {};
        }
      },
      shop: {},
      detailInfo: {},
      paramsInfo: {},
      commentInfo: {},
      recomments: {}
    };
  },
  components: {
    DetailNavBar,
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailImageInfo,
    DetailShopInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList
  },
  created() {
    //保存传入的iid
    this.iid = this.$route.params.iid;

    //根据iid请求详情数据
    getDetail(this.iid).then(res => {
      //获取顶部的轮播图数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      //获取商品数据
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //创建店铺信息的对象
      this.shop = new Shop(data.shopInfo);

      //保存商品详情的数据
      this.detailInfo = data.detailInfo;

      //取出参数的信息
      this.paramsInfo = data.itemParams;
      //取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      //请求推荐数据
      getRecommend().then(res => {
        this.recomments = res.data.list;
      });
    });
  }
};
</script>
<style scoped>
</style>