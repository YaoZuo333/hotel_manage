<template>
    <div class="room">
      <div class="room-header">
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 0}" @click="tabbarSelect('/room/',0)">标准大床房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 1}" @click="tabbarSelect('/introduction',1)">豪华大床房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 2}" @click="tabbarSelect('/introduction',2)">标准双床房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 3}" @click="tabbarSelect('/introduction',3)">豪华双床房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 4}" @click="tabbarSelect('/introduction',4)">行政套房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 5}" @click="tabbarSelect('/introduction',5)">豪华套房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 6}" @click="tabbarSelect('/introduction',6)">总统套房</span>
        </div>
        <div class="room-item">
          <span class="room-inneritem" :class="{active:show == 7}" @click="tabbarSelect('/introduction',7)">普通大床房</span>
        </div>
      </div>
      <div class="room-body">
        <img :src="imgLis[show]">
      </div>

      <div class="room-footer">
        <div class="room-description">
          <span>{{descriptionLis[show]}}</span>
        </div>
        <div class="room-price">
            <span>价格：￥{{priceLis[show]}}</span>
            <button @click="booking()">我要预订</button>
        </div>

      </div>
    </div>
</template>

<script>
    export default {
        name: "RoomM",
      data(){
          return{
            show:0,
            roomLis:["标准大床房",
              "豪华大床房",
              "标准双床房",
              "豪华双床房",
              "行政套房",
              "豪华套房",
              "总统套房",
              "普通大床房",
            ],
            imgLis:["../../../static/img/room/roomA1.png",
              "../../../static/img/room/roomA2.png",
              "../../../static/img/room/roomA3.png",
              "../../../static/img/room/roomA4.png",
              "../../../static/img/room/roomA5.png",
              "../../../static/img/room/roomA6.png",
              "../../../static/img/room/roomA7.png",
              "../../../static/img/room/roomA8.png",
            ],
            priceLis:[198,298,268,368,688,888,1688,168],
            descriptionLis:["1.8米大床、舒适的羽绒枕和羽绒被、免费WIFI高速上网、独立淋浴间\n" +
            "\n" +
            "不可携带宠物",
            "1.8米大床、舒适的羽丝棉枕和羽丝棉被、电子保险箱、免费WIFI高速上网、39英寸液晶电视、独立淋浴间\n" +
            "\n" +
            "不可携带宠物",
              "1.2米双床、舒适的羽绒枕和羽绒被、免费WIFI高速上网、独立淋浴间\n" +
              "\n" +
              "不可携带宠物",
              "1.2米床、舒适的羽绒枕和羽绒被、电子保险箱、39英寸的液晶电视、免费WIFI高速上网、独立淋浴间\n" +
              "\n" +
              "不可携带宠物",
              "1.8米大床、舒适的羽绒枕和羽绒被、免费WIFI高速上网、39英寸的液晶电视、高档沙发、茶几、办公桌、独立淋浴间\n" +
              "\n" +
              "不可携带宠物",
              "1.8米大床、舒适的羽丝棉枕和羽丝棉被、电子保险箱、免费WIFI高速上网、39英寸的液晶电视、独立淋浴间\n" +
              "\n" +
              "不可携带宠物",
              "复式楼，635平方，餐厅、红酒吧、会客厅、书房、KTV厅、桑拿房、高乐夫推杆等各项设施，舒适的羽绒枕和羽绒被、香薰炉、免费WIFI高速上网、高档沙发、茶几、办公桌、42英寸的液晶电视\n" +
              "\n" +
              "不可携带宠物",
              "1.8米大床、舒适的羽绒枕和羽绒被、免费WIFI高速上网、独立淋浴间\n" +
              "\n" +
              "不可携带宠物，此房型不含早餐。"

            ]
          }
      },
      methods:{
        tabbarSelect(path,index){
          //this.$router.push(path);
          //this.show = false;
          /*for (let i=0;i<this.show.length;i++){
            this.show[i] = false;
          }
          this.show[index] = true;*/
          this.show = index;
          //console.log(this.show)
        },
        booking(){
          const bookRoomObj = {roomType:this.roomLis[this.show],
            roomImg:this.imgLis[this.show],
            roomPrice:this.priceLis[this.show]
          };
          //console.log(bookRoomObj);
          this.$store.dispatch('initBooking',bookRoomObj);
          this.$router.push('/booking');
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.room
  width 100%
  height 100%
  .room-header
    width 100%
    height 20%
    background-color: #272727
    display flex
    flex-grow 1
    flex-wrap wrap
    border-radius 20px
    .room-item
      width 25%
      height 50%
      background-color: #272727
      color #949449
      line-height 50px
      .room-inneritem
        display inline-block
        width 50%
        height 80%
        margin-top 2.5%
        font-size 20px
        background-color: #3C3C3C
        border-radius 5px
      span:hover
        background-color: #336666;
        cursor pointer
      .active
        background-color: #336666!important;
  .room-body
    width 100%
    background-color: #fff
    img
      margin-top 20px
      height 580px
  .room-footer
    width 100%
    height 200px
    background-color: #fff
    .room-description
      width 100%
      height 30%
      font-size 20px
    .room-price
      width 100%
      height 30%
      padding-top 30px
      font-size 50px
      button
        color: rgb(255, 255, 255);
        background-color: rgb(219, 79, 17)
        cursor pointer
        border-radius 10px
        border none
        box-shadow none
</style>
