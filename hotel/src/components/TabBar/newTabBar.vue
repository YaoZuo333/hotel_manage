<template>
    <div class="newTabBar">
      <span class="tabBar-title">酒店管理系统</span>

      <div class="right-tab">
        <div v-if="userInfo.id">
          <span>欢迎您：{{userInfo.user_name}}</span>
          <el-button size="mini" round @click="showOut()">退出</el-button>
        </div>
        <div class="no_login" v-else>
          <span class="register" @click="tabbarSelect('/register')">注册</span>
          <span class="login" @click="tabbarSelect('/login')">登录</span>
        </div>
      </div>
    </div>
</template>

<script>
  import {mapState,mapActions} from 'vuex'
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
        ...mapActions(["logOut"]),
        tabbarSelect(path){
          this.$router.push(path)
        },
        showOut(){
          this.$confirm('确定要退出登录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let result = this.logOut({});
            let storage=window.sessionStorage;
            storage.removeItem('userInfo');
            this.$message({
              type: 'success',
              message: '退出成功!'
            });
            // console.log(result);
            // 回到主界面
            this.$router.push('/home');
          });
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
    font-size 50px
    position absolute
    left -400px
    width 60vw
    font-weight bold
    margin auto 0
    padding-left 50px
  .right-tab
    margin-left 70%
    border white
    position absolute
    right 30px
    font-size 35px
    line-height 50px
    div
      span
        border-radius:2px
        vertical-align middle
      button
        font-size 25px
    .register:hover
      background-color: #00E3E3
      cursor:pointer
    .login
      margin-left 2vw
    .login:hover
      background-color: #00E3E3
      cursor:pointer
</style>
