<template>
  <div>
    小明的爸爸现在有{{ money }}元
    <h2>不使用sync修改符</h2>
    <!-- :money="money",props传入money -->
    <!-- @update:money，自定义事件名称为update:money -->
    <!-- 类似于v-model实现父子组件数据同步 -->
    <Child :money="money" @update:money="money = $event"></Child>
    <h2>使用sync修改符</h2>
    <!--
      :money.sync 
      第一，父组件给字符串传递props money
      第二，给当前子组件绑定了一个自定义事件，而且事件的名称为update:money [update:属性名]
    -->
    <Child2 :money.sync="money"></Child2>
    <h2>使用v-model修改符</h2>
    <hr />
  </div>
</template>

<script type="text/ecmascript-6">
import Child from './Child.vue'
import Child2 from './Child2.vue'
export default {
  name: 'SyncTest',
  data() {
    return {
      money: 10000
    }
  },
  components: {
    Child,
    Child2
  }
}
</script>
