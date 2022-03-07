<template>
  <div style="background: #ccc; height: 50px;">
    <h3>女儿小红: 有存款: {{money}}</h3>
    <button @click="geiQian(100)">给BABA钱: 100</button>
  </div>
</template>

<script>
//  导入公共业务逻辑方法
import myMixin from './myMixin/myMixin'
export default {
  name: 'Daughter',
  //  混入使用
  mixins:[myMixin],
  data () {
    return {
      money: 20000
    }
  },
}
</script>
