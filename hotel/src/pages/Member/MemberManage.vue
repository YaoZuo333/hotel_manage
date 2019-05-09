<template>
    <div class="member-manage">
      <h2>客户信息</h2>
      <!--检索-->
      <span class="search">
          <input type="text" placeholder="根据客户姓名检索" v-model="searchName">
          <button class="btn btn-default" style="height: 40px;margin-bottom: 5px" @click="search"><i class="glyphicon glyphicon-search" style="height: 20px;width: 50px" ></i></button>
        </span>

      <!--按钮-->
      <span class="glyphicon glyphicon-plus add-staff" @click="showAdd(true)"></span>
      <span class="glyphicon glyphicon-minus remove-staff" @click="removeMember()"></span>

      <!--添加面板-->
      <div class="add-content" v-if="isAdd">
        <div class="add-body">
          <form class="add-form">
            <h2>添加客户信息</h2>
            <section class="add-staff-name">
              <span>姓名：</span>
              <input type="text" maxlength="18" placeholder="请输入客户的姓名" v-model="addName"/>
            </section>
            <section class="">
              <span>性别：</span>
              <input type="text" maxlength="18" placeholder="请输入客户的性别" v-model="addSex"/>
            </section>
            <section class="">
              <span>电话：</span>
              <input type="text" maxlength="18" placeholder="请输入客户的电话" v-model="addPhone"/>
            </section>
            <section class="">
              <span>年龄：</span>
              <input type="text" maxlength="18" placeholder="请输入客户的年龄" v-model="addAge"/>
            </section>
            <section class="">
              <span>住址：</span>
              <input type="text" maxlength="18" placeholder="请输入客户的住址" v-model="addAddress"/>
            </section>
            <section class="">
              <span>密码：</span>
              <input type="password" maxlength="18" placeholder="请输入密码" v-model="addPsw"/>
            </section>
          </form>
        </div>
        <div class="add-footer">
          <button @click="addMember()">添加</button>
          <button @click="showAdd(false)">关闭</button>
        </div>
      </div>

      <!--修改面板-->
      <div class="add-content" v-if="isUpdata">
        <div class="add-body">
          <form class="add-form">
            <h2>修改客户信息</h2>
            <section class="add-staff-name">
              <span>姓名：</span>
              <input type="text" maxlength="18" :placeholder="changeInfo.user_name" v-model="changeInfo.user_name"/>
            </section>
            <section class="">
              <span>性别：</span>
              <input type="text" maxlength="18" v-model="changeInfo.user_sex"/>
            </section>
            <section class="">
              <span>电话：</span>
              <input type="text" maxlength="18" v-model="changeInfo.user_phone"/>
            </section>
            <section class="">
              <span>年龄：</span>
              <input type="text" maxlength="18" v-model="changeInfo.user_age"/>
            </section>
            <section class="">
              <span>住址：</span>
              <input type="text" maxlength="18" v-model="changeInfo.user_address"/>
            </section>
          </form>
        </div>
        <div class="add-footer">
          <button @click="updataMember()">修改</button>
          <button @click="showUpdata(false)">关闭</button>
        </div>
      </div>


      <div id="examine_manage">
        <table id="houseDetails">
          <tr>
            <td class="" style="width: 3%"></td>
            <td class="choose">客户Id</td>
            <td class="title">客户姓名</td>
            <td class="rentType">客户性别</td>
            <td class="houseArea">联系方式</td>
            <td class="location">客户年龄</td>
            <td class="houseTheme">客户住址</td>
            <td class="more">操作</td>
          </tr>

          <tr v-for="(info,index) in this.memberInfoData" class="gery_bg" >
            <input type="checkbox" ref="checkboxs" name="info" :value="info.user_Id">
            <td class="choose">{{info.user_Id}}</td>
            <td class="title" :title="info.user_name">{{info.user_name}}</td>
            <td class="rentType" :title="info.user_sex">{{info.user_sex}}</td>
            <td class="houseArea" :title="info.user_phone">{{info.user_phone}}</td>
            <td class="location" :title="info.user_age">{{info.user_age}}</td>
            <td class="houseTheme" :title="info.user_address">{{info.user_address}}</td>
            <td class="more"><span v-on:click="showUpdata(true,info)">修改</span></td>
          </tr>
        </table>
        <template>
          <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total/>
        </template>
      </div>
    </div>
</template>

