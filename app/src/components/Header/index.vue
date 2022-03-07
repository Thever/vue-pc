<template>
    <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
        <div class="container">
            <div class="loginList">
                <p>尚品汇欢迎您！</p>
                <!-- 这里有两种状态，登录和未登录 -->
                <!-- 未登录 -->
                <p v-if="!userName">
                    <span>请</span>
                    <!-- 声明式导航，务必要有to属性 -->
                    <router-link to="/login">登录</router-link>
                    <router-link class="register" to="/register">免费注册</router-link>
                </p>
                <!-- 登录了 -->
                <p v-else>
                    <span>{{userName}}</span>
                    <a class="register" @click="logout">退出登录</a>
                </p>
            </div>
            <div class="typeList">
                <router-link to="/center/myorder">我的订单</router-link>
                <router-link to="/shopcart">我的购物车</router-link>
                <router-link to="">我的尚品汇</router-link>
                <router-link to="">尚品汇会员</router-link>
                <router-link to="">企业采购</router-link>
                <router-link to="">关注尚品汇</router-link>
                <router-link to="">合作招商</router-link>
                <router-link to="">商家后台</router-link>
            </div>
        </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
        <h1 class="logoArea">
            <router-link class="logo" to="home">
                <img src="./images/logo.png" alt="">
            </router-link>
        </h1>
        <div class="searchArea">
            <form action="###" class="searchForm">
                <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword"/>
                <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">搜索</button>
            </form>
        </div>
    </div>
</header>
</template>
<script>
export default {
    name:'',
    data(){
      return {
        keyword:''
      }
    },
    methods:{
        //  搜索按钮的回调函数，需要向search路由进行跳转
        goSearch(){
            // this.$router.push('/search')
            //  路由传递参数
            //  第一种：字符串形式
            // this.$router.push('/search/'+this.keyword+'?k='+this.keyword.toUpperCase())
            //  第二种：模板字符串
            // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)
            //  第三种：对象写法
            // this.$router.push({
            //   //  跳转组件
            //   name:'search',
            //   //  param参数
            //   params:{
            //     keyword:this.keyword
            //   },
            //   //  query参数
            //   query:{
            //     k:this.keyword.toUpperCase()
            //   }
            // })
            /*******************************/
            // 面试题1：路由传递参数(对象写法)path是否可以结合params参数一起使用？不能
            // 答：路由跳转传参的时候，对象的写法可以是name、path形式，但是需要注意的是，path这种写法不能与params参数一起使用
            // this.$router.push({
            //   path:'/search',
            //   params:{keyword:this.keyword},
            //   query:{k:this.keyword.toUpperCase()}
            // })
            
            //  面试题2：如何指定params参数客串可不传？
            //  如果路由要求传递params参数，但是你不传递params参数，URL就有问题
            //  如何指定params参数可以传递或者不传递、在配置路由的时候，在占位的后面加一个问号(params可以传递或不传递)
            // this.$router.push({
            //   name:'search',
            //   query:{k:this.keyword.toUpperCase()}
            // })

            //  面试3：params参数可以传递也可以不传递，但是如果传递的是空串，如何解决？
            //  使用undefined解决：params参数可以传递、不传递(空的字符串)
            // this.$router.push({
            //   name:'search',
            //   params:{keyword:''||undefined},
            //   query:{k:this.keyword.toUpperCase()}
            // })

            //  面试4：路由组件能不能传递props数据
            //  可以的：三种写法
            // this.$router.push({
            //   //  跳转组件
            //   name:'search',
            //   //  param参数
            //   params:{
            //     keyword:this.keyword
            //   },
            //   //  query参数
            //   query:{
            //     k:this.keyword.toUpperCase()
            //   }
            // })
            //  解决NavigationDupicated的错误警告，给this.$router.push传入生成的promise对应的成功回调和失败回调
            //  this.$router.push(配置参数，成功回调函数，失败回调函数)
            // this.$router.push({
            //   //  跳转组件
            //   name:'search',
            //   //  param参数
            //   params:{
            //     keyword:this.keyword || undefined
            //   },
            //   //  query参数
            //   query:{
            //     k:this.keyword.toUpperCase()
            //   }
            // },(res) => {
            //   console.log('搜索栏回调成功了')
            //   console.log(res)
            // }, (err) => {
            //   console.error('搜索栏回调失败了')
            //   console.log(err)
            // })
            //  根本解决：重写对应的push|replace方法，已重写完成，参考路由配置文件
            // this.$router.push({
            //   //  跳转组件
            //   name:'search',
            //   //  param参数
            //   params:{
            //     keyword:this.keyword || undefined
            //   },
            //   //  query参数
            //   query:{
            //     k:this.keyword.toUpperCase()
            //   }
            // })
            //  与三级分类菜单统一，合并参数，方便请求处理逻辑
            //  配置路由常量
            let location = {
              name:'search',
              params:{
                keyword:this.keyword || undefined
              }
            }
            //  如果路由带了query参数就配置上
            if(this.$route.query){
              location.query = this.$route.query
            }
            //  携带参数进行跳转
            this.$router.push(location)
        },
        //  退出登录
        async logout(){
          try {
            //  通知服务器清除token
            //  清除本地用户信息
            await this.$store.dispatch('userLogout')
            //  回到首页
            this.$router.push('/home')
          } catch (error) {
            alert(error.message)
          }
        },
    },
    mounted(){
      //  组件挂载后开启对全局事件总线的监听
      this.$bus.$on('clearSearchWord', () => {
        this.keyword = ''
      })
    },
    computed:{
      //  用户名信息
      userName(){
        return this.$store.state.user.userInfo.name
      }
    }
}
</script>
<style lang="less" scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>