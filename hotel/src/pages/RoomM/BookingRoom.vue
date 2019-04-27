<template>
    <div class="booking">
      <div class="booking-body">
        <div class="booking-header">
          <h1>房间预订</h1>
        </div>
        <div class="booking-content">
          <ul class="nav">
            <li class="active li-icon">
              <i class="fa fa-tags fa-2x"></i>
              <span>预订信息</span>
            </li>
            <li class="li-icon">
              <i class="fa fa-home fa-2x"></i>
              <span>选择房间</span>
            </li>
            <li class="li-icon">
              <i class="fa fa-edit fa-2x"></i>
              <span>订单及宾客信息</span>
            </li>
            <li class="li-icon">
              <i class="fa fa-leaf fa-2x"></i>
              <span>完成</span>
            </li>
          </ul>
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
  import {DatePicker} from 'element-ui';
    export default {
        name: "BookingRoom",
      data(){
          return{
            bookingdate:''
          }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.booking
  width 100%
  height 100%
  background-color: #fff
  padding-top 1px
  position relative
  .booking-body
    width 80%
    height 80%
    margin-left 10%
    margin-top  50px
    //background-color: skyblue;
    position relative
    .booking-header
      width 100%
      height 30px
      border-bottom: #b7b7b7 1px dotted;
      h1
        position absolute
        left 0
    .booking-content
      width 100%
      ul
        margin-top 20px
        list-style none
        margin-left 150px
        li
          float left
          width 20%
          i
            width: 90px;
            height: 90px;
            text-align: center;
            line-height: 90px;
            border-radius: 45px;
            background: #e5dcd2;
            color: #fff;
            font-size: 45px;
          span
            display: block;
            padding-top: 8px;
            font-size: 20px;
            color: rgb(48, 48, 48);
            font-family "微软雅黑"
        li.active>i
          background-color: #dc8d16;
        li + li::before {
          position: absolute;
          left: 0px;
          top: 30px;
          margin-left: -5px;
          content: ">";
          display: inline-block;
          color: rgb(229, 220, 210);
          font-size: 20px;
        }
</style>
