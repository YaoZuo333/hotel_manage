<template>
    <div class="order-manage">
      <h2>订单管理</h2>
      <div class="">

        <!--订单处理面板-->
        <div class="add-content" v-if="isManage">
          <div class="add-body">
            <form class="add-form">
              <h2>订单处理</h2>
              <ul>
              <li class="add-staff-name">
                客人姓名：{{orderUser.user_name}}
              </li>
              <li class="">
                客人性别：{{orderUser.user_sex}}
              </li>
              <li class="">
                联系电话：{{orderUser.user_phone}}
              </li>
              <li class="">
                <span>分配房间：</span>
                <input type="text" maxlength="18" v-model="roomIdStr"/>
                <span>可选房间：{{freeRoom}}</span>
              </li>
                <li class="">
                  <span>订单状态：<select id="number" v-model="changedState" default-first-option="未处理">
                    <option value="未处理">未处理</option>
                    <option value="已处理">已处理</option>
                    <option value="已付款">已付款</option>
                  </select></span>

                </li>
              </ul>
            </form>
          </div>
          <div class="add-footer">
            <button @click="updataOrder()">修改</button>
            <button @click="showUpdata(false)">关闭</button>
          </div>
        </div>

        <div id="examine_manage">
          <select id="showflag" v-model="showFlag" default-first-option="全部" v-on:change="changeShow()">
            <option value="全部">全部</option>
            <option value="未处理">未处理</option>
            <option value="已处理">已处理</option>
            <option value="已付款">已付款</option>、
          </select>
          <span class="pathbtn" @click="toStatic()">营销统计</span>
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
            <tr v-for="(order,index) in this.ordersData" class="gery_bg">
              <td class="choose">{{order.order_id}}</td>
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
              <td class="more"><span @click="showManage(true,order.order_id,order.u_id,order.order_type,order.order_number)">{{order.order_state}}</span></td>
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
  import {getAllOrder,getOrderUser,updataRoomState,upOrderState,getfreeRoom} from './../../api/index'
  import {Toast} from 'mint-ui'
    export default {
        name: "OrderManege",
      data(){
        return{
          isManage:false,
          orders:[],
          ordersData:[],
          // 初始化信息总条数
          dataCount:0,
          // 每页显示多少条
          pageSize:10,
          roomIdStr:'',
          changedState:'',
          orderUser:'',
          changedOrderId:'',
          showFlag:'全部',
          unchangedOrderArr:[],
          changedOrderArr:[],
          finishedOrderArr:[],
          orderTmp:[],
          freeRoom:[],
        }
      },
      methods:{
        async allOrder(){
          const result = await getAllOrder();
          //console.log(result);
          this.orders = result.message;
          this.dataCount = this.orders.length;
          this.unchangedOrderArr = [];
          this.changedOrderArr = [];
          this.finishedOrderArr = [];
          this.orderTmp = this.orders;
          for (let i = 0;i<this.orders.length;i++){
            if (this.orders[i].order_state == '未处理'){
              this.unchangedOrderArr.push(this.orders[i]);
            } else if (this.orders[i].order_state == '已处理') {
              this.changedOrderArr.push(this.orders[i]);
            }else if (this.orders[i].order_state == '已付款'){
              this.finishedOrderArr.push(this.orders[i]);
            }
          }
          if (this.orders.length < this.pageSize) {
            this.ordersData = this.orderTmp
          }else {
            this.ordersData = this.orderTmp.slice(0,this.pageSize)
          }
        },
        changepage(index){
          var _start = ( index - 1 ) * this.pageSize;
          var _end = index * this.pageSize;
          this.ordersData = this.orderTmp.slice(_start,_end);
        },
        async showManage(flag,orderid,userid,orderType,orderNumber){
          let userId = userid;
          this.changedOrderId = orderid;

          const freeRoomResult = await getfreeRoom(orderType);
          console.log(freeRoomResult);
          this.freeRoom = [];
          if (freeRoomResult.success_code == 200){
            for (let i=0;i<freeRoomResult.message.length;i++){
              this.freeRoom.push(freeRoomResult.message[i].room_id)
            }
          }else {
            alert("数据库请求失败")
          }
          const result =await getOrderUser(userId);
          //console.log(result);
          if (result.success_code == 200){
            this.orderUser = result.message;
            this.isManage = flag;
          }else {
            console.log("查询数据库失败")
          }
        },
        showUpdata(flag){
          this.isManage = flag;
        },
        async updataOrder(){

          //console.log(this.changedOrderId);
          //console.log(this.changedState);
          //console.log(this.roomIdStr);
          let roomResult = await updataRoomState(this.roomIdStr,this.changedOrderId);
          if (roomResult.err_code == 102){
            Toast({
              message: roomResult.message,
              position: 'center',
              duration: 3000
            });
            return
          }
          let orderResult = await upOrderState(this.changedOrderId,this.changedState,this.roomIdStr);
          console.log(orderResult);
          if (orderResult.success_code == 200){
            Toast({
              message: orderResult.message,
              position: 'center',
              duration: 3000
            });
            this.isManage = false;
            this.allOrder();
          }
        },
        changeShow(){
          if (this.showFlag == '全部'){
            this.orderTmp = this.orders;
            this.dataCount = this.orderTmp.length;
            if (this.orders.length < this.pageSize) {
              this.ordersData = this.orderTmp
            }else {
              this.ordersData = this.orderTmp.slice(0,this.pageSize)
            }
          } else if (this.showFlag == '未处理'){
            this.orderTmp = this.unchangedOrderArr;
            this.dataCount = this.unchangedOrderArr.length;

          } else if (this.showFlag == '已处理'){
            this.orderTmp = this.changedOrderArr;
            this.dataCount = this.changedOrderArr.length;
          } else if (this.showFlag == '已付款'){
            this.orderTmp = this.finishedOrderArr;
            this.dataCount = this.finishedOrderArr.length;
            //this.ordersData = this.finishedOrderArr;
          }

          if (this.dataCount < this.pageSize) {
            this.ordersData = this.orderTmp
          }else {
            this.ordersData = this.orderTmp.slice(0,this.pageSize);
            console.log(this.ordersData);
          }

        },
        toStatic(){
          this.$router.push('/marketStatistics');
        }
      },

      created(){
          this.allOrder();
      },
      computed:{
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.pathbtn{
  display inline-block
  position absolute
  right 20px
  top 50px
  font-size 20px
  width 100px
  line-height 30px
  height 30px
  color black
  cursor pointer
}
  .add-content
    position absolute
    z-index 999
    width 60%
    height 400px
    margin-left 20%
    border black solid 1px
    background-color: sandybrown
    border-radius 30px
    .add-body
      width 100%
      height 80%
      //background-color: skyblue
      form
        width 60%
        height 100%
        margin-left 20%
        //background-color: silver
        h2
          padding-top 5%
        ul
          list-style none
          float left
          li
            margin-left 50%
            font-size 16px
            text-align left
            input
              width 200px
              height 30px
              padding-left 8px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
        .add-staff-name
          padding-top 10%
    .add-footer
      width 100%
      height 20%
      //background-color: pink
      button
        margin-top 0
        width 200px
        height 50px
        line-height 50px
        font-size 30px
        background mediumpurple
        color #fff

  #showflag{
    position absolute
    top 50px
    left 0
    font-size 20px
    width 100px
    line-height 30px
    height 30px
  }
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