<script>
  import {getMemberInfo,searchMember,addMemberInfo,changeMember,removeMember} from './../../api/index'
    export default {
        name: "MemberManage",
      data(){
          return{
            memberInfo:[],
            memberInfoData:[],
            pn:1,
            maxPn:1,
            maxInfo:10,
            mr:1,
            ajaxHistoryData:[],
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            searchName:'',
            isAdd:false,
            addName:'',
            addSex:'',
            addPhone:'',
            addAddress:'',
            addAge:'',
            addPsw:'',
            isUpdata:false,
            changeInfo:{}
          }
      },
      methods:{
        /*是否展示添加页面*/
        showUpdata(flag,info){
          this.isUpdata = flag;
          this.changeInfo = info;
          //console.log(this.changeInfo);
        },
        /*添加客户*/
        async addMember(){
          const result = await addMemberInfo(this.addName,this.addSex,this.addPhone,this.addAge,this.addAddress,this.addPsw);
          if (result.success_code == 200) {
            this.$Message.success("添加客户成功");
            this.sessionMemberInfo();
            this.isAdd = false
          }else {
            this.$Message.error(result.message);
          }
        },
        showAdd(flag){
          this.isAdd = flag;
          console.log(this.isAdd);
        },
        /*获取客户信息数据*/
        async sessionMemberInfo(){
          const result = await getMemberInfo();
          if (result.success_code === 200){
            this.memberInfo = result.message;
            this.dataCount = this.memberInfo.length;
            if (this.memberInfo.length < this.pageSize) {
              this.memberInfoData = this.memberInfo
            }else {
              this.memberInfoData = this.memberInfo.slice(0,this.pageSize)
            }
          }else {
            alert(result.message)
          }
        },
        changepage(index){
          let _start = ( index - 1 ) * this.pageSize;
          let _end = index * this.pageSize;
          this.memberInfoData = this.memberInfo.slice(_start,_end);
        },
        /*
     * 搜索
     * */
        async search(){
          if (this.searchName == ''){
            return;
          } else {
            const result = await searchMember(this.searchName);
            this.memberInfo = result.message;

            this.dataCount = this.memberInfo.length;
            if (this.memberInfo.length < this.pageSize) {
              this.memberInfoData = this.memberInfo
            }else {
              this.memberInfoData = this.memberInfo.slice(0,this.pageSize)
            }
          }
        },
        /*修改客户数据*/
        async updataMember(){
          console.log(this.changeInfo);
          const result = await changeMember(this.changeInfo);
          console.log(result);
          if (result.success_code == 200){
            this.$Message.success("修改客户成功");
            this.sessionMemberInfo();
            this.isUpdata = false
          }else {
            this.$Message.error(result.message);
          }
        },
        /*移除客户*/
        async removeMember(){
          let removeArr = [];
          this.$refs.checkboxs.forEach((value, index, array) => {
            let checkbox = value;
            if (checkbox.checked) {
              removeArr.push(parseInt(value.value))
            }
          });
          if (removeArr == []){
            return
          }
          const result = await removeMember(removeArr);
          if (result.success_code == 200){
            this.$Message.success("删除客户信息成功");
            this.sessionMemberInfo();
          }else {
            this.$Message.error(result.message)
          }
        },
      },
    mounted() {
          this.sessionMemberInfo();
    }
    }
</script>

<style scoped lang="stylus" ref="stylesheet/stylus">

  .add-staff{
    display inline-block
    width 35px
    height 35px
    font-size 30px
    position absolute
    top:35px
    right 69px
    cursor pointer
  }
  .remove-staff{
    display inline-block
    width 35px
    height 35px
    font-size 30px
    position absolute
    top:563px
    right 69px
    cursor pointer
  }
  .search{
    position: absolute;
    left: 15%;
    top 4%
  }
  .search-btn{
    height: 40px;
    width 130px;
    font-size 20px;
    text-align center;
    background-color: #317ef3;
    border-radius 5px
    color white
    cursor pointer
  }
  .search>input{
    height: 40px;
    width: 666px;
    margin-top 5px
    padding: 2px 6px;
    line-height: 24px;
    border: 1px solid #d7d6d7;
    border-radius: 4px;
    color: #555;
    font-size 20px
    background: #fff;
  }
  .search>span{
    display: inline-block;
    width: 24px;
    height: 24px;
    position: relative;
    left: 191px;
    cursor: pointer;
  }

  .add-content
    position absolute
    z-index 999
    width 60%
    height 80%
    margin-left 20%
    border black solid 1px
    background-color: sandybrown
    border-radius 30px
    .add-body
      width 100%
      height 80%
      //background-color: skyblue
      form
        width 60%
        height 100%
        margin-left 20%
        //background-color: silver
        h2
          padding-top 5%
        section
          padding-top 20px
          span
            font-size 30px
        input
          width 60%
          height 30px
          padding-left 8px
          box-sizing border-box
          border 1px solid #ddd
          border-radius 4px
          outline 0
          font 400 30px Arial
        .add-staff-name
          padding-top 10%
    .add-footer
      width 100%
      height 20%
      //background-color: pink
      button
        margin-top 5%
        width 200px
        height 50px
        line-height 50px
        font-size 30px
        background mediumpurple
        color #fff

  #examine_manage>table{
    width: calc(100% - 15px);
    table-layout:fixed;
    border-spacing:0px;
    border-collapse: collapse;
    margin-top: 80px;
  }
  td{
    text-overflow:ellipsis;
    overflow: hidden;
    white-space:nowrap;
  }
  #examine_manage>table>tr{
    width: 100%;
    height: 45px;
    line-height: 45px;
    font-size: 30px;
    color: #333;
    text-align: center;

  }
  #examine_manage>table>tr:first-child{
    font-size: 16px;
    margin-top: 0;
    padding: 0;
    width: 100%;
    /*background: #f2f2f2 url(./../../assets/table-head-bg.jpg) 0 0 repeat;*/
    border: 1px solid #dcdcdc;
    height: 34px;
    line-height: 34px;
    zoom: 1;
    border-radius: 10px;
  }

  .choose{
    width: 8%;
  }
  .title{
    width: 12%;
  }
  .rentType{
    width: 8%;
  }
  .houseArea{
    width: 8%;
  }
  .location{
    width: 8%;
  }
  .houseTheme{
    width: 8%;
  }
  .price{
    width: 8%;
  }
  .more{
    width: 8%;
  }
  .more>span{
    color: #338af9;
  }
  .more>span:hover{
    cursor: pointer;
  }
  .gery_bg:nth-child(2n+1){
    background-color: #eee;
  }

</style>
