import Vue from 'vue'
import Router from 'vue-router'

import Home from '../pages/Home/Home'
import Introduction from '../pages/Introduction/Introduction'
import MarketStatistics from '../pages/MarketStatistics/MarketStatistics'
import Member from '../pages/Member/Member'
import RoomM from '../pages/RoomM/RoomM'
import BookingRoom from '../pages/RoomM/BookingRoom'
import BookingDate from '../pages/RoomM/BookingDate'
import BookingSelect from '../pages/RoomM/BookingSelect'
import BookingDetail from '../pages/RoomM/BookingDetail'
import BookingSuccess from '../pages/RoomM/BookingSuccess'
import ManageROOM from '../pages/RoomM/ManageRoom'
import OrderSelf from '../pages/Order/OrderSelf'
import OrderManage from '../pages/Order/OrderManege'
/*import Staff from '../pages/StaffM/Staff'*/
const Staff = ()=> import('../pages/StaffM/Staff');
import Register from '../pages/Register/Rgeister'
import Login from '../pages/Login/Login'

Vue.use(Router);

const router = new Router({
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
      component: RoomM,
    },
    {
      path:'/manageroom',
      name:'manageroom',
      component:ManageROOM
    },
    {
      path:'/booking',
      name:'bookingroom',
      component:BookingRoom,
      children:[
        {path:'/',component:BookingDate,},
        {path:'select',component:BookingSelect},
        {path:'detail',component:BookingDetail},
        {path:'success',component:BookingSuccess}
      ]
    },{
      path:'/orderself',
      name:'orderself',
      component:OrderSelf
    },
    {
      path:'/ordemanage',
      name:'ordermanage',
      component:OrderManage
    },
    {
      path: '/member',
      name: 'member',
      component: Member,
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
  ],
});

router.beforeEach((to,from,next)=>{
  if(window.sessionStorage.userInfo !== undefined &&JSON.parse(window.sessionStorage.userInfo).id > 0){
    next(vm => {
      if(this.$store.state.userInfo.id > 0){
        next();
      }else {
        if(to.path == '/login' || to.path == '/register'){
          next()
        }else {
          //console.log(window.sessionStorage.userInfo);
          //console.log(this.$store.state.userInfo);
          alert('还未登录或登录已失效，请重新登录');
          next('/login')
        }
      }
    })
  }else {
    if(to.path == '/login' || to.path == '/login/register' || to.path == '/login/login'){
      next()
    }else {
      //console.log(window.sessionStorage.userInfo.id);
      //console.log(window.sessionStorage.userInfo);
      //console.log(this.$store.state.userInfo);
      alert('还未登录或登录已失效，请重新登录');
      next('/login')
    }
  }});


export default router
