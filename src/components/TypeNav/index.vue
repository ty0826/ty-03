<template>
  <div class="type-nav">
    <div class="container"  @mouseenter="enter" @mouseleave="leave">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <div class="sort" v-show="show">
        <div class="all-sort-list2" @click="goSearch">
          <!-- 一级菜单 -->
          <div class="item bo" v-for="l1 in resultList" :key="l1.categoryId">
            <h3>
              <a style="cursor: pointer" :data-categoryName="l1.categoryName" :data-category1Id="l1.categoryId">{{ l1.categoryName }}</a>
            </h3>
            <div class="item-list clearfix">
              <!-- 二级菜单 -->
              <div class="subitem" v-for="l2 in l1.categoryChild" :key="l2.categoryId">
                <dl class="fore">
                  <!-- 三级菜单 -->
                  <dt>
                    <a style="cursor: pointer" :data-categoryName="l2.categoryName" :data-category2Id="l2.categoryId">{{ l2.categoryName }}</a>
                  </dt>
                  <dd>
                    <em v-for="l3 in l2.categoryChild" :key="l3.categoryId">
                      <a style="cursor: pointer" :data-categoryName="l3.categoryName" :data-category3Id="l3.categoryId">{{ l3.categoryName }}</a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'TypeNav',
  data() {
    return {
      show: true //三级菜单初始状态
    }
  },
  created() {
    //让home库发起请求,放在app根组件，可以减少请求次数
    // this.$store.dispatch('getNavlist')
    if (this.$route.path != '/Home') {
      this.show = false
    }
  },
  computed: {
    //接受vuex传过来的数据
    ...mapState({
      resultList: (state) => {
        return state.home.getNavlist
      }
    })
  },
  methods: {
    //三级联动传参
    goSearch(event) {
      //event可以获取到当前点击的子节点
      let element = event.target
      //节点的dataset可以获得当前标签的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = element.dataset
      console.log(element.dataset)
      //如果存在categoryname属性表示是A标签
      if (categoryname) {
        //跳转的参数
        let location = { name: 'sreach' }
        let query = { categoryName: categoryname }
        //一级标签
        if (category1id) {
          query.category1Id = category1id
        } //二级标签
        else if (category2id) {
          query.category2Id = category2id
        } else {
          query.category3Id = category3id
        }
        if (this.$route.params) {
          location.params = this.$route.params
          location.query = query
          this.$router.push(location)
        }
      }
    },
    //鼠标进入，三级列表状态
    enter() {
      this.show = true
    },
    //鼠标离开，三级列表状态
    leave() {
      if (this.$route.path != '/Home') {
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        .item:hover {
          background-color: pink;
        }
      }
    }
  }
}
</style>
