import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
import store from './store'
Vue.prototype.$store = store
App.mpType = 'app'
let url_config = ''
console.log('uni.getSystemInfoSync().platform',uni.getSystemInfoSync().platform)
 if(process.env.NODE_ENV === 'development'){
     // 开发环境
     url_config = '/api/'
	 switch(uni.getSystemInfoSync().platform){
	     case 'android':
	        url_config = 'http://localhost:9093/api/'
	        break;
	     case 'ios':
	        console.log('运行iOS上')
	        break;
	     default:
	        url_config = 'http://localhost:9093/api/'
	        break;
	 }
 }else{
     // 生产环境
     url_config = 'https://www.fancystore.cn/api/'
 }
 console.log('url_config',url_config)
Vue.prototype.$baseApiUrl = url_config
const app = new Vue({
    store,
    ...App,
})
app.$mount()
