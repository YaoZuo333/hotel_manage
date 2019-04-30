<template>
    <div class="top_tabbar">

          <ul class="tabbar_menu">
            <li class="tabbar_home" @click="tabbarSelect('/home')">
              <span>首页</span>
            </li>
            <li class="tabbar_introduction" @click="tabbarSelect('/introduction')">
              <span>酒店介绍</span>
            </li>
            <li class="tabbar_room" @click="tabbarSelect('/room')">
              <span>房间预订</span>
            </li>
            <li class="tabbar_staff" @click="tabbarSelect('/staff')">
              <span>人力资源</span>
            </li>
            <li class="tabbar_member" @click="tabbarSelect('/member')">
              <span>会员中心</span>
            </li>
            <li class="tabbar_marketstatistics" @click="tabbarSelect('/marketStatistics')">
              <span>营销统计</span>
            </li>
          </ul>
      <div class="user_welcome" v-if="userInfo.id">
        <span>欢迎您</span>
      </div>
      <div class="right-tab">
        <span class="register" @click="tabbarSelect('/register')">注册</span>
        <span class="login" @click="tabbarSelect('/login')">登录</span>
      </div>

    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "TopTabBar",
      computed:{
        ...mapState(['userInfo'])
      },
      methods:{
        tabbarSelect(path){
          this.$router.push(path)
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
  .top_tabbar
    position fixed
    top 0
    z-index 999
    width 100%
    height 20px
    margin 0 auto
    background-image:url('../../../static/img/topnav_bg.png');
    background-repeat:repeat-x
    display flex
    flex-direction row
    .tabbar_menu
      list-style none
      display flex
      flex-direction row
      flex-grow 8
      .tabbar_home
        margin-left 230px
      li
        margin 0 10px
        float left
        flex-grow 1
        cursor:pointer
      .tabbar_marketstatistics
        margin-right 230px
      li:hover
        background-color: skyblue
    .right-tab
      flex-grow 2

      .register:hover
        background-color: orange
        cursor:pointer
      .login
        margin-left 20px
      .login:hover
        background-color: orange
        cursor:pointer
    .user_welcome
      flex-grow 2
      color red
</style>
