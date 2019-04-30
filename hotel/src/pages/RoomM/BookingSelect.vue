<template>
    <div class="booking-select container">
      <h5>如果您订购的客房超过五间，请与酒店销售部联系，我们将竭诚为您服务</h5>
      <div class="select-body row">
        <section class="col-md-2 type">
          <strong>
            <a href="javascript:void(0)">{{this.bookingRoom.type}}</a>
          </strong>
        </section>
        <section class="col-md-2 select-img">
          <img :src=this.bookingRoom.img width="150px">
        </section>
        <section class="select-price col-md-2">
          价格：￥{{this.bookingRoom.price}}
        </section>
        <section class="select-number col-md-2">
          预订数量<select id="number" v-model="bookingNumber" default-first-option="1">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        </section>
        <section class="select-total col-md-3">
          总价：￥{{this.bookingRoom.price*bookingNumber*this.bookingRoom.days}}.00
        </section>
        <button class="col-md-1 btn" @click="secondStep()">预订</button>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "BookingSelect",
      data(){
          return{
            bookingNumber:1
          }
      },
      computed:{
        ...mapState(['bookingRoom'])
      },
      methods:{
        secondStep(){
          let li = document.getElementsByClassName('li-icon');
          li[1].className='active';

          let total = this.bookingNumber * this.bookingRoom.price * this.bookingRoom.days;
          const obj={number:this.bookingNumber,totalPrice:total};
          this.$store.dispatch('postBookingNumber',obj);
          /*if (date !== ''){
            this.$store.dispatch('postBookingDate',date);
          }*/
          this.$router.replace('/booking/detail');
        }
      },
      beforeRouteEnter:(to,from,next)=>{
        //console.log(to,from);
        if (from.path == '/booking'){
          next();
        }else {
          next('/room')
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .booking-select
    width 100%
    height 180px
    margin-top 80px
    background-color:  #faf8f7
    padding-top 1px
    h5
      text-align: center;
      color: #dc8d16;
      font-size 18px
      margin-top -30px
    .select-body
      margin-top 20px
      height 100%
      text-align center
      a
        font-size 18px
        line-height 150px
        color: #494949;
      section
        height 60%
      .select-img
        margin-top 40px
      .select-price
        line-height 150px
        font-size 18px
      .select-number
        line-height 150px
        font-size 18px
      .select-total
        margin-left 0
        line-height 150px
        font-size 18px
      .btn
        margin-top: 50px;
        height: 39px;
        font-size: 14px;
        margin-left: 0;
        background: padding-box rgb(127, 83, 29);
        color white

</style>
