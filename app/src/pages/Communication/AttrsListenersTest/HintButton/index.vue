<template>
  <div>
    <!-- 用a标签实现提示功能 -->
    <a :title="title">
        <!-- 注意接受$attrs,$listeners时，v-bind,v-on不能用对应的简写形式 -->
        <el-button v-bind="$attrs" v-on="$listeners">添加</el-button>
    </a>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['title'],
  mounted() {
    //this.$attrs:可以获取到父亲传递的数据【props】
    //this.$attrs是可以获取父亲传递的props数据，如果子组件通过
    //props:[],接受，那么接受过的属性，this.$attrs属性是获取不到的
    console.log(this.$attrs)
    console.log(this.$listeners)
  },
}
</script>

<style scoped></style>
