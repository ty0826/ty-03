<template>
  <div class="swiper-container" ref="sur">
    <div class="swiper-wrapper">
      <div class="swiper-slide"   v-for="(item,indexs) in skuImageList" :key="item.id">
        <img :class="{active:indexs==index}" style="cursor: pointer;" @click="changeIndex(indexs)" :src="item.imgUrl" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  props: ['skuImageList'],
  name: 'ImageList',
  data(){
    return{
      index:0//默认第一张图片高亮
    }
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        var mySwiper = new Swiper('.swiper-container', {
          autoplay: true,
          loop: true, // 循环模式选项
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          //页面的图片数
           slidesPerView: 3,
        })
      })
    }
  },
  methods:{
    changeIndex(index){
      this.index=index
      //兄弟组件传值
      this.$bus.$emit('getindex',index)
    }
  }
}
</script>

<style lang="less" scoped>

.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      // &:hover {
      //   border: 2px solid #f60;
      //   padding: 1px;
      // }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
