<template>
    <div class="register_index">
      <span class="register_title">用户注册</span>
      <form class="register_content">
        <section class="username">
          <!--<span>用户姓名:</span>-->
          <input type="text" maxlength="11" placeholder="请输入您的手机号" v-model="userPhone"/>
        </section>

        <section class="phone">
          <!--<span>电话号码:</span>-->
          <input type="text" maxlength="18" placeholder="请输入您的姓名" v-model="userName"/>
        </section>
        <section class="age">
          <!--<span>年龄:</span>-->
          <input type="text" maxlength="18" placeholder="请输入年龄" v-model="userAge"/>
        </section>
        <section class="passworld">
          <!--<span>密码:</span>-->
          <input type="password" maxlength="18" placeholder="请输入密码" v-model="userPsw" v-if="pwdMode"/>
          <input type="text" maxlength="18" placeholder="请输入密码" v-model="userPsw" v-else/>

          <div class="switch-show">
            <img @click.prevent="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" alt=""
                 width="20">
            <img @click.prevent="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt=""
                 width="20">
          </div>
        </section>

        <section class="passworldA">
          <!--<span>密码:</span>-->
          <input type="password" maxlength="18" placeholder="再一次请输入密码验证" v-model="userPswD" v-if="pwdMode"/>
          <input type="text" maxlength="18" placeholder="再一次请输入密码验证" v-model="userPswD" v-else/>
          <span class="pwd_test" v-if="!pwdRight">两次密码输入不一致</span>
        </section>
        <section class="sex">
          <label for="man">男</label>
          <input type="radio" id="man" value="男" class="man" v-model="userSex"/>
          <label for="woman">女</label>
          <input type="radio" value="女" id="woman" class="woman" v-model="userSex"/>
        </section>
        <button class="register-submit" @click.prevent="rgeister()">注册</button>
    </form>
    </div>
</template>

<script>
  import {Toast} from 'mint-ui'
  import {postRgeister} from './../../api/index'
    export default {
        name: "Rgeister",
      data(){
          return{
            userName:'',
            userPsw:'',
            pwdMode:true,
            userPhone:'',
            userAge:'',
            userPswD:'',
            userSex:''
          }
      },
      methods:{
        dealPwdMode(flag) {
          this.pwdMode = flag;
        },
        //注册
        async rgeister(){
          if (!this.userPhone) {
            Toast("请输入手机号");
            return;
          }else if (!this.phoneRight) {
            Toast("请输入正确的手机号");
            return;
          }
          if (!this.userPsw) {
            Toast("请输入密码");
            return;
          }else if (!this.pwdRight) {
            Toast("请确定两次输入相同的密码");
            return;
          }
          //发送注册请求
          const result = await postRgeister(this.userPhone,this.userName,this.userAge,this.userPsw,this.userSex);
          console.log(result);
          if (result.success_code === 200){
            Toast("注册成功，请登录");
            this.$router.push('/login');
          }
        }
      },
      computed:{
          pwdRight(){
            if (this.userPsw !== ''){
              return this.userPsw===this.userPswD
            } else {
              return false
            }
          },
        phoneRight() {
          return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhone)
        }
      }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.register_index
  height 88%
  width 50%
  border red solid 1px
  border-radius 20px
  margin 3% 25%
  background-color: white
  .register_title
    display inline-block
    margin-left 0
    margin-top 20px
    font-size 30px
    font-weight bold
  .register_content
    margin-top 10%
    list-style none
    input
      width 100%
      height 100%
      padding-left 8px
      box-sizing border-box
      border 1px solid #ddd
      border-radius 4px
      outline 0
      font 400 14px Arial
      &:focus
        border 1px solid mediumpurple
    .username
        position relative
        margin-top 16px
        margin-left 20%
        width 60%
        height 48px
        font-size 14px
        background #fff
    section
        position relative
        margin-top 16px
        margin-left 20%
        height 48px
        width 60%
        font-size 14px
        background #fff;
    .sex
        height 20px
        .man
          width 50px
          height 20px
        .woman
          width:50px
          height 20px
    .switch-show
        position absolute
        right 10px
        top 12px
        img
          display none
        img.on
          display block
    .passworldA
        .pwd_test
          color red
          margin-left -60%
    .register-submit
        display block
        width 60%
        height 42px
        margin-top 30px
        margin-left 20%
        border-radius 4px
        background mediumpurple
        color #fff
        text-align center
        font-size 16px
        line-height 42px
        border 0

</style>
