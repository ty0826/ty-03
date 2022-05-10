<template>
  <div>
    <!-- 三级联动 -->
    <TpyeNav></TpyeNav>
    <div class="main">
      <div class="py-container">
        <!--bread面包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x">手机</li>
            <!-- 三级联动的面包屑 -->
            <li class="with-x" v-if="SearchForm.categoryName">{{ SearchForm.categoryName }}<i @click="removeCategoryName">×</i></li>
            <!-- //搜索框的面包屑 -->
            <li class="with-x" v-if="SearchForm.keyword">{{ SearchForm.keyword }}<i @click="removeKeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="SearchForm.trademark">{{ SearchForm.trademark.split(':')[1] }}<i @click="removeTrademark">×</i></li>
            <!-- 品牌属性值的面包屑 -->
            <li class="with-x" v-for="(item, index) in SearchForm.props" :key="index">{{ item.split(':')[1] }}<i @click="removeProps(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @getTrademark="getTrademark" @attrList="attrList" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: isdoes }" @click="change('1')">
                  <a>综合 <span v-show="isdoes" class="iconfont" :class="{ 'icon-xiangshangjiantoucuxiao': isAsc, 'icon-xiangxiajiantoucuxiao': deAsc }"></span> </a>
                </li>
                <li :class="{ active: does }" @click="change('2')">
                  <a>销量<span v-show="does" class="iconfont" :class="{ 'icon-xiangshangjiantoucuxiao': isAsc, 'icon-xiangxiajiantoucuxiao': deAsc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/Detail/${item.id}`"> <img v-lazy="item.defaultImg" /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ item.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ item.price }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <Pagination :pageOne="SearchForm.pageOne" :pageSize="SearchForm.pageSize" :total="total" :contioune="5" @changeClick="changeClick"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  data() {
    return {
      SearchForm: {
        category1Id: '',
        category2Id: '',
        category3Id: '',
        categoryName: '',
        keyword: '',
        order: '2:desc',
        pageOne: 1, //当前页数
        pageSize: 5,
        props: [],
        trademark: ''
      }
    }
  },
  components: {
    SearchSelector
  },
  beforeMount() {
    {
      // console.log(this.$route.params);
      // console.log(this.$route.query);
      // this.SearchForm.category1Id = this.$route.query.category1id
      // this.SearchForm.category2Id = this.$route.query.category2id
      // this.SearchForm.category3Id = this.$route.query.category3id
      // this.SearchForm.categoryName = this.$route.query.categoryName
      // this.SearchForm.keyword = this.$route.params.keyword
    }
    //在请求之前改变参数
    Object.assign(this.SearchForm, this.$route.query, this.$route.params)
  },
  mounted() {
    //请求
    this.data()
  },
  watch: {
    //监听路由变化，再次发起请求
    $route() {
      //再次重新赋值，mounted只会执行一次
      Object.assign(this.SearchForm, this.$route.query, this.$route.params)
      //再次发起请求
      this.data()
      //请求之后将ID值置空
      this.SearchForm.category1Id = ''
      this.SearchForm.category2Id = ''
      this.SearchForm.category3Id = ''
    }
  },
  computed: {
    ...mapGetters(['goodsList']),
    //active类的显示
    does() {
      return this.SearchForm.order.indexOf('2') != -1
    },
    isdoes() {
      return this.SearchForm.order.indexOf('1') != -1
    },
    isAsc() {
      return this.SearchForm.order.indexOf('asc') != -1
    },
    deAsc() {
      return this.SearchForm.order.indexOf('desc') != -1
    },
    ...mapState({
      total: (state) => {
        return state.sreach.goodsList.total
      }
    })
  },

  methods: {
    //封装请求方法
    data() {
      this.$store.dispatch('searchGoods', this.SearchForm)
    },
    //清除分类面包屑
    removeCategoryName() {
      this.SearchForm.categoryName = ''
      this.SearchForm.category1Id = undefined
      this.SearchForm.category2Id = undefined
      this.SearchForm.category3Id = undefined
      //再次发起请求
      this.data()
      //改变路由地址
      if (this.$route.params) {
        this.$router.push({ name: 'sreach', params: this.$route.params })
      }
    },
    //清除关键字面包屑
    removeKeyword() {
      this.SearchForm.keyword = ''
      this.data()
      //清除输入框关键字
      this.$bus.$emit('clear')
      //改变路由地址
      if (this.$route.query) {
        this.$router.push({ name: 'sreach', query: this.$route.query })
      }
    },
    // 接受子组件传过来的值,品牌
    getTrademark(value) {
      this.SearchForm.trademark = `${value.tmId}:${value.tmName}`
      this.data()
    },
    //接收子组传过来的属性值["属性ID:属性值:属性名"]
    attrList(item, i) {
      let props = `${item.attrId}:${i}:${item.attrName}`
      console.log(props)
      //数组去重
      if (this.SearchForm.props.indexOf(props) == -1) {
        this.SearchForm.props.push(props)
      }
      this.data()
    },
    //清除品牌的名字
    removeTrademark() {
      this.SearchForm.trademark = ''
      this.data()
    },
    //清除属性
    removeProps(index) {
      this.SearchForm.props.splice(index, 1)
      this.data()
    },
    //改变综合，销量的状态
    change(index) {
      //获取最初的状态
      let orginFlag = this.SearchForm.order.split(':')[0]
      let orginSort = this.SearchForm.order.split(':')[1]
      let newFlag = ''
      if (index == orginFlag) {
        newFlag = `${orginFlag}:${orginSort == 'desc' ? 'asc' : 'desc'}`
      } else {
        newFlag = `${index}:${'asc'}`
      }
      this.SearchForm.order = newFlag
      this.data()
    },
    //自定义事件
    changeClick(page) {
      this.SearchForm.pageOne = page
      this.data()
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
