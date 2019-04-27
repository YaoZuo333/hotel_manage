<template>
    <div class="leftTab">
      <ul class="leftTab-list">
        <li :class="{active:show == 0}" @click="tabbarSelect('/home',0)">
          首页
        </li>
        <li :class="{active:show == 1}" @click="tabbarSelect('/introduction',1)">
          酒店介绍
        </li>
        <li :class="{active:show == 2}" @click="tabbarSelect('/room',2)">
          客房服务
        </li>
        <li :class="{active:show == 3}" @click="tabbarSelect('/staff',3)" v-if="this.userInfo.user_position =='管理员'">
          人力资源
        </li>
        <li :class="{active:show == 4}" @click="tabbarSelect('/member',4)">
          个人信息
        </li>
        <li :class="{active:show == 6}" @click="tabbarSelect('/ordemanage',6)" v-if="this.userInfo.user_position =='管理员'">
          订单管理
        </li>
        <li :class="{active:show == 6}" v-else @click="tabbarSelect('/orderself',6)">
          我的订单
        </li>
        <li :class="{active:show == 5}" @click="tabbarSelect('/manageroom',5)" v-if="this.userInfo.user_position =='管理员'">
          房间管理
        </li>
      </ul>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "LeftTab",
      data(){
          return{
            show:-1
          }
      },
      computed:{
        ...mapState(['userInfo'])
      },
      methods:{
        tabbarSelect(path,index){
          this.$router.push(path);
          //this.show = false;
          /*for (let i=0;i<this.show.length;i++){
            this.show[i] = false;
          }
          this.show[index] = true;*/
          this.show = index;
          console.log(this.show)
        },
        /*tabbarClass(){
          //console.log(event.target);
          let liarr = document.getElementsByTagName('li');
          for (let i=0;i<liarr.length;i++){
            liarr[i].className = '';
          }
          event.target.className = "active";
        }*/
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.leftTab
  display flex inline-block
  z-index 999
  position absolute
  margin-right 0
  justify-content colum
  height 82vh
  width 15vw
  color gainsboro
  font-weight bold
  font-size 20px
  //border silver solid 1px
  margin-top 5%
  border-radius:5px
  background-color: #272727
  margin-left 50px
  .leftTab-list
    width 100%
    height 80%
    display inline-block
    li
      height 40px
      width 90%
      //border silver solid 1px
      margin-left 5%
      border-radius:5px
      margin-top 10px
      background-color: #3C3C3C
      text-align center
      vertical-align middle
      line-height 40px
      span
        line-height 40px
    li:hover
      background-color: #00CACA
      cursor pointer
    .active
      background-color: #00CACA

</style>
