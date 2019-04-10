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

//检索员工信息
export const searchStaff = (searchName) =>ajax(BASE_URL + '/api/search_staff',{searchName},'POST');
//添加员工信息
export const addStaffInfo = (staff_name, staff_sex, staff_department, staff_position, staff_salary,staff_age) => ajax(BASE_URL + '/api/add_staff_info', {
  staff_name, staff_sex, staff_department, staff_position, staff_salary,staff_age
}, 'POST');
//移除员工信息
export const removeStaff = (removeArr) =>ajax(BASE_URL + '/api/remove_staff',{removeArr},'POST');

//修改员工信息
export const changeStaff = (changeInfo) =>ajax(BASE_URL + '/api/change_staff',{changeInfo},'POST');
