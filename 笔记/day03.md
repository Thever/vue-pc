1.完成以及分类动态添加背景颜色

第一种解决方案：采用样式完成 利用:hover添加对应样式即可

第二种解决方案：通过JS完成，通过动态绑定样式来完成

2.通过JS控制二三级商品分类的显示与隐藏

最开始的时候，是通过CSS样式display:block|none显示与隐藏二三级商品分类

3.演示卡顿现象
正常：时间出发非常频繁，而且每一次的出发，回调函数都要去执行(如果时间很短，而回调函数内部有计算，那么很可能出现浏览器卡顿)
节流：在规定的间隔范围内不会重复出发回调，而且大于这个时间间隔才会触发回调，把平凡触发变为少量触发(施法后带CD，CD内无效)
```
  //  手写节流
  function throttle(func, delay){
    //  判断容器
    let task = null
    //  闭包返回
    return function(){
      //  容器为空就设置定时器调用方法
      //  否则就不响应
      if(!task){
        task = setTimeout(() => {
          //  重置容器状态
          task = null
          //  绑定this指向与参数
          func.apply(this,arguments)
        },delay)
      }
    }
  }
  //  使用函数
  //  获取节点
  let span = document.querySelector('span')
  let button = document.querySelector('button')
  let count = 0
  //  1秒以内，计数器的数字最多只能+1
  button.onclick = throttle(function(){
    // 节流：目前这个回调函数1S执行一次
    // 假如这里面有很多的业务代码，这样可以给浏览器足够的时间去处理
    count++
    span.innerHTML = count
    console.log('count增加了')
  }, 1000)
```

防抖：前面的所有的触发都被取消，最后一次执行再规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次(施法后需要静默一段时间才能触发，新动作取消旧动作计时)
```
//  手写防抖
  function debounce(func, delay){
    //  判断容器
    let task = null
    //  抛出闭包
    return function(){
      //  启动了定时器就清空
      if(task){
        clearTimeout(task)
      }
      //  重新设置定时器，按参数设置延迟时间
      task = setTimeout(() => {
        //  绑定函数与参数
        func.apply(this, arguments)
      }, delay)
    }
  }
  //  使用
  let input  = document.querySelector('input')
  input.oninput = debounce(function(){
    console.log('ajax发请求')
  }, 1000)
```

5.完成三级联动节流的操作

6.三级联动组件的路由跳转与传递参数
三级联动用户可以点击的：一级分类、二级分类、三级分类，当你点击的时候
，会从Home模块跳转到Search模块。一级会把用户选中的产品(产品的名字、产品的id)在路由跳转的时候，进行传递。

路由跳转：
声明式导航：router-link
编程式导航：push|replace

三级联动：如果使用声明式导航router-link,可以实现路由的跳转与传递参数。
但是需要注意，出现卡顿现象。

router-link:可是一个组件，当服务器的数据返回之后，循环出很多的router-link组件(创建组件实例)1000+
创建组件实例的时候，一瞬间创建1000+很耗内存，因此出现了卡顿现象

同理，如果给循环出来的内容绑定click事件，也会造成绑定了1000+事件绑定，从性能上来说也不好

利用事件委派，再循环外部的父容器上绑定一个click事件，就能节约性能

最好的解决方案：编程式导航+事件的委派
利用事件委派存在的一些问题：
1.如何确定点击的就是a标签，而不是其他内容
2.如何获取参数(1、2、3级分类的产品的名字、id)

```
<!-- 利用事件委派+编程式导航实现路由的跳转与传递参数 -->
  <div class="all-sort-list2" @click="goSearch">
    <div
      class="item"
      v-for="(c1, c1Index) in categoryList"
      :key="c1.categoryId"
      :class="{ cur: c1Index == currentIndex }"
    >
      <h3 @mouseenter="changeIndex(c1Index)">
        <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{ c1.categoryName }}</a>
      </h3>
      <!-- 二级、三级分类 -->
      <div class="item-list clearfix" :style="{ display: currentIndex == c1Index ? 'block' : 'none' }">
        <div class="subitem" v-for="(c2, c2Index) in c1.categoryChild" :key="c2.categoryId">
          <dl class="fore">
            <dt>
              <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">
                {{ c2.categoryName }}
              </a>
            </dt>
            <dd>
              <em v-for="(c3, c3Index) in c2.categoryChild" :key="c3.categoryId">
                <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                  {{ c3.categoryName }}
                </a>
              </em>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
    goSearch(event) {
    //  最好的解决方案：编程式导航+事件的委派
    //  利用事件委派存在的一些问题：
    //  1.如何确定点击的就是a标签，而不是其他内容 --> 给a标签添加data-categoryName属性做识别
    //  2.如何获取参数(1、2、3级分类的产品的名字、id)
    //  注意添加的代码属性是data-categoryName，浏览器会转换成data-categoryname,进行小写
    //  带有data-categoryname的节点一定是a标签
    let element = event.target
    //  解构注意属性驼峰命名都转换成小写了
    let { categoryname, category1id, category2id, category3id } = element.dataset
    if (categoryname) {
      //  整理路由跳转的参数
      let location = { name: 'search' }
      let query = {
        categoryName: categoryname,
      }
      //  也通过自定义区分1、2、3级分类的名字
      if (category1id) {
        //  一级分类
        query.category1Id = category1id
      } else if (category2id) {
        //  二级分类
        query.category2Id = category2id
      } else if (category3id) {
        //  三级分类
        query.category3Id = category3id
      } else {
        //  预想情况之外
      }
      //  判断：如果路由跳转的时候，带有params参数，那么也要携带 
      //  ==>目的是进入到了search页，将用户的搜索内容携带上，向接口请求准确的数据
      if(this.$route.params){
        location.params = this.$route.params
        //  整理完参数
        location.query = query
        //  路由跳转
        this.$router.push(location)
      }
    }
  }
```
7.完成三级联动路由跳转与传递参数
this.$router.push({
  name:'search',
  query:{
    categoryName:categoryname,
    ...
  }
})