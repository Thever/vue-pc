<template>
  <div class="spec-preview">
    <!-- 背景图 -->
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <!-- 放大图 -->
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:[
      'skuImageList'
    ],
    data(){
      return {
        //  展示图片的序号
        currentIndex:0
      }
    },
    computed:{
      //  再嵌套，解决 this.skuImageList[0] undefined 报错问题
      imgObj(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted(){
      //  全局事件总线，获取兄弟组件传递过来的所应知
      this.$bus.$on('getIndex', (index) => {
        this.currentIndex = index
      })
    },
    methods:{
      handler(event){
        let mask = this.$refs.mask
        let big = this.$refs.big
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        //  约束范围
        if(left <= 0){
          left = 0
        }
        if(left >= mask.offsetWidth){
          left = mask.offsetWidth
        }
        if(top <= 0){
          top = 0
        }
        if(top >= mask.offsetHeight){
          top = mask.offsetHeight
        }
        //  修改遮罩的left,top属性值
        mask.style.left = left + 'px'
        mask.style.top = top + 'px'

        //  参考CSS大图宽高为2倍关系，那么X,Y距离也翻遍
        big.style.left = -left*2 + 'px'
        big.style.top = -top*2 + 'px'
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>