//  获取三级导航数据请求
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api';
//  home模块小仓库
const state = {
  //  state中数据默认初始值别瞎写，参照接口返回值来初始化
  //  三联导航数据
  categoryList: [],
  //  首页轮播图数据
  bannerList: [],
  //  floor数据
  floorList: [],
};
//  mutations是唯一修改state的地方
const mutations = {
  //  修改三联导航数据
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  //  修改首页轮播图数据
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  //  修改floor数据
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
//  actions是用户派发action的地方，可以书写业务逻辑和异步代码
const actions = {
  //  通过API里面的接口函数调用，向服务器发请求，获取服务器的数据
  //  获取三联导航数据
  async categoryList({ commit }) {
    let result = await reqCategoryList();
    if (result.code == '200') {
      //  请求成功,更改vuex属性状态
      commit('CATEGORYLIST', result.data);
    }
  },
  //  获取首页轮播图数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == '200') {
      //  请求成功,更改vuex属性状态
      commit('GETBANNERLIST', result.data);
    }
  },
  //  获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == '200') {
      //  请求成功,更改vuex属性状态
      commit('GETFLOORLIST', result.data);
    }
  },
};
//  计算属性
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
