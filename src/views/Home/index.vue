<template>
  <div >
    <!-- 三级联动组件 -->
    <TpyeNav></TpyeNav>
    <!-- 列表组件 -->
    <ListContainer></ListContainer>
    <!-- 推荐组件 -->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
      <Like></Like>
      <!-- 楼层 -->
      <Floor v-for="item in floorList" :key="item.id" :floorData="item"></Floor>
    <!-- 商标 -->
  <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/index.vue'
import Recommend from '@/views/Home/Recommend/index.vue'
import Rank from '@/views/Home/Rank'
import Like from '@/views/Home/Like/index.vue'
import Floor from '@/views/Home/Floor/index.vue'
import Brand from '@/views/Home/Brand/index.vue'
import {mapState} from "vuex"
export default {
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted(){
    //floor发起请求
    this.$store.dispatch('getList')
    //发起token信息的请求
    this.$store.dispatch('getToken') 
  },
  computed:{
    //接受数据
    ...mapState({
      floorList:state=>state.home.floorList
    })
  }
}
</script>

<style>

</style>