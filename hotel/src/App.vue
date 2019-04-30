<template>
  <div id="app">
    <!--<TopTabBar></TopTabBar>-->
    <newTabBar></newTabBar>
    <left-tab></left-tab>
    <!--<router-view></router-view>-->
    <div class="app-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import TopTabBar from './components/TabBar/TopTabBar'
  import newTabBar from './components/TabBar/newTabBar'
  import LeftTab from './components/TabBar/LeftTab'
  import {mapActions} from 'vuex'
export default {
  name: 'App',
  components:{
    TopTabBar,
    newTabBar,
    LeftTab
  },
  methods:{

    ...mapActions(['syncUserInfo']),
    userStorage(){
      let storage=window.sessionStorage;
      let userInfo = JSON.parse(storage.userInfo);
      if (userInfo.id) {
        console.log("用户已经登录");
        //  同步用户数据
        this.syncUserInfo(userInfo);
      }else {
        console.log("用户没有登录")
      }
    }
  },
  created(){
    this.userStorage();
  }
}
</script>

<style>
  body{
    /*background-color: #d2c8c8;*/
    background: rgba(184,167,143,.7);
  }

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;

}
  .app-content{
    width: 75vw;
    height: 83vh;
    /*border: red solid 1px;*/
    margin-left: 20vw;
    margin-top: 20px;
    position: absolute;
    top: 8vh;
  }

</style>
