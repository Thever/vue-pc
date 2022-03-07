//  search模块小仓库
import { reqCartList, reqDeletCartById, reqUpdateCheckedById } from '@/api';
const state = {
  //  购物车列表
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  //  获取shopCart购物车表数据
  async getCartList({ commit }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit('GETCARTLIST', result.data);
    }
  },
  //  删除购物车某一个产品
  async deleteCartListBySkuId({ commit }, skuId) {
    let result = await reqDeletCartById(skuId);
    //  删除接口没有返回
    if (result.code == 200) {
      return true;
    } else {
      throw new Error('删除产品失败了！');
    }
  },
  //  修改购物车某一产品的选中状态
  async reqUpdateCheckedById({ commit }, { skuId, isChecked }) {
    let result = await reqUpdateCheckedById(skuId, isChecked);
    // 修改接口没有返回
    if (result.code == 200) {
      return true;
    } else {
      throw new Error('修改购物车商品状态失败了！');
    }
  },
  //  删除全部勾选的产品
  //  需要多次调用删除产品的方法,可以通过解构context来获取对应的方法和数据
  deleteAllCheckedCart({ dispatch, getters }) {
    //  context:小仓库，commit[提交mutations修改state] getters[计算属性] dispatch[派发action] state[当前仓库数据]
    //  获取购物车中全部的产品(数组)
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1
          ? dispatch('deleteCartListBySkuId', item.skuId)
          : '';
      //  将每次返回的promise返回到数组当中
      PromiseAll.push(promise);
    });
    //  利用promise.all来判断是否都成功，抛出结果
    return Promise.all(PromiseAll);
  },
  //  修改全部产品的选中状态
  updateAllCartIsChecked({ dispatch, state }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch('reqUpdateCheckedById', {
        skuId: item.skuId,
        isChecked,
      });
      promiseAll.push(promise);
    });
    //  返回最终结果
    return Promise.all(promiseAll);
  },
};
//  计算属性，在项目当中是为了简化数据而生。
//  getters的主要作用：简化仓库中的数据
//  把将来需要使用的数据简化，将来组件在获取数据的时候就方便了
const getters = {
  //  购物车数据
  cartList(state) {
    return state.cartList[0] || {};
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
