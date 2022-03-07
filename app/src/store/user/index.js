//  user模块小仓库
import {
  reqGetCode,
  reqUserRegister,
  reqUserLogin,
  reqUserInfo,
  reqLogout,
} from '@/api';
import { setToken, getToken, removeToken } from '@/utils/token';
const state = {
  //  验证码
  code: '',
  //  token,优先通过localStorage来获取
  token: getToken() || '',
  //  用户信息
  userInfo: '',
};
const mutations = {
  //  写入验证码
  GETCODE(state, code) {
    state.code = code;
  },
  //  存储token
  USERLOGIN(state, token) {
    //  token存储到了vuex,但是非持久化，刷新就会消失
    //  实际使用过程中会存储到 localstorage 或 cookie中，避免失效
    state.token = token;
  },
  //  存储用户信息
  GETUSERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  //  清除本地用户信息
  CLEAR(state) {
    //  清空vuex
    state.token = '';
    state.userInfo = '';
    //  清空localStorage
    removeToken();
  },
};
const actions = {
  //  获取验证码
  async getCode({ commit }, phone) {
    //  获取验证码接口，把验证码返回了，但是正常情况，后台把验证码发到用户手机上【省钱】
    let result = await reqGetCode(phone);
    // console.log(result);
    if (result.code == 200) {
      //  请求验证码成功
      commit('GETCODE', result.data);
      return true;
    } else {
      //  请求失败
      throw new Error('请求验证码失败');
    }
  },
  //  用户注册
  async userRegister({ commit }, user) {
    let result = await reqUserRegister(user);
    if (result.code == 200) {
      return true;
    } else {
      throw new Error('请求用户注册失败');
    }
  },
  //  用户登录[token]
  async userLogin({ commit }, data) {
    let result = await reqUserLogin(data);
    if (result.code == 200) {
      //  存储token
      commit('USERLOGIN', result.data.token);
      setToken(result.data.token);
      //  返回成功
      return true;
    } else {
      // 直接抛出错误
      // throw new Error('用户登录失败');
      // 返回 promise 失败，抛出错误
      return Promise.reject(new Error('用户登录失败了'));
    }
  },
  //  获取用户信息
  async getUserInfo({ commit }) {
    let result = await reqUserInfo();
    if (result.code == 200) {
      //  保存用户信息
      commit('GETUSERINFO', result.data);
      return true;
    } else {
      //  返回 promise 失败，抛出错误
      return Promise.reject(new Error('获取用户信息失败了'));
    }
  },
  //  用户退出登录
  async userLogout({ commit }) {
    let result = await reqLogout();
    if (result.code == 200) {
      //  action里不能操作state
      //  清除本地用户信息
      commit('CLEAR');
      return true;
    } else {
      return Promise.reject(new Error('用户退出登录是啊比'));
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
