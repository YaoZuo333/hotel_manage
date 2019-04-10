import {USER_INFO,RESET_USER_INFO,STAFF_INFO} from './mutation-types'
export default {
  [USER_INFO](state,{userInfo}){
    state.userInfo = userInfo;
  },
  [RESET_USER_INFO](state) {
    state.userInfo = {};
  },

  [STAFF_INFO](state,{staffInfo}){
    state.staffInfo = staffInfo;
  },
}
