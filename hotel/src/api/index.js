import ajax from './ajax'



const BASE_URL = '/api';
//const BASE_URL = 'http://localhost:3000';

//请求验证码
export const getPhoneCode =(phone)=>ajax(BASE_URL+'/api/send_code',{phone});
//手机验证码登录
export const PhoneLogin = (phone,code)=>ajax(BASE_URL + '/api/login_code',{phone,code},'POST');
//账号密码登录
export const pwdLogin = (userNmae,pwd,captcha)=>ajax(BASE_URL + '/api/login_pwd',{userNmae,pwd,captcha},'POST');

export const postRgeister = (userPhone,userName,userAge,userPsw,userSex)=>ajax(BASE_URL + '/api/rgeister_post',{userPhone,userName,userAge,userPsw,userSex},'POST');

export const changeUserInfo = (user_id, user_name, user_sex, user_address, user_birthday) => ajax(BASE_URL + '/api/change_user_msg', {
  user_id,
  user_name,
  user_sex,
  user_address,
  user_birthday
}, 'POST');

// 2.9 获取登录的用户信息
export const getUserInfo = () => ajax(BASE_URL + '/api/user_info');

// 2.10 退出登录
export const getLogout = () => ajax(BASE_URL + '/api/logout');

//获取员工信息
export const getStaffInfo = () =>ajax(BASE_URL + '/api/get_staff_info');
//获取客户信息
export const getMemberInfo = () =>ajax(BASE_URL + '/api/get_member_info');

//检索员工信息
export const searchStaff = (searchName) =>ajax(BASE_URL + '/api/search_staff',{searchName},'POST');
//检索客户
export const searchMember = (searchName) =>ajax(BASE_URL + '/api/search_member',{searchName},'POST');
//添加员工信息
export const addStaffInfo = (staff_name, staff_sex, staff_department, staff_position, staff_salary,staff_age) => ajax(BASE_URL + '/api/add_staff_info', {
  staff_name, staff_sex, staff_department, staff_position, staff_salary,staff_age
}, 'POST');
//添加客户信息
export const addMemberInfo = (user_name, user_sex, user_phone, user_age, user_address,user_Psw) => ajax(BASE_URL + '/api/add_member_info', {
  user_name, user_sex, user_phone, user_age, user_address,user_Psw
}, 'POST');
//移除员工信息
export const removeStaff = (removeArr) =>ajax(BASE_URL + '/api/remove_staff',{removeArr},'POST');
//移除客户信息
export const removeMember = (removeArr) =>ajax(BASE_URL + '/api/remove_member',{removeArr},'POST');
//修改员工信息
export const changeStaff = (changeInfo) =>ajax(BASE_URL + '/api/change_staff',{changeInfo},'POST');
//修改客户信息
export const changeMember = (changeInfo) =>ajax(BASE_URL + '/api/change_member',{changeInfo},'POST');
//上传订单数据
export const postOrder = (type, start, end, userId, price, number, total,others,peoples) =>ajax(BASE_URL + '/api/add_order',{type,start,end,userId,price,number,total,others,peoples},'POST');

export const getSelfOrder = (userId) =>ajax(BASE_URL + '/api/get_self_order',{userId});

export const getAllOrder = () =>ajax(BASE_URL + '/api/get_all_order');

export const getOrderUser = (userId) =>ajax(BASE_URL + '/api/get_order_user',{userId});

export const updataRoomState = (roomStr,orderId,roomState) =>ajax(BASE_URL + '/api/updata_room',{roomStr,orderId,roomState});

export const upOrderState = (orderId,orderState,roomIdStr) =>ajax(BASE_URL + '/api/updata_order',{orderId,orderState,roomIdStr});

export const getAllRoom = () =>ajax(BASE_URL + '/api/get_all_room');

//查询可分配房间
export const getfreeRoom = (type) =>ajax(BASE_URL + '/api/get_free_room',{type});

export const changRoomState = (roomid,roomstate) =>ajax(BASE_URL + '/api/chang_room_state',{roomid,roomstate});

//按年月日查询数据
export const yearTotalPrice = () =>ajax(BASE_URL + '/api/get_year_total');

export const monthTotalPrice = (year) =>ajax(BASE_URL + '/api/get_month_data',{year});

export const dayTotalPrice = (month) =>ajax(BASE_URL + '/api/get_days_data',{month});

export const getSpecialData = (start,end) =>ajax(BASE_URL + '/api/special_time_data',{start,end});
