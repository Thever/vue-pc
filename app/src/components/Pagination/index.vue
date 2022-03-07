<template>
  <div class="pagination">
    <!-- 内容上 -->
    <button :disabled="pageNo == 1" @click="callbackEvent(pageNo - 1)">上一页</button>
    <button :class="{active:pageNo == 1}" v-if="startNumAndEndNum.start > 1" @click="callbackEvent(1)">1</button>
    <button v-if="startNumAndEndNum.start > 2">...</button>
    <!-- 内容中 -->
    <button v-for="(page, index) in startNumAndEndNum.end" :key="index" v-if="page >= startNumAndEndNum.start" :class="{active:page == pageNo}" @click="callbackEvent(page)">{{page}}</button>
    <!-- 内容下 -->
    <button v-if="startNumAndEndNum.end < totalPage - 1">...</button>
    <button :class="{active:pageNo == totalPage}" v-if="startNumAndEndNum.end < totalPage">{{ totalPage }}</button>
    <button :disabled="pageNo >= totalPage" @click="callbackEvent(pageNo + 1)">下一页</button>
    <button style="margin-left: 30px" @click="callbackEvent(totalPage)">共 {{ totalPage }} 条</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: [
    //  当前页面序号
    'pageNo',
    //  分页数量
    'pageSize',
    //  总条数
    'total',
    //  分页连续页码个数
    'continues',
  ],
  computed: {
    //  总共多少页
    totalPage() {
      //  向上取整
      return Math.ceil(this.total / this.pageSize)
    },
    //  计算出连续的页码的起始数字与结束数字
    //  连续页码的数字，至少是5
    startNumAndEndNum() {
      //  结构取值
      const { totalPage, pageNo, continues } = this
      //  先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0
      //  连续的页码数字5 --> 至少是5页
      //  如果出现不正常的现在(不够5页的话)
      if (continues > totalPage) {
        //  不正常现象，总页数没有连续的页码多
        start = 1
        end = totalPage*1
      } else {
        //  正常现象，总页数至少有连续页面的数量
        start = pageNo - parseInt(continues / 2)
        end = pageNo + parseInt(continues / 2)
        //  把出现不正常的现象(start数字出现0|负数)纠正
        if(start < 1){
          start = 1
          end = continues*1
        }
        //  把出现不正常的现象(end数字大于总页码)纠正
        if(end > totalPage){
          end = totalPage
          start = totalPage - continues + 1
        }
        return {start, end, pageNo}
      }
    },
  },
  methods:{
    //  触发父组件传入的自定义事件，传入参数
    callbackEvent(index){
      this.$emit('getPageNo', index)
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background-color:skyblue;
}
</style>