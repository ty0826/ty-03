<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="item in cartInfoList" :key="item.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="item.isChecked" @change="changeStastu(item)" />
          </li>
          <li class="cart-list-con2">
            <img :src="item.imgUrl" />
            <div class="item-msg">{{ item.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ item.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="change('sub', '-1', item)">-</a>
            <input disabled="true" autocomplete="off" type="text" :value="item.skuNum" minnum="1" class="itxt" />
            <a href="javascript:void(0)" class="plus" @click="change('add', '+1', item)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ item.skuPrice * item.skuNum }}</span>
          </li>
          <li class="cart-list-con7" style="display: flex; font-size: 15px; color: pink">
            <a style="cursor: pointer; padding-right: 20px" @click="delect(item)" class="sindelet">删除</a>
            <br />
            <a style="cursor: pointer">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="changeAllstastu" />
        <span>全选</span>
      </div>
      <div class="option">
        <a style="cursor: pointer;" @click="delectAllshops">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span style="color: red; font-size: 20px">{{ sumNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ sumPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/Trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//节流数据
import throttle from 'lodash/throttle'
export default {
  name: 'ShopCart',
  created() {
    this.carList()
  },
  methods: {
    //获取购物车列表
    carList() {
      this.$store.dispatch('getCarlist')
    },
    // 加减的点击事件
    change: throttle(async function (type, disNum, cart) {
      //type为类型，disNum为变化量，cart为对象
      switch (type) {
        //判断其事件的类型
        case 'add':
          disNum = 1
          break
        case 'sub':
          if (cart.skuNum <= 1) {
            disNum = 0
          } else {
            disNum = -1
          }
          break
      }
      try {
        await this.$store.dispatch('addShopcars', { skuId: cart.skuId, skuNum: disNum })
        this.carList()
      } catch (error) {
        alert(error.message)
      }
    }, 1000),
    //删除列表
    async delect(item) {
      try {
        await this.$store.dispatch('delectCar', item.skuId)
        this.carList()
      } catch (error) {
        alert(error.message)
      }
    },
    //复选框状态改变
    async changeStastu(item) {
      let isChecked = item.isChecked == 1 ? 0 : 1
      try {
        await this.$store.dispatch('changeStastu', { skuId: item.skuId, isChecked: isChecked })
        this.carList()
      } catch (error) {
        alert(error.message)
      }
    },
    //删除选中商品
    async delectAllshops() {
      try {
        await this.$store.dispatch('delectAllshops')
        //接收服务器传来的结果
        this.carList()
      } catch (error) {
        alert(error.message)
      }
    },
    //改变所有复选框状态
  async  changeAllstastu(event) {
      let result = event.target.checked ? '1' : '0'
   try {
      await  this.$store.dispatch('changeAllstastu',result)
      this.carList()
   } catch (error) {
        alert(error.message)
   }
    }
  },
  computed: {
    ...mapGetters(['carLists']),
    //购物车列表信息
    cartInfoList() {
      return this.carLists.cartInfoList || []
    },
    //总数量
    sumNum() {
      let sum = 0
      this.cartInfoList.forEach((element) => {
        sum = sum + element.skuNum
      })
      return sum
    },
    //总价
    sumPrice() {
      let sum = 0
      this.cartInfoList.forEach((element) => {
        sum = sum + element.skuNum * element.skuPrice
      })
      return sum
    },
    //复选框状态
    isAllChecked() {
      //every遍历是否是1，返回为真
      return this.cartInfoList.every((item) => item.isChecked == 1)
    }
  }
}
</script>

<style lang="less" scoped>

.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
