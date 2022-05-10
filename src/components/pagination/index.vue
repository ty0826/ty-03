<template>
  <div class="pagination">
    <button :disabled="pageOne == 1" @click="$emit('changeClick', pageOne - 1)">上一页</button>
    <button v-if="allNum.start > 1" @click="$emit('changeClick', 1)" :class="{ actives: pageOne == 1 }">1</button>
    <button v-if="allNum.start > 2">···</button>
    <!-- 中间部分 -->
    <button v-for="(page, index) in allNum.end" :key="index" @click="$emit('changeClick', page)" v-if="page >= allNum.start" :class="{ actives: pageOne == page }">{{ page }}</button>

    <button v-if="allNum.end < totalPage - 1">···</button>
    <button :class="{ actives: pageOne == totalPage }" v-if="allNum.end < totalPage" @click="$emit('changeClick', totalPage)">{{ totalPage }}</button>
    <button :disabled="pageOne == totalPage" @click="$emit('changeClick', pageOne + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  props: ['pageOne', 'pageSize', 'total', 'contioune'],
  name: 'Pagination',
  computed: {
    //总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    //连续的页码页的开始值和结束值
    allNum() {
      const { pageOne, contioune } = this
      let start = 0,
        end = 0
      //如果总页数不足分页数
      if (contioune > this.totalPage) {
        ;(start = 1), (end = this.totalPage)
      } else {
        start = pageOne - parseInt(contioune / 2)
        end = pageOne + parseInt(contioune / 2)
        if (pageOne == 1) {
          //当前为第一页
          ;(start = 1), (end = contioune)
        }
        //当前为最后一页
        if (pageOne >= this.totalPage - 1) {
          start = this.totalPage - contioune + 1
          end = this.totalPage
        }
      }
      return { start, end }
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
  .actives {
  background-color: pink;
}
}

</style>
