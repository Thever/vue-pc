<template>
  <div id="app">
    <Header></Header>
    <!-- 路由组件出口的地方，用来显示匹配路由信息的内容 -->
    <router-view></router-view>
    <!-- 在Home、Search显示的，在登录、注册隐藏 -->
    <!-- <Footer v-show="$route.path == '/home'|| $route.path == '/search'"></Footer> -->
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
//  引入组件
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: '',
  components:{
    Header,
    Footer
  },
  mounted(){
    console.log(`App.vue挂载了`)
    //  派发一个action || 获取商品分类的三级列表的数据
    //  解决TypeNav反复请求接口的问题
    //  不能放到main.js上，因为main.js不是组件，自身没有$store属性
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>

</style>
