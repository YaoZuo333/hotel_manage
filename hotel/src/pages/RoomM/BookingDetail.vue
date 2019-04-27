<template>
    <div class="booking-detail">
      <h5>订房信息</h5>
      <div class="detail-body row">
        <div class="detail-date">
          <section class="col-md-6">到店日期：{{this.bookingRoom.start}}</section>
          <section class="col-md-6">离店日期：{{this.bookingRoom.end}}</section>
        </div>
        <section class="col-md-12">预定保留到当天18:00，如需保留更长时间，请致电酒店客服。</section>
        <div class="detail-type">
          <section class="col-md-6">房型：{{this.bookingRoom.type}}</section>
          <section class="col-md-6">间数：{{this.bookingRoom.number}}</section>
        </div>
        <div class="detail-price">
          <section class="col-md-6">房价￥：{{this.bookingRoom.price}}</section>
          <section class="col-md-6">总价￥：{{this.bookingRoom.totalPrice}}</section>
        </div>
        <section class="col-md-12">其他需求：</section>
        <section class="col-md-12">
          <textarea rows="5" style="width: 100%" placeholder="需求" v-model="others"></textarea>
        </section>
      </div>
      <h5>住店客人信息</h5>
      <div class="consumer-msg row">
        <section class="col-md-6">
          <el-input
            placeholder="姓名"
            prefix-icon="el-icon-service"
            v-model="this.userInfo.user_name">
          </el-input>
        </section>
        <section class="col-md-6">
          <el-input
            placeholder="电话号码"
            prefix-icon="el-icon-mobile-phone"
            v-model="this.userInfo.user_phone">
          </el-input>
        </section>
        <el-button type="primary btn" @click="addOrder()">提交</el-button>
      </div>
      <div class="detail_footer">

      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {postOrder} from "../../api";
    export default {
        name: "BookingDetail",
      data(){
          return{
            others:''
          }
      },
      computed:{
          ...mapState(['bookingRoom','userInfo'])
      },
      methods:{
          async addOrder(){
            const result = await postOrder(this.bookingRoom.type,this.bookingRoom.start,this.bookingRoom.end,this.userInfo.id,this.bookingRoom.price,this.bookingRoom.number,this.bookingRoom.totalPrice,this.others);
            console.log(result);
            if (result.success_code == 200){
              let li = document.getElementsByClassName('li-icon');
              li[1].className='active';
              this.$router.replace('/booking/success');
            }else {
              alert('预订失败，请重试')
            }
          }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .booking-detail
    position relative
    h5
      margin-top 20px
      font-size 20px
    .detail-body
      width 100%
      //height 540px
      margin-top 10px
      background: rgba(184,167,143,0.7);
      font-size 18px
      text-align left
      .detail-date
        margin-top 20px
      .detail-type
        margin-top 100px
      .detail-price
        margin-top 150px
    .consumer-msg
      width 100%
      height 200px
      margin-top 10px
      background: rgba(184,167,143,0.7);
      font-size 18px
      position relative
      section
        margin-top 30px
      .btn
        background: #7f531d;
        margin-top 100px
        position absolute
        top:20px
        right 50px
    .detail_footer
      width 100%
      height 150px
</style>
