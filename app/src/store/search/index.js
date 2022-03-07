//  search模块小仓库
import { reqGetSearchInfo } from '@/api';
const state = {
  //  仓库初始状态
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  //  获取search模块数据
  //  默认参数
  async getSearchList({ commit }, params = {}) {
    //  当前这个 reqGetSearchInfo 这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
    //  params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params);
    // console.log(result);
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data);
    }
  },
};
//  计算属性，在项目当中是为了简化数据而生。
//  getters的主要作用：简化仓库中的数据
//  把将来需要使用的数据简化，将来组件在获取数据的时候就方便了
const getters = {
  //  当前形参state,当前仓库中的state,并非大仓库中的那个state
  goodsList(state) {
    //  针对网络异常的情况，默认是空对象不包含 goodsList 属性，循环需要数组，就进行处理返回
    return state.searchList.goodsList || [];
  },
  trademarkList(state) {
    //  针对网络异常的情况，默认是空对象不包含 trademarkList 属性，循环需要数组，就进行处理返回
    return state.searchList.trademarkList || [];
  },
  attrsList(state) {
    //  针对网络异常的情况，默认是空对象不包含 attrsList 属性，循环需要数组，就进行处理返回
    return state.searchList.attrsList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
