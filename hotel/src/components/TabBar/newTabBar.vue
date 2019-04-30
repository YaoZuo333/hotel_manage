<template>
    <div class="newTabBar">
      <span class="tabBar-title">酒店管理系统</span>

      <div class="right-tab">
        <span v-if="userInfo.id">欢迎您：{{userInfo.user_name}}</span>
        <div class="no_login" v-else>
          <span class="register" @click="tabbarSelect('/register')">注册</span>
          <span class="login" @click="tabbarSelect('/login')">登录</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "newTabBar",
      data(){
        return{
          login_show:true
        }
      },
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
.newTabBar
  background-color: #272727
  position absolute
  width 100%
  height 7%
  color silver
  display flex
  justify-content row
  text-align center
  .tabBar-title
    //font-size 26px
    font-size 2vw
    font-weight bold
    margin auto 0
    padding-left 50px
  .right-tab
    margin-left 70%
    border white
    font-size 20px
    line-height 40px
    span
      border-radius:2px
      vertical-align middle
    .register:hover
      background-color: #00E3E3
      cursor:pointer
    .login
      margin-left 2vw
    .login:hover
      background-color: #00E3E3
      cursor:pointer
</style>
