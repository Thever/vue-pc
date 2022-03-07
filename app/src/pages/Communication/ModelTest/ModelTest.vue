<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="msg">
    <span>{{msg}}</span>
    <br>
    <h2>深入v-model原理</h2>
    <!-- 原生DOM当中是有oninput事件：当表单元素发生文本的变化的时候就会立即出发 -->
    <!-- 原生DOM中的$event,可以获取到原生DOM事件 -->
    <input type="text" :value="msg" @input=" msg = $event.target.value"/>
    <span>{{msg}}</span>
    <!-- 父子组件间用v-model来通信，父组件给子组件传值 -->
    <!--并非原生DOM：自定义组件-->
    <!-- :value到底是什么?props，父子组件通信 -->
    <!-- @input到底是什么?并非原生DOM的input事件，属于自定义事件 -->
    <!-- 自定义组件中$event,可以获取到自定义事件传入的值 -->
    <CustomInput :value="msg" @input="msg = $event"></CustomInput>
    <!-- v-model 简化版写法-->
    <CustomInput v-model="msg"></CustomInput>
    <hr>
  </div>
</template>

<script type="text/ecmascript-6">
  import CustomInput from './CustomInput.vue'
  export default {
    name: 'ModelTest',
    data() {
      return {
         msg:"我爱塞北的大雪呀"
      }
    },
    components: {
      CustomInput
    }
  }
</script>
