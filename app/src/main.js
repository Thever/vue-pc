import Vue from 'vue';
import App from './App.vue';
//  三级联动组件---注册为全局组件
import TypeNav from '@/components/TypeNav';
//  第一个参数：全局组件的名字
//  第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav);

//  将轮播图组件引入为全局组件
import Carousel from '@/components/Carousel';
Vue.component(Carousel.name, Carousel);

//  将分页器组件引入为全局组件
import Pagination from '@/components/Pagination';
Vue.component(Pagination.name, Pagination);

//  关闭生产环境提示
Vue.config.productionTip = false;

//  引入路路由
import router from '@/router';

//  引入Vuex
import store from '@/store';

//  引入mockServer.js，为了执行一次，用来模拟虚拟请求数据
import '@/mock/mockServer';

//  由于有多个swiper示例组件，所以可以共享swiper样式，故放到入口文件中共用
//  引入swiper样式
import 'swiper/css/swiper.css';

//  统一引入接口api里面全部请求函数
//  统一引入
import * as API from '@/api';

//  引入element-ui
//  当前新版本经过测试会智能引入，体积消耗与按需引入一样
//  全局引入后Vue原型链上的方法会自动实现
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

//  全局安装使用 vue-lazyload,图片懒加载
import VueLazyload from 'vue-lazyload';
import loadingImg from '@/assets/loading.gif';
Vue.use(VueLazyload, {
  //  懒加载默认的图片
  loading: loadingImg,
});

//  引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, { name: 'myPlugins' });

//  引入表单校验插件,执行
import '@/plugins/validate';

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //  配置全局事件总线$bus，当然你也可以用$event等其他名称使用，这个名字只是一个共识而已
    Vue.prototype.$bus = this;
    //  把请求方法挂载到Vue原型链上，方便各个组件调用
    Vue.prototype.$API = API;
  },
  //  注册路由，底下写法KV一致，根据es6可以简写，注意router是小写
  //  注册落信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //  注册vuex:组件实例身上会新增$store属性
  store,
}).$mount('#app');
