<template>
  <div style="background: #ccc; height: 50px;">
    <h2>input包装组件----{{value}}</h2>
    <!-- 将props传入的value值作为input框的value值 -->
    <!-- input框内容变化时，将新内容通过自定义’input‘事件发送给父组件 -->
    <input :value="value"  @input="$emit('input',$event.target.value)"/>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: 'CustomInput',
    props:['value']
  }
</script>
