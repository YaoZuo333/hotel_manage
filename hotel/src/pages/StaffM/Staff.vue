<template>
    <div class="staff">
      <div class="staff-content" v-if="this.userInfo.user_position == '管理员'">
        <!--检索-->
        <span class="search">
          <input type="text" placeholder="根据员工姓名检索" v-model="searcheName">
          <button class="btn btn-default" style="height: 40px;margin-bottom: 5px" @click="search"><i class="glyphicon glyphicon-search" style="height: 20px;width: 50px" ></i></button>
        </span>

        <!--按钮-->
        <span class="glyphicon glyphicon-plus add-staff" @click="showAdd(true)"></span>
        <span class="glyphicon glyphicon-minus remove-staff" @click="removeStaff()"></span>

        <!--添加面板-->
        <div class="add-content" v-if="isAdd">
          <div class="add-body">
              <form class="add-form">
                <h2>添加员工信息</h2>
                <section class="add-staff-name">
                  <span>姓名：</span>
                  <input type="text" maxlength="18" placeholder="请输入员工的姓名" v-model="addName"/>
                </section>
                <section class="">
                  <span>性别：</span>
                  <input type="text" maxlength="18" placeholder="请输入员工的性别" v-model="addSex"/>
                </section>
                <section class="">
                  <span>部门：</span>
                  <input type="text" maxlength="18" placeholder="请输入员工的部门" v-model="addDepartment"/>
                </section>
                <section class="">
                  <span>职位：</span>
                  <input type="text" maxlength="18" placeholder="请输入员工的职位" v-model="addPositon"/>
                </section>
                <section class="">
                  <span>薪酬：</span>
                  <input type="text" maxlength="18" placeholder="请输入员工的薪酬" v-model="addSalary"/>
                </section>
                <section class="">
                  <span>工龄：</span>
                  <input type="text" maxlength="18" placeholder="请输入员工的工作年龄" v-model="addAge"/>
                </section>
              </form>
          </div>
          <div class="add-footer">
              <button @click="addStaff()">添加</button>
              <button @click="showAdd(false)">关闭</button>
          </div>
        </div>

        <!--修改面板-->
        <div class="add-content" v-if="isUpdata">
          <div class="add-body">
            <form class="add-form">
              <h2>修改员工信息</h2>
              <section class="add-staff-name">
                <span>姓名：</span>
                <input type="text" maxlength="18" :placeholder="changeInfo.staff_name" v-model="changeInfo.staff_name"/>
              </section>
              <section class="">
                <span>性别：</span>
                <input type="text" maxlength="18" v-model="changeInfo.staff_sex"/>
              </section>
              <section class="">
                <span>部门：</span>
                <input type="text" maxlength="18" v-model="changeInfo.staff_department"/>
              </section>
              <section class="">
                <span>职位：</span>
                <input type="text" maxlength="18" v-model="changeInfo.staff_position"/>
              </section>
              <section class="">
                <span>薪酬：</span>
                <input type="text" maxlength="18" v-model="changeInfo.staff_salary"/>
              </section>
              <section class="">
                <span>工龄：</span>
                <input type="text" maxlength="18" v-model="changeInfo.staff_work_age"/>
              </section>
            </form>
          </div>
          <div class="add-footer">
            <button @click="updataStaff()">修改</button>
            <button @click="showUpdata(false)">关闭</button>
          </div>
        </div>


        <div id="examine_manage">
          <table id="houseDetails">
            <tr>
              <td class="choose">工号</td>
              <td class="title">姓名</td>
              <td class="rentType">性别</td>
              <td class="houseArea">部门</td>
              <td class="location">职位</td>
              <td class="houseTheme">工作年龄</td>
              <td class="price">薪酬</td>
              <td class="more">操作</td>
            </tr>

            <tr v-for="(info,index) in this.staffInfoData" class="gery_bg" >
              <td class="choose">{{info.staff_id}}<span>. </span><input type="checkbox" ref="checkboxs" name="info" :value="info.staff_id"></td>
              <td class="title" :title="info.staff_name">{{info.staff_name}}</td>
              <td class="rentType" :title="info.staff_sex">{{info.staff_sex}}</td>
              <td class="houseArea" :title="info.staff_department">{{info.staff_department}}</td>
              <td class="location" :title="info.staff_positio">{{info.staff_position}}</td>
              <td class="houseTheme" :title="info.staff_salary">{{info.staff_work_age}}年</td>
              <td class="price" :title="info.staff_salar">{{info.staff_salary}}元/月</td>
              <td class="more"><span v-on:click="showUpdata(true,info)">修改</span></td>
            </tr>

          </table>
          <template>
            <Page :total="dataCount" :page-size="pageSize" @on-change="changepage" show-total/>
          </template>
        </div>
      </div>
      <div v-else>
        您不是管理员，无法访问
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getStaffInfo,searchStaff,addStaffInfo,removeStaff,changeStaff} from './../../api/index'
    export default {
        name: "Staff",
      data(){
          return{
            staffInfo:[],
            staffInfoData:[],
            pn:1,
            maxPn:1,
            maxInfo:10,
            mr:1,
            ajaxHistoryData:[],
            // 初始化信息总条数
            dataCount:0,
            // 每页显示多少条
            pageSize:10,
            searcheName:'',
            isAdd:false,
            addName:'',
            addSex:'',
            addDepartment:'',
            addPositon:'',
            addSalary:'',
            addAge:'',
            isUpdata:false,
            changeInfo:{}
          }
      },
      computed:{
        ...mapState(['userInfo'])
      },
      watch:{
          /*checkValue(){
            this.removeArr.push(this.checkValue);
            console.log(this.removeArr)
          }*/
      },
      methods:{
          /*是否展示添加页面*/
        showUpdata(flag,info){
          this.isUpdata = flag;
          this.changeInfo = info;
          //console.log(this.changeInfo);
        },
          showAdd(flag){
            this.isAdd = flag;
            console.log(this.isAdd);
          },
        /*添加员工的方法*/
       async addStaff(){
            const result = await addStaffInfo(this.addName,this.addSex,this.addDepartment,this.addPositon,this.addSalary,this.addAge);
            if (result.success_code == 200) {
              this.sessionStaffInfo();
              this.isAdd = false
            }
            //console.log(result);
        },

        /*修改员工数据*/
        async updataStaff(){
         const result = await changeStaff(this.changeInfo);
          console.log(result);
          if (result.success_code == 200){
            this.sessionStaffInfo();
            this.isUpdata = false
          }
        },

        /*移除员工*/
        async removeStaff(){
          let removeArr = [];
          this.$refs.checkboxs.forEach((value, index, array) => {
            let checkbox = value;
            if (checkbox.checked) {
              removeArr.push(parseInt(value.value))
            }
          });
          console.log(removeArr);
          if (removeArr == []){
            return
          }
          const result = await removeStaff(removeArr);
          console.log(result);
          if (result.success_code == 200){
              this.sessionStaffInfo();
          }
        },
        /*
     * 搜索
     * */
        async search(){
          if (this.searchName == ''){
            return;
          } else {
            console.log(this.searchName);
            const result = await searchStaff(this.searcheName);
            console.log(result);
            this.staffInfo = result.message;

            this.dataCount = this.staffInfo.length;
            if (this.staffInfo.length < this.pageSize) {
              this.staffInfoData = this.staffInfo
            }else {
              this.staffInfoData = this.staffInfo.slice(0,this.pageSize)
            }
          }
        },
        StaffInfoGet(){
          if (this.userInfo.user_position == '管理员'){
            this.$store.dispatch('getStaffInfo');
          }
          this.staffInfo = this.$store.state.staffInfo;
          //console.log(this.staffInfo);
          if(!window.localStorage){
            alert('请使用新版浏览器')
          }else{
            let storage=window.sessionStorage;
            //console.log(JSON.stringify(this.staffInfo));
            storage.setItem('staffInfo',JSON.stringify(this.staffInfo))
            /*for(let i=0;i<this.staffInfo.length;i++){
              storage.setItem(i,JSON.stringify(this.staffInfo[i]))
            }*/
          }
        },
        async sessionStaffInfo(){
          let storage=window.sessionStorage;
          //let staffInfo = JSON.parse(storage.staffInfo);
          /*if (storage.staffInfo){
            let staffInfo = JSON.parse(storage.staffInfo);
            this.staffInfo = staffInfo;
            console.log("session:"+staffInfo)
          }else {*/
            const result = await getStaffInfo();
            this.staffInfo = result.message;
            //console.log("服务器获取："+this.staffInfo);

            if(!window.localStorage){
              alert('请使用新版浏览器')
            }else{
              let storage=window.sessionStorage;
              //console.log(JSON.stringify(this.staffInfo));
              storage.setItem('staffInfo',JSON.stringify(this.staffInfo))
              /*for(let i=0;i<this.staffInfo.length;i++){
                storage.setItem(i,JSON.stringify(this.staffInfo[i]))
              }*/
            }
          /*}*/

          this.dataCount = this.staffInfo.length;
          if (this.staffInfo.length < this.pageSize) {
              this.staffInfoData = this.staffInfo
          }else {
            this.staffInfoData = this.staffInfo.slice(0,this.pageSize)
          }
        },
        changepage(index){
          var _start = ( index - 1 ) * this.pageSize;
          var _end = index * this.pageSize;
          this.staffInfoData = this.staffInfo.slice(_start,_end);
        },
        /*
       * 分页
       * */
        set_pn(opt){
          this.pn = opt;
          this.$refs.pag.value = this.pn;
          this.$refs.checkboxs.forEach(function (value, index, array) {
            let checkbox = value;
            checkbox.checked = false;
          })
        },


      },
      created(){
          this.sessionStaffInfo();
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
              font-size 14px
          input
            width 60%
            height 30px
            padding-left 8px
            box-sizing border-box
            border 1px solid #ddd
            border-radius 4px
            outline 0
            font 400 14px Arial
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
    font-size: 14px;
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
    width: 45px;
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
