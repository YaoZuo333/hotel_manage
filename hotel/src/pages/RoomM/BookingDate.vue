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
      <el-input placeholder="请输入人数" maxlength="5" style="width: 300px;margin-left: 50px" v-model="peoples"></el-input>
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
            peoples:'',
            pickerOptions0: {
              disabledDate: (time) => {
                if (this.endDate !== "") {
                  return time.getTime() <= Date.now() || time.getTime() > this.endDate;
                } else {
                  return time.getTime() <= Date.now();
                }
              }
            },
            pickerOptions1: {
              disabledDate: (time) => {
                return time.getTime() < Date.now() || time.getTime() < this.startDate;
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
            const date = [this.startDate.toString(),this.endDate.toString(),days,this.peoples];
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
  font-size 40px
  width 100%
  height 200px
  margin-top 100px
  .btn
    float: right;
    height: 32px;
    font-size: 16px;
    line-height: 16px;
    color: rgb(255, 255, 255);
    cursor: pointer;
    overflow: hidden;
    margin: 20px 0px 0px 14px;
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
