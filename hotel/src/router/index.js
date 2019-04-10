import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import Introduction from '../pages/Introduction/Introduction'
import MarketStatistics from '../pages/MarketStatistics/MarketStatistics'
import Member from '../pages/Member/Member'
import RoomM from '../pages/RoomM/RoomM'
/*import Staff from '../pages/StaffM/Staff'*/
const Staff = ()=> import('../pages/StaffM/Staff');
import Register from '../pages/Register/Rgeister'
import Login from '../pages/Login/Login'

Vue.use(Router);

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/introduction',
      name: 'introduction',
      component: Introduction
    },
    {
      path: '/marketStatistics',
      name: 'marketStatistics',
      component: MarketStatistics
    },
    {
      path: '/room',
      name: 'room',
      component: RoomM
    },
    {
      path: '/member',
      name: 'member',
      component: Member
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
