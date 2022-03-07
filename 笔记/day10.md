复习：
面试时候：防抖|节流 存储
1.1加入购物车
UUID：点击加入购物车的时候，通过请求头给服务器带临时身份给服务器，存储某一个用户购物车数据会话存储、去存储产品的信息一级展示功能
1.2购物车功能
修改产品的数量
删除某一个产品的接口
某一个产品的勾选状态切换

/*************************************************/
1.删除选中全部产品的操作
注意：没有一次删除很多产品的接口，但是有通过ID可以删除产品的接口(一次删一个)
Promise.all([p1,p2,p3])
p1|p2|p3:每一个都是Promise对象，如果有一个Promise失败，都失败，全部成功才成功
```
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
```

2.全选操作

3.登录与注册静态组件 - (处理共用图片资源问题)
登录与注册功能(git),必须要会的技能
3.1登录与注册的静态组件
3.2assets文件夹----防止全部组件共用静态资源
3.3在样式当中也可以使用@符号[src别名]，切记在前面加上~ 或 用``将路径包裹起来也可

4.注册的业务 -- 表单验证先不做
4.1注册业务|登录业务中表单验证先不处理
4.2获取验证码的接口 /api/user/passport/sendCode/{phone}  get

5.登录业务
5.1注册----通过数据库存储用户信息(名字、密码)
5.2登录----登录成功的时候，后台为了区分用户是谁-服务器下发token[令牌：唯一标识符]
登录接口：做的不完美，一般只会返回用户token，不会返回无关用户信息
前台需要持久化存储token，需要带着token向服务器获取展示数据

6.token令牌理解
注意：vuex仓库存储数据 ------ 不是持久化