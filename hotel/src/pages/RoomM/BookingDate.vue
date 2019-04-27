<template>
    <div class="booking-date">
      选择时间：
      <el-date-picker
        v-model="startDate"
        type="date"
        placeholder="开始日期"
        :picker-options="pickerOptions0"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-date-picker
        v-model="endDate"
        type="date"
        placeholder="结束日期"
        :picker-options="pickerOptions1"
        value-format="yyyy-MM-dd" >
      </el-date-picker>
      <button class="btn" @click="firstStep()">预订</button>
    </div>
</template>

<script>
    import {DatePicker}from 'element-ui'
    export default {
        name: "BookingDate",
      data(){
          return{
            startDate:'',
            endDate:'',
            pickerOptions0: {
              disabledDate: (time) => {
                if (this.endDate !== "") {
                  return time.getTime() <= Date.now() || time.getTime() < this.endDate;
                } else {
                  return time.getTime() <= Date.now();
                }
              }
            },
            pickerOptions1: {
              disabledDate: (time) => {
                return time.getTime() < this.startDate || time.getTime() < Date.now();
              }
            },
          }
      },
      methods:{
          firstStep(){
            let li = document.getElementsByClassName('li-icon');
            li[1].className='active';
            let end  = this.$moment(this.endDate);
            let days = end.diff(this.startDate,'days');
            const date = [this.startDate.toString(),this.endDate.toString(),days];
            //console.log(num);
            if (date !== ''){
              this.$store.dispatch('postBookingDate',date);
            }
            console.log(date);
            this.$router.replace('/booking/select');
          }
      },
      beforeRouteEnter:(to,from,next)=>{
      //console.log(to,from);
      if (from.path == '/room'){
        next();
      }else {
        next('/room')
      }
    }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.booking-date
  font-size 20px
  width 100%
  margin-top 100px
  .btn
    float: right;
    height: 32px;
    font-size: 16px;
    line-height: 16px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    overflow: hidden;
    margin: 0px 0px 0px 14px;
    padding: 0px 19px;
    background: padding-box rgb(127, 83, 29);
    outline: 0px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    text-decoration: none;
    border-radius: 4px;
</style>
