<script>
   import {mapGetters,mapMutations} from 'vuex'
	export default {
		onLaunch: function() {
            let userInfo = uni.getStorageSync('userInfo')
            if(userInfo){
                 console.log('进入刷新有缓存的状态',userInfo)
                 this.setUserInfo(userInfo)
            }
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
        methods:{
            ...mapMutations({
                setUserInfo: "SET_USER_INFO",
            }),
        }
	}
</script>

<style lang="less">
	@import "./static/style/base.less";
	.uni-page-head{
		background-color: white !important;
		.bb;
	}
	
	.color_awark{
		color:red;
	}
	.goods_title{
		font-size: 16px;
	}
	.goods_price{
		font-size: 15px;
	}
	
</style>
