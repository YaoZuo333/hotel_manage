import {USER_INFO,RESET_USER_INFO,STAFF_INFO} from './mutation-types'
import {getUserInfo,getLogout,getStaffInfo} from './../api/index'

export default {
  //同步用户信息
  syncUserInfo({commit},userInfo){
    commit(USER_INFO,{userInfo});
  },
  // 7. 异步获取用户信息
  async getUserInfo({commit}){
    const result = await getUserInfo();
    console.log(result);
    if(result.success_code === 200){
      commit(USER_INFO, {userInfo: result.message});
    }
  },
  // 8. 退出登录
  async logOut({commit}){
    const result = await getLogout();
    console.log(result);
    if(result.success_code === 200){
      commit(RESET_USER_INFO);
    }
  },

  //获取员工信息
  async getStaffInfo({commit}){
    const result = await getStaffInfo();
    //console.log(result);
    if(result.success_code === 200){
      commit(STAFF_INFO, {staffInfo: result.message});
    }
  },
}
