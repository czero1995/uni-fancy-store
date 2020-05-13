<template>
	<view class="page">
		 <image class="goods_img" :src="data.imgCover"></image>
		 <rich-text class="content" :nodes="content"></rich-text>
		 <!-- <uni-goods-nav :options="options" :fill="true" :button-group="buttonGroup" @click="onClick" @buttonClick="buttonClick" /> -->
	</view>
</template>

<script>
	import uniGoodsNav from '@/components/uni-goods-nav/uni-goods-nav.vue'
	export default {
		components: {
			uniGoodsNav
		},
		data() {
			return {
				data:{},
				content:'',
				options: [ {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ffa200 ',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ff0000',
						color: '#fff'
					}
				],
				query:{},
			}
		},
		onLoad(option){
			this.query = option
		},
		mounted(){
			this.getData()
		},
		methods: {
			getData(){
				uni.request({
				    url: `${this.$baseApiUrl}product/detail?uid=${this.query.uid}`,
				    complete: (res)=> {
						this.data = res.data.data
						this.content = res.data.data.detailInfo.content
					}
				});
			},
			buttonClick(){
				
			}
		}
	}
</script>

<style lang="less">
	.goods_img{
		width:100%;
		height:150px;
		border-bottom: 1px solid #ccc;
	}
	.page{
		padding-bottom:100rpx;
	}
	.uni-goods-nav{
		position: fixed;
		    bottom: 0;
		    width: 100%;
	}
</style>
