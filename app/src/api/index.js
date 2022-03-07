/* 
  请求真实接口数据
*/
//  当前这个模块：API进行统一管理
import requests from './request';

//  三级联动接口
//  /api/product/getBaseCategoryList get 无参数
//  发请求:axios发请求返回的结果是Promise对象
//  这里是函数体的形式，按照ES6箭头函数可以进行简写
export const reqCategoryList = () => {
  //  发请求:axios发请求返回的结果是Promise对象
  return requests({
    url: '/product/getBaseCategoryList',
    method: 'get',
  });
};

/*
  请求mock模拟接口数据
*/
//  export defalut 匿名导出可以重命名使用
import mockRequests from './mockAjax';

//  获取banner(首页轮播图接口)
export const reqGetBannerList = () => {
  return mockRequests({
    url: '/banner',
    method: 'get',
  });
};

//  获取floor数据
export const reqFloorList = () => {
  return mockRequests({
    url: '/floor',
    method: 'get',
  });
};

//  当前这个函数需要接受外部传递的参数
//  当前这个接口，给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params) => {
  return requests({
    url: '/list',
    method: 'post',
    data: params,
  });
};

//  获取产品详情信息的接口  url:'api/item/skuId' 请求方式：get
export const reqGoodsInfo = (skuId) => {
  return requests({
    url: `/item/${skuId}`,
    method: 'get',
  });
};

//  将产品添加到购物车中(或者更新某一个产品的个数)
//  请求地址：/api/cart/addToCart/{ skuId }/{ skuNum }
//  请求方式：post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: 'post',
  });
};

//  获取购物车列表数据
//  URL:/api/cart/cartList method:get
export const reqCartList = () => {
  return requests({
    url: '/cart/cartList',
    method: 'get',
  });
};

//  删除商品
// URL:/api/cart/deleteCart/{skuId} method:DELETE
export const reqDeletCartById = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    //  不区分大小写
    method: 'delete',
  });
};

//  修改商品的选中状态
//  URL:/api/cart/checkCart/{skuId}/{isChecked} method:GET
export const reqUpdateCheckedById = (skuId, isChecked) => {
  return requests({
    url: `/cart/checkCart/{skuId}/{isChecked}`,
    //  不区分大小写
    method: 'get',
  });
};

//  获取验证码
// URL:/api/user/passport/sendCode/{phone} method:GET
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/{phone}`,
    //  不区分大小写
    method: 'get',
  });
};

//  用户注册，接口失效
//  URL:/api/user/passport/register 请求方式:POST phone, code, password
export const reqUserRegister = (data) => {
  return requests({
    url: `/user/passport/sendCode/{phone}`,
    method: 'post',
    data,
  });
};
//  用户登录
// URL:/api/user/passport/login 请求方式：post
export const reqUserLogin = (data) => {
  return requests({
    url: `/user/passport/login`,
    method: 'post',
    data,
  });
};

// 获取用户信息[需要带着token请求]
// URL:/api/user/passport/auth/getUserInfo 请求方式：get
export const reqUserInfo = () => {
  return requests({
    url: `/user/passport/auth/getUserInfo`,
    method: 'get',
  });
};

//  用户退出登录
//  URL:/api/user/passport/logout 请求方式：get
export const reqLogout = () => {
  return requests({
    url: `/user/passport/logout`,
    method: 'get',
  });
};

//  获取用户地址信息
//  URL:/api/user/userAddress/auth/findUserAddressList 请求方式:get
export const reqAddressInfo = () => {
  return requests({
    url: `/user/userAddress/auth/findUserAddressList`,
    method: 'get',
  });
};

//  获取商品清单
// URL:/api/order/auth/trade 请求方式:get
export const reqOrderInfo = () => {
  return requests({
    url: `/order/auth/trade`,
    method: 'get',
  });
};

//  提交订单
//  URL:/api/order/auth/submitOrder?tradeNo={tradeNo} 请求方式：POST
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: 'post',
    data,
  });
};

//  获取订单支付信息
//  URL:/api/payment/weixin/createNative/{orderId} 请求方式：get
export const reqPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: 'get',
  });
};

//  获取支付订单状态
//  URL:/api/payment/weixin/queryPayStatus/{orderId} 请求方式：get
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: 'get',
  });
};

//  获取我的订单列表
//  URL:/api/order/auth/{page}/{limit} 请求方式：get
export const reqMyOrderList = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: 'get',
  });
};
