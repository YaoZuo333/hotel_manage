import {USER_INFO,RESET_USER_INFO,STAFF_INFO,BOOKING_DATE,INIT_BOOKING,BOOKING_NUMBER} from './mutation-types'
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

  [BOOKING_DATE](state,{date}){
    state.bookingRoom.start = date[0];
    state.bookingRoom.end = date[1];
    state.bookingRoom.days = date[2];
  },
  [INIT_BOOKING](state,{obj}){
    state.bookingRoom.type = obj.roomType;
    state.bookingRoom.price = obj.roomPrice;
    state.bookingRoom.img = obj.roomImg;
  },
  [BOOKING_NUMBER](state,{obj}){
    state.bookingRoom.number = obj.number;
    state.bookingRoom.totalPrice = obj.totalPrice;
  }
}
