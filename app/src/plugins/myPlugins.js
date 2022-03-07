//  vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function (Vue, options) {
  console.log('自定义插件myPlugins被调用了');
  // console.log(Vue);
  // console.log(options);
  //  options.modifiers 修饰符
  //  各种全局指令
  //  Vue.prototype.$bus:全局时间总线，任何组件都可以使用
  //  Vue.directive
  //  Vue.component
  //  Vue.filter...

  // // 1. 添加全局方法或 property
  // Vue.myGlobalMethod = function () {
  //   // 逻辑...
  // }

  // // 2. 添加全局资源
  Vue.directive(options.name, (element, params) => {
    console.log(`myPlugins调用了`);
    element.innerHTML = params.value.toUpperCase();
  });

  // // 3. 注入组件选项
  // Vue.mixin({
  //   created: function () {
  //     // 逻辑...
  //   }
  //   ...
  // })

  // // 4. 添加实例方法
  // Vue.prototype.$myMethod = function (methodOptions) {
  //   // 逻辑...
  // }
};

export default myPlugins;
