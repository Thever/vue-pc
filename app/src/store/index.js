//  配置vuex相关信息
import Vue from 'vue';
import Vuex from 'vuex';

//  需要使用插件一次
Vue.use(Vuex);
//  state：仓库春初数据的地方
//  mutations:修改state的唯一手段
//  actions:处理action，可以写业务逻辑，处理异步
//  getters:理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便

//  引入不同模块的状态库
import home from './home';
import search from './search';
import detail from './detail';
import shopCart from './shopCart';
import user from './user';
import trade from './trade';

//  对外暴露Store类的一个实例
export default new Vuex.Store({
  //  vuex模块加载，实现仓库模块式开发数据
  modules: {
    home,
    search,
    detail,
    shopCart,
    user,
    trade,
  },
});
