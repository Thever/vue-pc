//  引入资源
import Vue from 'vue';
import VueRouter from 'vue-router';

//  重写VueRouter的push与replace方法
//  重写push
//  先把VueRouter原型对象的push方法保存一份
let originPush = VueRouter.prototype.push;
//  重写push方法
//  第一个参数location：告诉原来push方法，你往哪里跳转(传递哪些参数)
//  第二个参数resolve：成功的回调
//  第三个参数reject：失败的回调

VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //  成功与失败回到都传了，就调用原本的push方法
    //  call||apply
    //  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //  不同点：call与apply传递参数，call传递多个参数用逗号隔开，apply需要传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    //  没有同时传入成功或失败回调,就手动传入成功和失败回调
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//  重写replace
//  保存原本的replace方法
let originReplace = VueRouter.prototype.replace;

//  重写replace方法，参数方法同push

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //  成功与失败回到都传了，就调用原本的push方法
    //  call||apply
    //  相同点，都可以调用函数一次，都可以篡改函数的上下文一次
    //  不同点：call与apply传递参数，call传递多个参数用逗号隔开，apply需要传递数组
    originReplace.call(this, location, resolve, reject);
  } else {
    //  没有同时传入成功或失败回调,就手动传入成功和失败回调
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

//  使用插件
Vue.use(VueRouter);

//  引入一级路由组件
import Home from '@/pages/Home/index.vue';
import Search from '@/pages/Search/index.vue';
import Login from '@/pages/Login/index.vue';
import Register from '@/pages/Register/index.vue';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';

//  引入二级路由组件
import myOrder from '@/pages/Center/myOrder';
import groupOrder from '@/pages/Center/groupOrder';

//  引入store
import store from '@/store';

/*
  当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
  如果我们能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就会更加高效。
  路由懒加载的好处：高效
*/
//  动态载入，只有当路由被第一次触发了才会载入组件资源
// const Home = () => {return import('@/pages/Home/index.vue') }
//  ==> 简化函数体
// const Home = () => import('@/pages/Home/index.vue')

//  配置路由
let router = new VueRouter({
  // 路由
  routes: [
    {
      path: '/home',
      //  也可以在路由配置中动态载入，合并代码
      //  component: () => import ('@/pages/Home/index.vue')
      component: Home,
      meta: {
        showFooter: true,
      },
    },
    {
      path: '/search/:keyword?',
      // 路由别名，方便this.$router.push用对象形式来携带参数
      name: 'search',
      component: Search,
      meta: {
        showFooter: true,
      },
      //  路由组件能不能传递props数据?
      //  布尔值的写法,params作为props的参数传入
      // props: true,
      //  对象写法,额外的给路由组件传递一些props
      // props: { a: 1, b: 2 },
      //  函数写法，可以把params参数、query参数，通过props传递给路由组件
      props: ($route) => {
        return {
          keyword: $route.params.keyword || undefined,
          k: $route.query.k || undefined,
          //  手动添加固定参数
          // a: 1,
          // b: 2,
        };
      },
    },
    {
      path: '/login',
      component: Login,
      meta: {
        showFooter: false,
      },
    },
    {
      path: '/register',
      component: Register,
      meta: {
        showFooter: false,
      },
    },
    {
      path: '/detail/:skuid?',
      component: Detail,
      meta: {
        showFooter: true,
      },
    },
    {
      //  路由的路径都是小写的
      path: '/addcartsucess',
      name: 'addcartsucess',
      component: AddCartSuccess,
      meta: {
        showFooter: true,
      },
    },
    {
      //  路由的路径都是小写的
      path: '/shopcart',
      name: 'shopcart',
      component: ShopCart,
      meta: {
        showFooter: true,
      },
    },
    {
      //  路由的路径都是小写的
      path: '/trade',
      name: 'Trade',
      component: Trade,
      meta: {
        showFooter: false,
      },
      //  路由独享守卫
      beforeEnter: (to, from, next) => {
        //  只有从购物车界面才能跳转到交易页面
        if (from.path == '/shopcart') {
          next();
        } else {
          //  停留在当前页
          next(false);
        }
      },
    },
    {
      //  路由的路径都是小写的
      path: '/pay',
      name: 'Pay',
      component: Pay,
      meta: {
        showFooter: false,
      },
      beforeEnter: (to, from, next) => {
        //  只有从交易页面(创建订单页面)才能跳转到支付页面
        if (from.path == '/trade') {
          next();
        } else {
          //  停留在当前页
          next(false);
        }
      },
    },
    {
      //  路由的路径都是小写的
      path: '/paysuccess',
      name: 'PaySuccess',
      component: PaySuccess,
      meta: {
        showFooter: false,
      },
      beforeEnter: (to, from, next) => {
        //  只有从支付页面才能跳转到支付成功页面
        if (from.path == '/pay') {
          next();
        } else {
          //  停留在当前页
          next(false);
        }
      },
    },
    {
      //  路由的路径都是小写的
      path: '/center',
      name: 'Center',
      component: Center,
      meta: {
        showFooter: false,
      },
      //  二级落组件
      children: [
        {
          //  二级路由不用/开始写路由
          path: 'myorder',
          component: myOrder,
        },
        {
          //  二级路由不用/开始写路由
          path: 'grouporder',
          component: groupOrder,
        },
        //  /center重定向到/center/myorder
        //  默认展示内容
        {
          path: '/center',
          redirect: '/center/myorder',
        },
      ],
    },
    //  组件高级通信相关内容
    {
      path: '/communication',
      component: () => import('@/pages/Communication/Communication'),
      children: [
        {
          path: 'event',
          component: () => import('@/pages/Communication/EventTest/EventTest'),
          meta: {
            isHideFooter: true,
          },
        },
        {
          path: 'model',
          component: () => import('@/pages/Communication/ModelTest/ModelTest'),
          meta: {
            isHideFooter: true,
          },
        },
        {
          path: 'sync',
          component: () => import('@/pages/Communication/SyncTest/SyncTest'),
          meta: {
            isHideFooter: true,
          },
        },
        {
          path: 'attrs-listeners',
          component: () =>
            import(
              '@/pages/Communication/AttrsListenersTest/AttrsListenersTest'
            ),
          meta: {
            isHideFooter: true,
          },
        },
        {
          path: 'children-parent',
          component: () =>
            import(
              '@/pages/Communication/ChildrenParentTest/ChildrenParentTest'
            ),
          meta: {
            isHideFooter: true,
          },
        },
        {
          path: 'scope-slot',
          component: () =>
            import('@/pages/Communication/ScopeSlotTest/ScopeSlotTest'),
          meta: {
            isHideFooter: true,
          },
        },
      ],
    },
    //  重定向，在项目跑起来的时候，访问/，立马定向到首页
    {
      path: '*',
      redirect: '/home',
    },
  ],
  //  配置路由，设置页面展示的起始位置为 x:0 y:0
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
  },
});

