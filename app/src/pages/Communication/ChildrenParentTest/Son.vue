<template>
  <div style="background: #ccc; height: 50px">
    <h3>儿子小明: 有存款: {{ money }}</h3>
    <button @click="geiQian(50)">给BABA钱: 50</button>
    <TestRef />
  </div>
</template>

<script>
import TestRef from './TestRef.vue'
//  导入公共业务逻辑方法
import myMixin from './myMixin/myMixin'
export default {
  name: 'Son',
  //  混入使用
  mixins:[myMixin],
  components: {
    TestRef,
  },
  data() {
    return {
      money: 30000,
    }
  },

  methods: {
    tinghua() {
      console.log('我是小明，我听爸爸的话')
    },
  },
}
</script>
