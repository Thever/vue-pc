<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(carousel, index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
//  引入swiper
import Swiper from 'swiper'
export default {
  name: 'Carousel',
  props:['list'],
  watch: {
    list: {
      handler(newValue, oldValue) {
        //  监听到数据已经有，但是v-for动态渲染的结构还是没有办法确定，因此还是需要用到nextTick
        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项
            autoplay: {
              delay: 2000, //2秒切换一次
              disableOnInteraction: false, //  用户操作swiper之后，不禁止autoplay
            },
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true, // 点击分页器能切换图片
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      },
      //  立即监听：不管你数据有没有变化，上来就立即监听过一次
      //  为啥watch监听不到list？因为这个数据从来没有发生变化(数据是父组件传入的，传入的数据的时候就是一个对象，包含了所有的数据，传入的数据也没有发生变化)
      immediate: true,
    },
  },
}
</script>

<style>
</style>