//  配置路由全局前置守卫
router.beforeEach(async (to, from, next) => {
  //  to:跳转到那个路由信息
  //  from:从哪个路由跳转过来的信息
  //  next放行函数,next()放行
  //  放行到指定路由中 next(path) next('/login')
  //  next(false) 返回到来源路由
  // next();
  //  判断用户登录
  //  token
  let token = store.state.user.token;
  //  用户姓名，js中{}为真，不能直接用于判断，要用内部属性值来判断
  let name = store.state.user.userInfo.name;
  if (token) {
    //  登录了
    //  拦截前往登录页,改为去首页
    if (to.path == '/login') {
      next('/');
    } else {
      //  登录了，去的不是login[home|search|detail|shopcart]
      if (name) {
        //  如果有name,有用户信息
        next();
      } else {
        //  没有name,没有用户信息
        try {
          //  派发action,让仓库存储用户信息，再跳转
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //  获取用户信息失败，token过期
          //  清空token和用户信息
          await store.dispatch('userLogout');
          //  重定向到登录页重新登录
          next('/login');
        }
      }
    }
  } else {
    //  未登录访问，交易关联(trade)、支付相关(pay/paysuccess)、用户中心(center)相关跳转到登录页面
    let toPath = to.path;
    //  indexOf来判断一级路由是否存在，拦截访问地址
    if (
      toPath.indexOf('/trade') != -1 ||
      toPath.indexOf('/pay') != -1 ||
      toPath.indexOf('/center') != -1
    ) {
      //  未登录时要访问的页面放到query redirect中，方便后面读取使用
      next(`/login?redirect=${toPath}`);
    } else {
      //  其他页面放行
      next();
    }
  }
});
//  默认对外暴露
export default router;
