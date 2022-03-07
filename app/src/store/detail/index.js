//  获取三级导航数据请求  reqGoodsInfo
//  获取请假购物车请求  reqAddOrUpdateShopCart
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api';
//  导入获取uuid模块 --> 随机生成，生成后不变
import { getUUID } from '@/utils/uuid_token.js';
//  home模块小仓库
const state = {
  //  商品详情
  goodInfo: {},
  //  游客临时身份
  uuid_token: getUUID(),
};
//  mutations是唯一修改state的地方
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo;
  },
};
//  actions是用户派发action的地方，可以书写业务逻辑和异步代码
const actions = {
  //  获取产品信息的action
  async getGoodInfo({ commit }, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      commit('GETGOODINFO', result.data);
    }
  },
  //  将产品添加到购物车中
  async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
    //  加入购物车返回的结果
    let result = await reqAddOrUpdateShopCart(skuId, skuNum);
    //  当前这个函数如果执行返回promise,内容取决于接口返回
    if (result.code == 200) {
      //  添加购物车成功
      return true;
    } else {
      //  添加购物车失败
      return Promise.reject(new Error('添加/修改购物车失败'));
    }
  },
};
//  计算属性 简化数据
const getters = {
  //  路径导航简化的数据
  categoryView(state) {
    //  接口没有返回就是undefined，需要处理下，不然报错
    //  单签计算出的 categoryView 属性值至少是一个空对象，不会报错
    return state.goodInfo.categoryView || {};
  },
  //  产品信息简化的数据
  skuInfo(state) {
    //  同理处理
    return state.goodInfo.skuInfo || {};
  },
  //  简化产品信息的数据
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
