 import uniRequest from 'uni-request';
 
 let url_config = ""
 
 if(process.env.NODE_ENV === 'development'){
     // 开发环境
     url_config = '/api'
	 switch(uni.getSystemInfoSync().platform){
	     case 'android':
	        console.log('运行Android上')
	        break;
	     case 'ios':
	        console.log('运行iOS上')
	        break;
	     default:
	        url_config = 'http://172.100.100.7:9093/api/'
	        break;
	 }
 }else{
     // 生产环境
     url_config = 'https://www.fancystore.cn/api/'
 }


 uniRequest.defaults.baseURL = url_config;

export default uniRequest