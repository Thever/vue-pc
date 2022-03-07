1.vue-cli脚手架项目
node + webpack + 淘宝镜像

node_modules 文件夹:项目依赖文件夹

public 文件夹:一般放置一些静态资源(图片),需要注意，放在public文件中的静态资源，webpack进行打包的时候，会原封不动打包到dist文件夹中

src 文件夹(程序员源代码文件夹):

    assets文件夹：一般放置静态资源(一般放置多个组件共用的静态资源),需要注意，放置再assets文件夹你的静态资源，在webpack打包的时候，webpack会把静态资源当做一个模块，打包到JS文件里面。

    components文件夹：一般放置的是非路由组件(全局组件)

    App.vue：唯一的根组件，vue当中的组件(.vue)

    main.js:程序入口文件，最先执行的JS文件

babel.config.js:babel的配置文件

package.json文件：项目信息文件

package-lock.json：缓存性文件

README.md:说明性文件

2:项目的其他配置
2.1 运行项目，浏览器自动打开
```
package.json
    "scripts": {
    "serve": "vue-cli-service serve --open",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
},
```

2.2 关闭eslint校验工具（不关闭会有各种规范，不按照规范就会报错）
根目录下创建vue.config.js,进行配置
全部配置的参考网址：https://cli.vuejs.org/zh/config/
```
module.exports = {
  //关闭eslint
  lintOnSave: false
}
```

2.3 src文件夹配置别名,根目录创建jsconfig.json，用@/代替src/，exclude表示不可以使用该别名的文件(node_modules文件夹，dist文件中不能用@/代替src/)
```
 {
    "compilerOptions": {
        "baseUrl": "./",
            "paths": {
            "@/*": [
                "src/*"
            ]
        }
    },
    "exclude": [
        "node_modules",
        "dist"
    ]
 }
```

3.项目路由的分析
key-router
前端所谓路由：KV键值对。
key:URL(地址栏中的路径)
value:相应的路由组件
注意：项目上中下结构

路由组件：
Home首页路由组件、Search路由组件、login登录路由、Register注册路由
非路由组件：
Header(首页、搜索页显示)
Footer(在首页、搜索页显示，登录页不显示)

4.完成非路由组件Header与Footer业务
开发步骤：
1.书写静态页面
2.拆分组件
3.获取服务器的动态展示
4.完成响应的动态业务逻辑

注意1：创建组件的时候，组件结构 + 组件的样式 + 图片资源
注意2：项目中使用less来书写样式，需要安装less,less-loader(5版本的)来处理，将其变为css样式
```
npm install --save less less-loader@5
```
注意3：如果想让组件识别less样式，需要再style标签的上加lang="less"

4.1使用组建的步骤(非路由组件)
-创建或定义组件
-引入
-注册
-使用

5.路由组件的搭建
在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register

安装vue-router
```
npm i --save vue-router
```

-components文件夹：经常放置非路由组件(公用全局组件)
-pages|views文件夹：经常放置路由组件

5.1配置路由
项目当中配置的路由一般放置再router文件夹中

5.2总结
路由组件与非路由组件的区别？
1.路由组件一般是放置在pages|views文件夹中，非路由组件一般放置components文件夹中
2.路由组件一般需要在router文件夹中注册(使用的即为组件的名字),非落组件在使用的时候，一般都是以标签的形式使用
3.注册完路由，路由组件和非路由组件都有$route、$router属性

$route:路由，一般获取路由信息(路径、query、params等等)
$router:路由器，一般进行编程式导航，进行路由跳转(push|replace)

5.3路由的跳转
路由的跳转有两种形式：
声明式导航router-link,可以进行路由的跳转
编程式导航push|replace,可以进行路由跳转

编程式导航：声明式能做的，编程式都能做，编程式还能做逻辑业务处理

6.Footer组件的显示与隐藏
显示或者隐藏组件：v-if|v-show
Footer组件：在Home、Search显示Footer组件
Footer组件：在登录、注册时候隐藏

6.1 根据组件身上的$route获取当前路由信息，通过路由路径判断Footer显示与隐藏
6.2 配置路由时，可以给路由添加路由元信息(meta),路由需要配置对象，它的key不能乱写

```<Footer v-show="$route.meta.showFooter"></Footer>```

7.路由传参
7.1 路由跳转有几种方式？比如A -> B
声明式导航：router-link(务必要有to属性)，可以实现路由的跳转。
编程式导航：利用的是组件的$router.push|replace方法，可以实现路由的跳转。

7.2 路由传参，参数有几种写法？
params参数，属于路径当中的一部分，需要注意，在配置路由的时候，需要占位
query参数，不属于路径当中的一部分，类似于ajax中的queryString /home?k=v&kv=,不需要占位

8.路由传参相关的面试题

8.1 路由传递参数(对象写法)path是否可以结合params参数一起使用？
不能，路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用。

8.2 如何指定params参数客串可不传？
比如:配合路由的时候，占位了(params参数)，但是路由跳转的时候就不传递。
路径会出现问题,只会出现query参数
```http://localhost:8080/#/?k=ASDASD```
如何指定params参数可以传递或者不传递、在配置路由的时候，在占位的后面加一个问号(params可以传递或不传递)

8.3 params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
用undefined来解决，传parmas:{k:''|| undefined}

8.4 路由组件能不能传递props数据？
可以，有三种方式，布尔值传参，对象传参，函数传参
```
router.js 路由配置文件中
//  路由组件能不能传递props数据?
//  布尔值的写法,params作为props的参数传入
// props: true,
//  对象写法,额外的给路由组件传递一些props
// props: { a: 1, b: 2 },
//  函数写法，可以把params参数、query参数，通过props传递给路由组件
props: ($route) => {
  return {
    keyword: $route.params.keyword,
    k: $route.query.k,
    a: 1,
    b: 2,
  };
},
```