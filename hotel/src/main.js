// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import moment from 'moment'//导入文件

Vue.prototype.$moment = moment;//赋值使用
Vue.filter('datefmt',function(input,fmtstring){

  return moment(input).format(fmtstring)

});

/*import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Mint);*/
Vue.use(iView);
Vue.use(ElementUI);



Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
