import { debounce } from "./utils";

export const itemListenerMinix = {
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 1000)
    this.itemImgListener = () => {
      newRefresh()
    }
    this.$bus.$on('itemImgLoad', this.itemImgListener)
  }

}