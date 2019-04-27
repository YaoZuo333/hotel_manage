<template>
    <div class="marketingstatistics">
      <h2>销售统计</h2>
      <el-menu :default-active="activeIndex" class="el-menu-demo statistic-tab" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1" @click="getYearData()">年度统计</el-menu-item>
        <el-submenu index="2">
          <template slot="title">月度统计</template>
          <el-menu-item :index="year" v-for="(year,index) in yearLis" @click="getmonthData(year)" :key="index">{{year}}</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">按天统计</template>
          <el-menu-item :index="month" v-for="(month,index) in monthLis" @click="getDayData(month)" :key="index">{{month}}</el-menu-item>
          <!--<el-menu-item index="3-1">二月</el-menu-item>
          <el-menu-item index="3-1">三月</el-menu-item>
          <el-menu-item index="3-1">四月</el-menu-item>
          <el-menu-item index="3-1">五月</el-menu-item>
          <el-menu-item index="3-1">六月</el-menu-item>
          <el-menu-item index="3-1">七月</el-menu-item>
          <el-menu-item index="3-1">八月</el-menu-item>
          <el-menu-item index="3-1">九月</el-menu-item>
          <el-menu-item index="3-1">十月</el-menu-item>
          <el-menu-item index="3-1">十一月</el-menu-item>
          <el-menu-item index="3-1">十二月</el-menu-item>-->
        </el-submenu>
      </el-menu>

      <div class="statistic-body" id="myChart">

      </div>
    </div>
</template>

<script>

  import {yearTotalPrice,monthTotalPrice,dayTotalPrice} from './../../api/index'
  // 加载echarts，注意引入文件的路径
  import echarts from 'echarts/lib/echarts'

  // 再引入你需要使用的图表类型，标题，提示信息等

  import 'echarts/lib/chart/line'
  import 'echarts/lib/chart/bar'
  import 'echarts/lib/component/tooltip'
  import 'echarts/lib/component/legend'
  import 'echarts/lib/component/title'
  import index from "../../store";
    export default {
        name: "MarketStatistics",
        data(){
          return{
            activeIndex: '1',
            yearTotalData:[],
            yearLis:[],
            showX:[],
            showdata:[],
            monthTotalData:[],
            monthLis:[],
            daysTotalData:[]
          }
        },
      methods:{
        handleSelect(key, keyPath) {
          console.log(key, keyPath);
        },
          async getYearData(){
            const result = await yearTotalPrice();
            if (result.success_code == 200){
              this.showX = [];
              this.showdata = [];
              this.yearLis = [];
              this.yearTotalData = result.message;
              for (let i=0;i<this.yearTotalData.length;i++){
                this.showX.push(this.yearTotalData[i].days);
                this.yearLis.push(this.yearTotalData[i].days);
                this.showdata.push(this.yearTotalData[i].order_total);
              }
              //console.log(this.showdata);
              this.drawYearCharts(this.showX,this.showdata)
            }
          },
        /*获取月度数据*/
        async getmonthData(year){
            const result = await monthTotalPrice(year);
          //console.log(result);
          if (result.success_code == 200){
            this.monthTotalData = result.message;
            this.showX = [];
            this.showdata = [];
            this.monthLis = [];
            for (let i=0;i<this.monthTotalData.length;i++){
              this.showX.push(this.monthTotalData[i].days);
              this.monthLis.push(this.monthTotalData[i].days);
              this.showdata.push(this.monthTotalData[i].order_total);
          }
            this.drawYearCharts(this.showX,this.showdata);
        }
        },
        /*获取日数据*/
        async getDayData(month){
          const result = await dayTotalPrice(month);
          console.log(result);
          if (result.success_code == 200){
            this.daysTotalData = result.message;
            this.showX = [];
            this.showdata = [];
            for (let i=0;i<this.daysTotalData.length;i++){
              this.showX.push(this.daysTotalData[i].days);
              //this.monthLis.push(this.daysTotalData[i].days);
              this.showdata.push(this.daysTotalData[i].order_total);
            }
            this.drawYearCharts(this.showX,this.showdata);
          }
        },
        drawYearCharts(showX,showdata){
          let myChart = echarts.init(document.getElementById('myChart'));

          let option = {
            title: { text: '销售统计' },
            tooltip: {
              /*返回需要的信息*/

              formatter: function(params) {
                //console.log(params.value);
                return "销售额："+params.value
              }

            },
            xAxis: {
              data: showX
              //data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'line',
              data: showdata
            }]
          };
          myChart.setOption(option)
        }
      },
      beforeCreate(){

      },
      created(){
        this.getYearData();
      },
      mounted(){
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.statistic-tab{
  background-color: #545c64
  margin-top 30px;
  text-color:"#fff";
  active-text-color "#ffd04b"
}
.statistic-body{
  width 1150px
  height 440px
  background-color: sandybrown
  position absolute
  left 0
  top:150px
}
</style>
