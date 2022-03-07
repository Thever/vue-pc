//  trade模块小仓库
import { reqAddressInfo, reqOrderInfo } from '@/api';
const state = {
  //  用户地址
  address: [],
  //  订单信息
  orderInfo: {},
};
const mutations = {
  //  修改用户地址信息
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  //  修改订单信息
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  //  获取用户地址
  async getUserAddress({ commit }) {
    let result = await reqAddressInfo();
    if (result.code == 200) {
      commit('GETUSERADDRESS', result.data);
    } else {
      throw new Error('获取用户地址失败');
    }
  },
  //  获取订单信息
  async getOrderInfo({ commit }) {
    let result = await reqOrderInfo();
    if (result.code == 200) {
      commit('GETORDERINFO', result.data);
    } else {
      throw new Error('获取订单详情失败');
    }
  },
};
//  计算属性，在项目当中是为了简化数据而生。
//  getters的主要作用：简化仓库中的数据
//  把将来需要使用的数据简化，将来组件在获取数据的时候就方便了
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
