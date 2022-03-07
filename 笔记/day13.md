复习:
支付(elementUI + qrCode) + 个人中心(二级路由)

1.个人中心完成
面试的时候：是否封装过组件：有，分页器、日历
个人中心当中：分页器

2.全局守卫
未登录访问，交易关联(trade)、支付相关(pay/paysuccess)、用户中心(center)相关跳转到登录页面

3.路由独享守卫
只有从购物车界面才能跳转到交易页面(创建订单)
只有从交易页面(创建订单页面)才能跳转到支付页面
只有从支付页面才能跳转到支付成功页面

4.图片懒加载
https://www.npmjs.com/package/vue-lazyload
自定义插件

5.vee-calidate 基本使用

5.1 插件安装与引入
//  2版本比较简单好用
npm install vee-validate@2 --save

//  validate.js 使用文件
import VeeValidate from 'vee-validate'
import zh_CN from 'vee-validate/dist/locale/zh_CN'
Vue.use(VeeValidate)

5.2 提示信息
VeeValidate.Validator.localize('zh_CN',{
  messages:{
    ...zh_CN.messages,
    is:(field) => `${field}必须与密码相同`  //  修改内置规则的 message, 让确认密码和密码相同
  },
  attributes:{
    //  给校验的 field 属相名映射中文名称
    phone:'手机号',
    code:'验证码',
    password:'密码',
    password1:'确认密码',
    isCheck:'协议'
  }
})

5.3 基本使用
<input 
  place="请输入你的手机号"
  v-model="phone"
  name="phone"
  v-validate="{required:true, regex:/^1\d{10}$/}"
  :class="{invalid: errors.has('phone')}"
/>
<span class="error-msg">{{errors.first('phone')}}</span>

const success = await this.$validator.validateAll(); //全部表单验证

VeeValidate.Validator.extend('agree',{
  validate: value => {
    return value
  },
  getMessage: field => field + '必须同意'
})

6.路由懒加载
为了高效，使用 () => import ('xxxx'), 来动态引入

7.打包上线
7.1 打包npm run build

项目带包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
有了 .map 映射文件就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
所以该文件如果项目不需要时可以去除掉
vue.config.js 配置
productionSourceMap:false

7.2 购买云服务器

1、购买服务器 1：阿里云 2：腾讯云 等等
2、设置安全组，让服务器一些端口打开
3、利用xshell工具登录服务器

linux:  /根目录
linux常用指令: cd跳转目录 ls查看文件 mkdir创建文件夹 pwd:查看绝对路径

7.3 nginx配置代理
1.为啥访问服务器就能访问项目 --> 配置了nginx文件
2.项目数据组来自于39.98.123.211，与购买的不是同一服务器，但是服务器之间通信不受同源策略影响，可以相互通信,当然你也可以配置代理解决
3.nginx配置：
1:xshell进入根目录/etc
2:进入etc目录，里面有一个nginx目录【已经安装过nginx,如果没有安装过，四五个文件】
3:如果想安装nginx:yum install nginx
4.安装完nginx服务器后，你会发现在nginx目录下，多了一个nginx.conf文件，在这个文件中进行配置
5.vim nginx.conf 使用 vim 编辑器编辑 nginx.config, 主要添加如下两项
//  解决第一个问题
location / {
  //  指定根目录
  root /root/jch/www/shangpinghui/dist;
  //  指定首页
  index index.html;
  //  
  try_files $url $uri/ /index.html
}
//  解决第二个问题 配置代理
location /api {
  proxy_pass 39.98.123.211;
}
6.nginx服务器启动
service nginx start