<template>
    <!--<div class="home">
      <div class="home_content">
        <div class="home_img">
          <img src="../../../static/img/home_1.jpg" width="90%" id="home_1">
          <img src="../../../static/img/home_2.jpg" width="90%" id="home_2">
          <img src="../../../static/img/home_3.jpg" width="90%" id="home_3">
          <img src="../../../static/img/home_4.jpg" width="90%" id="home_4">
          <img src="../../../static/img/home_5.jpg" width="90%" id="home_5" @load="getImgHight">
        </div>
      </div>
    </div>-->
  <div class="home">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" >
          <img src="../../../static/img/home_1.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_2.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_3.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_4.jpg" alt="">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_5.jpg" alt="" width="1200px" height="600px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import Swiper from 'swiper'
    import 'swiper/dist/css/swiper.min.css'
    export default {
        name: "Home",
      data(){
          return{
            home_imgHighet:[],
            scrollFlag:0
          }
      },
      /*methods:{

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
      }*/
      mounted(){
        //this.$nextTick(this.getImgHight());
        //window.addEventListener('mousewheel',this.handleScroll)
        new Swiper ('.swiper-container', {
          loop: true, // 循环模式选项
          autoplay:true
          // 如果需要分页器
          /*pagination: {
            el: '.swiper-pagination',
          },*/


        })
      }
    }
</script>


<style scoped lang="stylus" ref="stylesheet/stylus">
  .home
    height 100%
  .swiper-slide img{
    height 800px
    width 100%
  }

  /*.home_content
    position relative

    .home_img

      position absolute
      height auto
      top 0
      overflow hidden
      transition-property top
      transition-duration 2s
      img
        vertical-align:top*/



</style>
