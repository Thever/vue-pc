import { mapState } from 'vuex';
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 给目标内容外套父组件，利用事件委派|事件委托来解决鼠标离开交互处理 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过度动画 -->
        <transition name='sort'>
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
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
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
//  引入方式：是把loash全部功能函数引入
// import _ from 'lodash'
//  按需引入
import throttle from 'lodash/throttle'
export default {
  name: 'TypeNav',
  data() {
    return {
      //  存储用户鼠标悬停的一级分类的序号
      currentIndex: -1,
      //  是否显示下拉内容
      show: true,
    }
  },
  //  组件挂载完毕，就可以向服务器发请求
  mounted() {
    //  通知Vuex发请求，获取数据，存储于仓库当中
    // this.$store.dispatch('categoryList')
    //  App.vue挂载的时候已经请求了接口放到vuex中了，可以直接使用，不需要反复请求
    //  如果不是Home路由组件，将typeNav进行隐藏
    // console.log(this.$route)
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  methods: {
    //  鼠标进入修改响应式数据curentIndex
    //  ES6写法
    // changeIndex(index) {
    //   //  正常情况(用户慢慢操作)：鼠标进入，每一个一级分类h3,都会触发鼠标进入时间
    //   //  非正常情况(用户操作很快)：本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部h3触发了
    //   //  就是由于用户操作过快，导致浏览器反应不过来了，如果当前回调函数中有一些大量业务，有可能出现卡顿现象
    //   this.currentIndex = index
    // },
    //  ES5写法
    //  这里使用了按需引入，不用使用 _. 前缀了
    //  throttle回调函数慎用箭头函数，可能会因为this指向问题，出现上下文关系
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),
    // 鼠标移除重置选中
    leaveIndex() {
      this.currentIndex = -1
      //  如果是搜索页就隐藏内容
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
    // 进行路由跳转的方法
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
    },
    //  当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      if (this.$route.path != '/home') {
        this.show = true
      }
    },
  },
  computed: {
    ...mapState({
      //  右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //  注册一个参数state,其实即为大仓库中的数据
      categoryList: (state) => {
        //  组件categoryList属性使用state.home.categoryList
        return state.home.categoryList
      },
    }),
  },
}
</script>

<style  lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            _height: 200px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
          // 取消原本的hover用JS来实现
          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        // 解决鼠标悬停更改样式
        // .item:hover{
        //   background-color:skyblue;
        // }
        // 选中的一级导航的天蓝色
        .cur {
          background-color: skyblue !important;
        }
      }
    }
    //  过度动画的样式,注意这里配合 transition 以及里面的 name=“sort” 来自定义切换动画
    //  过度动画开始状态(进入)
    .sort-enter{
      height:0px;
      opacity:0;
    }
    //  过度动画结束状态(进入)
    .sort-enter-to{
      height:461px;
      opacity:1;
    }
    //  定义进入动画时间、速率
    .sort-enter-active{
      transition:all 0.5s linear;
    }
    // //  过度动画开始状态(离开)
    // .sort-leave{
    //   height:461px;
    //   opacity:1;
    // }
    // //  过度动画结束状态(离开)
    // .sort-leave-to{
    //   height:0;
    //   opacity:0;
    // }
    // //  定义离开动画时间、速率
    // .sort-leave-active{
    //   transition:all 0.3s linear;
    // }
  }
}
</style>
