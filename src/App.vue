<template>
  <div id="app">
    <!-- 头部区域 -->
    <Header></Header>

    <!-- 路由视口 -->
    <router-view></router-view>
    <!-- 底部区域 this.$route.meta.show路由元信息的隐藏与显示 -->
    <Footer v-show="this.$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/index.vue'
import Footer from '@/components/footer/index.vue'
export default {
  components:{
    Header,
    Footer
  },
  created(){
    this.$store.dispatch('getNavlist')
  },



}
</script>
<style lang="less"></style>
