<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id" @click="changeCurrentIndex(index)">
        <img :src="slide.imgUrl" :class="{active: index == currentIndex}">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>

  import Swiper from 'swiper'
  //  $nextTick
  export default {
    name: "ImageList",
    props:[
      'skuImageList'
    ],
    data(){
      return {
        currentIndex:0,
      }
    },
    watch:{
      //  监听数据：可以保证数据ok，但是不能保证v-for遍历结构是否渲染完成
      skuImageList(newValue, oldValue){
        //  保证循环遍历完成以后
        this.$nextTick(() => {
          //  初始化swiper实例
          let mySwiper = new Swiper(this.$refs.cur, {
            // direction: 'vertical', // 垂直切换选项
            // loop: true, // 循环模式选项
            // autoplay: {
            //   delay: 2000, //2秒切换一次
            //   disableOnInteraction: false, //  用户操作swiper之后，不禁止autoplay
            // },
            // 如果需要分页器
            // pagination: {
            //   el: '.swiper-pagination',
            //   clickable: true, // 点击分页器能切换图片
            // },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            //  同时展示3个内容
            slidesPerView:3,
            //  定义2个内容为一组 --> 点击一次切换2个 --> 切换图片的个数
            // slidesPerGroup:2,
          })
        })
      },
    },
    methods:{
      //  图片点击处理
      changeCurrentIndex(index){
        //  更改选中样式
        this.currentIndex = index
        //  通知放大镜更改展示图片的序号(因为使用相同的数据源)
        this.$bus.$emit('getIndex', index)
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