1.编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDupicated的错误警告？
--路由跳转有两种形式：声明式导航、编程式导航
--声明式导航没有这类问题，因为vue-router底层已经处理好了

1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误？
"vue-router": "^3.5.3"  最新的vue-router引入promise

1.2通过给push方法传递相应的成功、失败的回调函数，可以捕获到当前错误，可以解决 ==> 只是让错误不显示，治标不治本，将来在别的组件中push|replace,编程式导航还是有类似错误。

```
this.$router.push({
  //  跳转组件
  name:'search',
  //  param参数
  params:{
    keyword:this.keyword
  },
  //  query参数
  query:{
    k:this.keyword.toUpperCase()
  }
},(res) => {
  console.log('回调成功了')
  console.log(res)
}, (err) => {
  console.error('回调失败了')
  console.log(err)
})
```

1.3 参数对象分析
this:当前组件实例(search)
this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性
push|replace:VueRouter类的一个实例

2.Home模块组件拆分
--先把静态页面完成
--拆分出静态组件
--获取服务器的数据进行展示
--动态业务

3.三级联动组件完成
---由于三级联动，在Home、Search、Detail中使用了把三级联动组件注册为全局组件
好处：只需要注册一次，就可以在项目任意地方使用

4.完成其余静态组件
HTML + CSS + 图片资源 ----> 细心[结构、样式、图片资源]

5.Postman测试接口
--经过Postman测试，接口没有问题
--如果服务器返回的服务器code字段200，代表服务器返回数据成功
--整个项目，接口的前缀都有/api字样

6.axios二次封装
XMLHttpRequest、fetch、JQ、axios

6.1为什么需要进行二次封装？
为了自定义请求拦截器、响应拦截器
请求拦截器：可以在发请求之前处理一些业务
响应拦截器：数据返回以后，可以处理处理一些业务

6.2在项目当中经常放API的文件夹[axios请求]
接口当中：路径都带有/api
baseURL:'/api' --> http://xxx.xxx:8080/api/,当请求路径中自动添加对应的baseURL
使用方法：
  单独使用： import导入对应的api方法，再调用
  ```
    //  导入方法
    import { reqAddressInfo } from '@/api';
    //  调用方法
    async getUserAddress({ commit }) {
      let result = await reqAddressInfo();
      if (result.code == 200) {
        commit('GETUSERADDRESS', result.data);
      } else {
        throw new Error('获取用户地址失败');
      }
    },
  ```

  全局引入使用： 在main.js中引入，如果全局事件一般暴露使用
  ```
  //  统一引入接口api里面全部请求函数
  import * as API from '@/api';
  new Vue({
  render: (h) => h(App),
    beforeCreate() {
      //  配置全局事件总线$bus，当然你也可以用$event等其他名称使用，这个名字只是一个共识而已
      Vue.prototype.$bus = this;
      //  把请求方法挂载到Vue原型链上，方便各个组件调用
      Vue.prototype.$API = API;
    },
    //  注册路由，底下写法KV一致，根据es6可以简写，注意router是小写
    //  注册落信息：当这里书写router的时候，组件身上都拥有$route,$router属性
    router,
    //  注册vuex:组件实例身上会新增$store属性
    store,
  }).$mount('#app');
  ```

6.3axios相关的配置信息，可以参考github|npm 的 axios的相关文档
github:https://github.com/axios/axios
npm:https://www.npmjs.com/package/axios

7.统一接口管理

项目很小：完全可以在组件的生命周期函数中发请求

项目很大：进行统一接口管理，方便修改

7.1跨域问题
什么是跨域：协议、域名、端口号不同请求，称之为跨域(违反同源策略)
http://localhost:8080/#/home  ----前端项目本地服务器
http://39.98.123.211/         ----后台服务器

解决跨域问题：JSONP、CROS、代理

8.nprogress进度条的使用

  ```
    //  引入nprogress进入条插件
    import nprogress from 'nprogress';
    //  引入进度条样式
    import 'nprogress/nprogress.css';
    ...
    //  进度条开始动
    nprogress.start();
    //  进度条结束
    nprogress.done();
  ```

  start:进度条开始
  done:进度条结束
  进度条颜色是可以修改的，需要修改对应的css样式(node_modules/nprogress/nprogress.css)

9.vuex状态管理库(可以参考src/store里面的文件配置)

9.1vuex是什么？

vuex是官方提供一个插件，状态管理库集中式管理项目中组件共用的数据。

切记，并不是全部项目都需要Vuex,如果项目很小，完全不需要vuex,如果项目很大，组件很多，数据维护很费劲，那就用vuex吧

state
mutations
actions
getters
modules

9.2 vuex基本使用
参考官方默认文档，使用单一的state来管理组件间的公共状态

9.3 vuex实现模块式开发
如果项目过大，组件过多，接口也很多，数据也很多，可以让vuex实现模块式开发

10.完成TypeNav三级联动展示数据业务
合格的前端应该能通过页面展示来猜到对应的数据结构