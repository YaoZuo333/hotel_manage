<template>
    <div class="login_index">
      <span class="login_title">用户登录</span>
      <div class="login-header-title">
        <a href="javascript:;" :class="{current: loginMode}" @click="dealLoginMode(true)">验证码登录</a>
        <a href="javascript:;" :class="{current: !loginMode}" @click="dealLoginMode(false)">密码登录</a>
      </div>
      <div class="login_content">
        <form>
          <!--手机验证码登录部分-->
          <div :class="{current: loginMode}">
            <section class="login-message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                v-if="!countDown"
                class="get-verification"
                :class="{phone_right: phoneRight}"
                @click.prevent="getVerifyCode()"
              >
                获取验证码
              </button>
              <button
                v-else
                disabled="disabled"
                class="get-verification">
                已发送({{countDown}}s)
              </button>
            </section>
            <section class="login-verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login-hint">
              温馨提示：未注册YZ酒店帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">服务协议与隐私政策</a>
            </section>
          </div>
          <!--账号登录部分-->
          <div :class="{current: !loginMode}">
            <section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="用户名/手机/邮箱" v-model="user_name">
              </section>
              <section class="login-verification">
                <input type="password" maxlength="18" placeholder="密码" v-if="pwdMode" v-model="pwd">
                <input type="text" maxlength="18" placeholder="密码" v-else v-model="pwd">
                <div class="switch-show">
                  <img @click.prevent="dealPwdMode(false)" :class="{on: pwdMode}" src="./images/hide_pwd.png" alt=""
                       width="20">
                  <img @click.prevent="dealPwdMode(true)" :class="{on: !pwdMode}" src="./images/show_pwd.png" alt=""
                       width="20">
                </div>
              </section>
              <section class="login-message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img
                  ref="captcha"
                  class="get-verification"
                  src="http://localhost:3000/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha()"
                >
              </section>
            </section>
          </div>
          <button class="login-submit" @click.prevent="login()">登录</button>
        </form>
      </div>


    </div>
</template>

