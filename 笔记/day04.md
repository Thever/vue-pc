复习：
1.商品分类的三级列表由静态变为动态形式(获取服务器数据：解决跨域问题)
2.函数的防抖与节流(面试频率高)
3.路由跳转：声明式导航(router-link,本身是组件，消耗资源)、编程式导航(事件委派代理事件，自定义属性来做身份识别与传递参数，e.target.dataset中获取对应的自定义属性，注意自定义小驼峰语法都会转换成小写)

1.开发Search模块中的TypeNav分类菜单(过度动画效果)
过度动画：前提组件|元素务必要有v-if|v-show才可以进行过度动画,可以在 transition 标签内设置name属性配合css样式来自定义动画切换的效果

2.现在咱们的商品分类三姐列表可以进行优化？
在APP根请求当中发请求(根组件mounted)只会执行一次

3.合并params和query参数

4.开发Home首页当中的ListContainer组件与Floor组件
但是这里需要知道一件事情：服务器返回的数据(接口)只有商品分类菜单分类数据，对于ListContainer组件与Floor组件数据服务器没有提供的。
//  推荐一个中文查询网站 --> 印记中文 https://docschina.org/

mock数据(模拟):如果你想mock数据，需要用到一个插件mockjs

mockjs使用步骤：
1.在项目当中src文件夹中创建一个mock文件夹
2.准备json数据(在mock文件夹中创建对应的JSON文件 --- 记得格式化，别留有空格，否则跑不起来)
3.把mock需要的图片防止到public文件夹中(public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件中)
4.创建mockServer.js，通过mockjs插件实现模拟数据
5.mockServer.js在入口文件中引入(至少需要执行一次，才能模拟数据)

5.listContainer组件开发重点？
安装Swiper插件：最新版本7，安装的是swiper@5

```
  npm i --save swiper@5
```