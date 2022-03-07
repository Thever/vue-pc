//  对外暴露一个函数
//  存储token
export const setToken = (token) => {
  localStorage.setItem('Token', token);
};
//  获取token
export const getToken = () => {
  return localStorage.getItem('Token');
};
//  清除token
export const removeToken = () => {
  localStorage.removeItem('Token');
};
