<template>
  <div>
    <!-- 三级联动全局组件，已注册为全局组件，因此不需要再引入了 -->
    <TypeNav />
    <!-- 其余组件 -->
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <!-- v-for循环自定义组件，自定义标签 -->
    <!-- floorList默认是空数组，不会循环渲染，如果渲染了就是请求成功获得了数据，将对应的数据循环传给Floor子组件，可以在Floor子组件mounted挂载完成时已经有对应数据，也循环渲染了数据内的轮播图容器DOM，所以可以成功进行实例化 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor"/>
    <Brand />
  </div>
</template>
<script>
//  引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'
//  vuex引入
import {mapState} from 'vuex'
export default {
    name:'',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted(){
      //  派发action,获取floor组件的数据
      this.$store.dispatch('getFloorList')
      //  如果用户登录了，就获取获取用户信息在首页展示
      //  由于接口问题，不能注册登录
      // this.$store.state.user.token && this.$store.dispatch('getUserInfo')
    },
    computed:{
      ...mapState({
        floorList: state => state.home.floorList 
      })
    }
}
</script>
<style lang="less" scoped>
    
</style>