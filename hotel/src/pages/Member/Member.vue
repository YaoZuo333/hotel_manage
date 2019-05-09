<template>
    <div class="member">
      <div v-if="!this.userInfo.id">
        请先登录
      </div>
      <div class="member_content" v-else>
        <div class="user-detail">
          <div class="user-detail-top">基本信息</div>
          <div class="user-detail-group">

            <div class="user-item">
              <span>手机</span>
              <span>{{user_phone}}</span>
            </div>
            <div class="user-item">
              <span>昵称</span>
              <span><input type="text" v-model="user_name"></span>
            </div>
            <div class="user-item" @click="sheetVisible = true">
              <span>性别</span>
              <span>
          <label for="man">男</label>
          <input type="radio" id="man" value="男" class="man" v-model="user_sex"/>
          <label for="woman">女</label>
          <input type="radio" value="女" id="woman" class="woman" v-model="user_sex"/>
       </span>
            </div>
            <div class="user-item">
              <span>常住地</span>
              <span><input type="text" v-model="user_address"></span>
            </div>
            <div class="user-item">
              <span>年龄</span>
              <span>
                <input type="text" maxlength="18" v-model="user_age" oninput="value=value.replace(/[^\d]/g,'')"/>
              </span>
            </div>
            <Modal
              title="修改密码"
              v-model="modal10"
              class-name="vertical-center-modal"
              @on-ok="changePwd">
              <Input v-model="user_pwd" size="large" placeholder="请输入密码" type="password" />
              <Input v-model="user_pwdS" size="large" placeholder="请重复上一输入的密码" type="password" style="margin-top: 20px"/>
            </Modal>
            <button @click="saveUserInfo">修改</button>
            <button @click="modal10=true">修改密码</button>
          </div>
          </div>
      </div>
    </div>
</template>

<script>
    import {mapState,mapActions} from 'vuex'
    import {changeUserInfo,changePWD} from './../../api/index'
    import {Toast,MessageBox} from 'mint-ui';

    export default {
        name: "Member",
      data() {
        return {
          modal10:false,
          user_sign: '',
          user_address: '',
          user_name: '',
          user_sex: '',
          user_phone: '',
          user_birthday: '',
          user_age: '',
          user_pwd:'',
          user_pwdS:'',
          // 2. 性别
          sheetVisible: false,
          actions: [
            {name: '男', method: this.selectSex},
            {name: '女', method: this.selectSex},
          ],

          // 3. 出生年月日
          startDate: new Date('1960-01-01'),
          endDate: new Date(),
        }
      },
      mounted(){
        this.user_sign = this.userInfo.user_sign || '';
        this.user_address = this.userInfo.user_address || '';
        this.user_name = this.userInfo.user_name || '';
        this.user_sex = this.userInfo.user_sex || '';
        this.user_phone= this.userInfo.user_phone || '';
        this.user_birthday= this.userInfo.user_birthday || '';
      },
      computed:{
        ...mapState(['userInfo'])
      },
      methods:{
        ...mapActions(["logOut"]),
        //修改密码
        async changePwd(){
          if (this.user_pwd !== this.user_pwdS){
            this.$Message.error("两次密码输入不同，请重新输入");
            return ;
          }
          const result = await changePWD(this.userInfo.id,this.user_pwd);
          if (result.success_code === 200){
            this.$Message.success("修改密码成功，请重新登录");
            this.logOut({});
            let storage=window.sessionStorage;
            storage.removeItem('userInfo');
            this.$router.push('/login')
          } else {
            this.$Message.error("修改密码失败，请重试或联系管理员")
          }
        },
        // 3. 修改用户信息
        async saveUserInfo(){
          // 3.1 请求接口
          //console.log(this.userInfo.id);
          let result = await changeUserInfo(this.userInfo.id, this.user_name, this.user_sex, this.user_address, this.user_age, this.user_sign);
          // console.log(result);
          // 3.2 提示用户
          if (result.success_code === 200){
            this.$Message.success("修改个人信息成功")
          } else {
            this.$Message.error("修改失败")
          }
          // 3.3 返回主界面
          if(result.success_code === 200){
            // 3.4 更新本地数据
            this.$store.dispatch('getUserInfo');
            // 3.5 返回主界面
            setTimeout(()=>{
              this.$router.replace('/member');
            }, 2000)
          }
        },
        dealLogout() {
          // console.error(11);
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
              this.$router.push('/home');
            })
          }
        }
      }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">
.member
  margin-left 200px
  .user-detail
    width 40%
    height 100%
    margin-left 20%
    .user-detail-top
      width 100%
      height 60%px
      line-height 60px
      font-size 20px
      padding-left 10px
      font-weight bold
    .user-detail-group
      border-radius 20px
      .user-icon
        height 20%px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        img
          width 50px
          border-radius 50%
      .user-item
        height 80px
        font-size 20px
        padding 0 10px
        background-color #fff
        border-bottom: 1px solid #e0e0e0
        display flex
        justify-content space-between
        align-items center
        span
          input
            border none
            outline none
            text-align right
            font-size 20px
      button
        width 90%
        height 40px
        line-height 40px
        background-color #e9232c
        text-align center
        margin 10px 5%
        border none
        font-size 16px
        color #fff
        border-radius 10px
    .right-title-color
      color #999
      font-size 14px
</style>
