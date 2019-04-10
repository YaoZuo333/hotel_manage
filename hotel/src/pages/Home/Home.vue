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
        <div class="swiper-slide">
          <img src="../../../static/img/home_1.jpg" alt="" width="1200px" height="600px">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_2.jpg" alt="" width="1200px" height="600px">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_3.jpg" alt="" width="1200px" height="600px">
        </div>
        <div class="swiper-slide">
          <img src="../../../static/img/home_4.jpg" alt="" width="1200px" height="600px">
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
    height auto
    .YzCarousel {
      background-color: skyblue;
      //width: 1150px;
      // height: 600px;
      position: relative;
      .YzCarousel-item {
        display: none;
      }
      .carousel-burster {
        position: absolute;
        bottom: 10px;
        left: 50%;
        z-index: 15;
        width: 60%;
        padding-left: 0;
        margin-left: -30%;
        text-align: center;
        list-style: none;
      }
      .carousel-burster li {
        display: inline-block;
        width: 10px;
        height: 10px;
        margin: 1px;

        cursor: pointer;
        background-color: #000 \9;
        background-color: rgba(0, 0, 0, 0);
        border: 1px solid #fff;
        border-radius: 10px;

      }
      .carousel-burster .active {
        width: 12px;
        height: 12px;
        margin: 0;
        background-color: red;
      }
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
