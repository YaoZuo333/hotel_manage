<template>
    <div class="order-self">
      <h2>我的订单</h2>
      <div class="">
        <div id="examine_manage">
          <table id="houseDetails">
            <tr>
              <td class="choose">订单号</td>
              <td class="title">房间类型</td>
              <td class="rentType">开始时间</td>
              <td class="houseArea">结束时间</td>
              <td class="location">房间数</td>
              <td class="houseTheme">房间单价</td>
              <td class="price">房间总价</td>
              <td class="more">订单状态</td>
            </tr>
            <tr v-for="(order,index) in this.ordersData" class="gery_bg" >
              <td class="choose">{{order.order_id}}<span>. </span><input type="checkbox" ref="checkboxs" name="info" :value="order.order_id"></td>
              <td class="title" :title="order.order_type">{{order.order_type}}</td>
              <td class="rentType" :title="order.order_startdate">
                {{order.order_startdate| datefmt('YYYY-MM-DD')}}
              </td>
              <td class="houseArea" :title="order.order_enddate">
                {{order.order_enddate| datefmt('YYYY-MM-DD')}}
              </td>
              <td class="location" :title="order.order_number">{{order.order_number}}</td>
              <td class="houseTheme" :title="order.order_price">{{order.order_price}}</td>
              <td class="price" :title="order.order_total">{{order.order_total}}</td>
              <td class="more"><span>{{order.order_state}}</span></td>
            </tr>

          </table>
          <template>
            <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total/>
          </template>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {defaultFormat} from 'moment'
  import {getSelfOrder} from './../../api/index'
    export default {
        name: "Order",
      data(){
          return{
            orders:[],
            ordersData:[],
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
          }
      },
      computed:{
        ...mapState(['userInfo'])
      },
      methods:{
        async selfOrder(){
          const result = await getSelfOrder(this.userInfo.id);
          //console.log(result);
          this.orders = result.message;
          this.dataCount = this.orders.length;
          if (this.orders.length < this.pageSize) {
            this.ordersData = this.orders
          }else {
            this.ordersData = this.orders.slice(0,this.pageSize)
          }
        }
      },
      created(){
          this.selfOrder();
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">



  #examine_manage>table{
    width: calc(100% - 15px);
    table-layout:fixed;
    border-spacing:0px;
    border-collapse: collapse;
    margin-top: 80px;
  }
  td{
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }
  #examine_manage>table>tr{
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 14px;
    color: #333;
    text-align: center;

  }
  #examine_manage>table>tr:first-child{
    font-size: 16px;
    margin-top: 0;
    padding: 0;
    width: 100%;
    /*background: #f2f2f2 url(./../../assets/table-head-bg.jpg) 0 0 repeat;*/
    border: 1px solid #dcdcdc;
    height: 34px;
    line-height: 34px;
    zoom: 1;
    border-radius: 10px;
  }

  .choose{
    width: 45px;
  }
  .title{
    width: 12%;
  }
  .rentType{
    width: 8%;
  }
  .houseArea{
    width: 8%;
  }
  .location{
    width: 8%;
  }
  .houseTheme{
    width: 8%;
  }
  .price{
    width: 8%;
  }
  .more{
    width: 8%;
  }
  .more>span{
    color: #338af9;
  }
  .more>span:hover{
    cursor: pointer;
  }
  .gery_bg:nth-child(2n+1){
    background-color: #eee;
  }
</style>
