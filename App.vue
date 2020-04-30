<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
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
