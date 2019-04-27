<template>
    <div class="manage-room">
      <h2>房间管理</h2>
      <div class="">

        <!--订单处理面板-->
        <!--<div class="add-content" v-if="isManage">
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
        </div>-->

        <div id="examine_manage">
          <select id="showflag" v-model="showFlag" default-first-option="全部" v-on:change="changeShow()">
            <option value="全部">全部</option>
            <option value="空闲">空闲</option>
            <option value="已预订">已预订</option>
            <option value="已入住">已入住</option>、
          </select>
          <table id="houseDetails">
            <tr>
              <td class="choose">房间号</td>
              <td class="title">房间类型</td>
              <td class="rentType">房间单价</td>
              <td class="houseArea">房间状态</td>
              <td class="location">对应订单号</td>
              <!--<td class="houseTheme">操作</td>
              <td class="price">房间总价</td>-->
              <td class="more">操作</td>
            </tr>
            <tr v-for="(room,index) in this.roomsData" class="gery_bg">
              <td class="choose">{{room.room_id}}</td>
              <td class="title" :title="room.room_type">{{room.room_type}}</td>
              <td class="rentType" :title="room.room_price">
                {{room.room_price}}
              </td>
              <td class="houseArea" :title="room.room_state">
                <select v-model="room.room_state" default-first-option="全部">
                  <option value="空闲">空闲</option>
                  <option value="已预订">已预订</option>
                  <option value="已入住">已入住</option>
                </select>
              </td>
              <td class="location" :title="room.room_orderId">{{room.room_orderId}}</td>
              <!--<td class="houseTheme" :title="order.order_price">{{order.order_price}}</td>
              <td class="price" :title="order.order_total">{{order.order_total}}</td>-->
              <td class="more"><span @click="updataRoom(room.room_id,room.room_state)">修改</span></td>
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
  import {getAllRoom,changRoomState} from './../../api/index'
  import {Toast} from 'mint-ui'
    export default {
        name: "ManageRoom",
      data(){
          return{
            rooms:[],
            roomsData:[],
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            roomIdStr:'',
            changedState:'',
            changedRoomId:'',
            showFlag:'全部',
            freeRoomArr:[],
            bookedRoomArr:[],
            livedRoomArr:[],
            roomTmp:[]
          }
      },
      methods:{
          async allRoom(){
            let result = await getAllRoom();
            if (result.success_code == 200){
              this.rooms = result.message;
              this.dataCount = this.rooms.length;
              this.bookedRoomArr = [];
              this.freeRoomArr = [];
              this.livedRoomArr = [];
              this.roomTmp = this.rooms;
              for (let i = 0;i<this.rooms.length;i++){
                if (this.rooms[i].room_state == '空闲'){
                  this.freeRoomArr.push(this.rooms[i]);
                } else if (this.rooms[i].room_state == '已预订') {
                  this.bookedRoomArr.push(this.rooms[i]);
                }else if (this.rooms[i].room_state == '已入住'){
                  this.livedRoomArr.push(this.orders[i]);
                }
              }
              if (this.dataCount < this.pageSize) {
                this.roomsData = this.roomTmp
              }else {
                this.roomsData = this.roomTmp.slice(0,this.pageSize)
              }
            } else {
              Toast({
                message: orderResult.message,
                position: 'center',
                duration: 3000
              });
            }
          },
        changepage(index){
          var _start = ( index - 1 ) * this.pageSize;
          var _end = index * this.pageSize;
          this.roomsData = this.roomTmp.slice(_start,_end);
        },
        changeShow(){
          if (this.showFlag == '全部'){
            this.roomTmp = this.rooms;
            this.dataCount = this.roomTmp.length;
            if (this.dataCount < this.pageSize) {
              this.roomsData = this.roomTmp
            }else {
              this.roomsData = this.roomTmp.slice(0,this.pageSize)
            }
          } else if (this.showFlag == '空闲'){
            this.roomTmp = this.freeRoomArr;
            this.dataCount = this.freeRoomArr.length;

          } else if (this.showFlag == '已预订'){
            this.roomTmp = this.bookedRoomArr;
            this.dataCount = this.bookedRoomArr.length;
          } else if (this.showFlag == '已入住'){
            this.roomTmp = this.livedRoomArr;
            this.dataCount = this.livedRoomArr.length;
            //this.ordersData = this.finishedOrderArr;
          }

          if (this.dataCount < this.pageSize) {
            this.roomsData = this.roomTmp
          }else {
            this.roomsData = this.roomTmp.slice(0,this.pageSize);
          }
          console.log(this.roomsData);
        },
        async updataRoom(roomid,roomstate){
            const result = await changRoomState(roomid,roomstate);
            if (result.success_code !== 200){
              alert("修改房间状态失败，请重试")
            }
        }
      },
      created(){
          this.allRoom();
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
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