<script>
  import {getPhoneCode,PhoneLogin,pwdLogin} from '../../api/index'
  import {Toast} from 'mint-ui'
  import {mapActions} from 'vuex'
    export default {
        name: "Login",
      data(){
          return{
            loginMode: true, // 登录方式, true 验证码登录 false 账号登录
            phone: '', // 手机号码
            countDown: 0, // 倒计时
            pwdMode: true, // 密码的显示方式 true 密文 false 明文
            pwd: '', // 密码
            code: '', // 验证码
            userInfo: {}, // 用户的信息
            user_name: '', // 用户名
            captcha: '',  // 图形验证码
          }
      },
      computed: {
        // 验证手机号是否合理
        phoneRight() {
          return /^[1][3,4,5,7,8][0-9]{9}$/.test(this.phone)
        }
      },
      methods:{
        ...mapActions(['syncUserInfo']),
        // 1. 登录的模式
        dealLoginMode(flag) {
          this.loginMode = flag;
        },
        // 2. 获取短信验证码
        async getVerifyCode() {
          // 2.1 开启倒计时
          if (this.phoneRight) {
            this.countDown = 60;
            this.intervalId = setInterval(() => {
              this.countDown--;
              // 判断
              if (this.countDown === 0) {
                clearInterval(this.intervalId);
              }
            }, 1000);
          }

          // 2.2 获取短信验证码
          let result = await getPhoneCode(this.phone);
          console.log(result);

          // 2.3 获取验证码失败
          if (result.err_code === 0) {
            // 提示信息
            Toast({
              message: result.message,
              position: 'center',
              duration: 3000
            });

            // 其他处理
            /*
            clearInterval(this.intervalId);
            this.countDown = 0;
            */
          }
        },
        dealPwdMode(flag) {
          this.pwdMode = flag;
        },
        // 4. 获取图形验证码
        getCaptcha() {
          this.$refs.captcha.src = 'http://localhost:3000/api/captcha?time=' + new Date();
        },
        // 5. 登录
        async login() {
          //判断本地session是否有数据


          // 5.1 登录模式
          if (this.loginMode) { // 验证码登录
            // 5.2 前台校验
            if (!this.phone) {
              Toast("请输入手机号码!");
              return;
            } else if (!this.phoneRight) {
              Toast("请输入正确手机号码!");
              return;
            }

            if (!this.code) {
              Toast("请输入验证码!");
              return;
            } else if (!(/^\d{6}$/gi.test(this.code))) {
              Toast("请输入正确的验证码!");
              return;
            }
            // 5.3 手机验证码登录
            const result = await PhoneLogin(this.phone, this.code);
            console.log(result);
            if (result.success_code === 200) {
              this.userInfo = result.message;
            } else {
              this.userInfo = {
                message: '登录失败, 手机号或验证码不正确!'
              };
            }
          } else { // 账号和密码登录
            // 5.4 前端校验
            if (!this.user_name) {
              Toast("请输入用户名/手机/邮箱!");
              return;
            } else if (!this.pwd) {
              Toast("请输入密码!");
              return;
            }else if (!this.captcha) {
              Toast("请输入验证码!");
              return;
            }
            // 5.5 用户名和密码的登录
            const result = await pwdLogin(this.user_name, this.pwd, this.captcha);
            console.log(result);
            if (result.success_code === 200) {
              this.userInfo = result.message;
              console.log(this.userInfo);
            } else {
              this.userInfo = {
                message: '登录失败, 手机号或验证码不正确!'
              };
            }
          }
          // 6. 后续处理


          if (!this.userInfo.id) { // 失败
            Toast(this.userInfo.message);
          } else { // 成功
            // 6.1 同步用户数据
            this.syncUserInfo(this.userInfo);

            //将数据注入sessionStorage
            if(!window.localStorage){
              alert('请使用新版浏览器')
            }else{
              let storage=window.sessionStorage;
              //storage.setItem('key',JSON.stringify(this.staffInfo))
                storage.setItem('userInfo',JSON.stringify(this.userInfo))
            }
          }
            // 6.2 回到主界面
            this.$router.push('/');
          }
      }
  }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.login_index

  margin 10% 25%
  width: 400px;
  height 400px
  /*border red solid 1px*/
  background-color: white

  border-radius 20px
  .login_title
    display inline-block
    margin-left 0
    margin-top 20px
    font-size 30px
    font-weight bold
  .login-header-title
    padding-top 40px
    padding-bottom 10px
    text-align center
    > a
      color #333
      font-size 14px
      padding-bottom 4px
      &:first-child
        margin-right 40px
      &.current
        color mediumpurple
        font-weight 700
        border-bottom 2px solid mediumpurple
  .login_content
    > form
      > div
        display none
        &.current
          display block
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
        .login-message
          position relative
          margin-top 16px
          margin-left 20%
          width 60%
          height 48px
          font-size 14px
          background #fff
          .get-verification
            position absolute
            top 50%
            right 10px
            transform translateY(-50%)
            border 0
            color #ccc
            font-size 14px
            background transparent
            &.phone_right
              color purple
        .login-verification
          position relative
          margin-top 16px
          margin-left 20%
          height 48px
          width 60%
          font-size 14px
          background #fff
          .switch-show
            position absolute
            right 10px
            top 12px
            img
              display none
            img.on
              display block
        .login-hint
          margin-top 12px
          color #999
          font-size 12px
          line-height 20px
          > a
            color mediumpurple
      .login-submit
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

.login_index::before
  content: ''
  background:url("../../../static/img/home_5.jpg")
  background-position top
  opacity:0.5
  position:absolute;
  width: 100%
  height 100%
  margin-left -37.5%
  margin-top -10%
  z-index -1

</style>
