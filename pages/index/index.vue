<template>
	<view class="content">
		<view class="banner">
			<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
				<swiper-item v-for="(item,index) in bannerDatas" :key="index">
					<image class="banner_item--img" :src="item.img"></image>
				</swiper-item>
			</swiper>
		</view>
		<view  class="goods_box" >
			<view class="goods_item" v-for="item in goodsDatas" :key="item.uid" @click="toDetail(item.uid)">
				<image class="goods_item--cover" :src="item.imgCover"></image>
				<view class="flex_between pl4 pr4">
					<view>
						<view class="goods_title">{{item.title}}</view>
						<text class="color_awark goods_price">{{item.priceNow}}</text>
					</view>
					<!-- <image class="goods_item--cart" src="/static/logo.png"></image> -->
				</view>
				
			</view>
		</view>
		
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- <view class="text-area">
			<text class="title">{{title}}</text>
			<navigator url="/pages/detail/index" hover-class="navigator-hover">
				<button type="default">跳转到详情页1</button>
			</navigator>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello,我是uni-app',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				bannerDatas:[
					// {"order":1,"_id":"5da49070d428ce70cdd5f81c","title":"爱心","url":"","img":"https://qiniu.fancystore.cn/jiu.jpg","uid":1,"created":"2019-10-14T15:12:48.550Z","updated":"2020-03-24T01:04:34.870Z","__v":0},
					// {"order":1,"_id":"5da4913cd428ce70cdd5f81e","title":"疫情","url":"","img":"https://qiniu.fancystore.cn/yiqing.jpg","uid":3,"created":"2019-10-14T15:16:12.350Z","updated":"2020-03-24T01:04:15.810Z","__v":0}
				],
				goodsDatas:[
					// {"order":1,"_id":"5da3c74b32efd229d23c2eb3","title":"碧根果仁","priceNow":49.9,"priceOrigin":"58.90","imgCover":"https://qiniu.fancystore.cn/bigenguoren.png","category":"热门","uid":15,"created":"2019-10-14T00:54:35.534Z","updated":"2019-10-14T00:54:35.534Z","__v":0},
					// {"order":1,"_id":"5da3c6ea32efd229d23c2eb2","title":"俄罗斯风味零食礼盒","priceNow":28.8,"priceOrigin":"48.80","imgCover":"https://qiniu.fancystore.cn/elsfengweilihe.png","category":"热门","uid":14,"created":"2019-10-14T00:52:58.144Z","updated":"2019-10-14T00:52:58.144Z","__v":0},
					// {"order":1,"_id":"5da3c69832efd229d23c2eb1","title":"极燕即食燕窝","priceNow":190,"priceOrigin":"230","imgCover":"https://qiniu.fancystore.cn/yangwo.png","category":"热门","uid":13,"created":"2019-10-14T00:51:36.331Z","updated":"2019-10-14T00:51:36.331Z","__v":0}]
					]
			}
		},
		onLoad() {

		},
		onPullDownRefresh() {
		        console.log('refresh');
		        setTimeout(function () {
		            uni.stopPullDownRefresh();
		        }, 1000);
		},
		mounted(){
			this.getGoodsData()
			this.getBanner()
		},
		methods: {
			getGoodsData(){
				console.log('进入')
				uni.request({
				    url: `${this.$baseApiUrl}product/all?pageNum=0&category=热门`,
				    complete: (res)=> {
						console.log('res',res)
						this.goodsDatas = res.data.data
					}
				});
			},
			getBanner(){
				uni.request({
				    url: `${this.$baseApiUrl}banner/all`,
				    complete: (res)=> {
						this.bannerDatas = res.data.data
					}
				});
			},
			toDetail(uid){
				uni.navigateTo({
				    url: `/pages/detail/index?uid=${uid}`
				});
			}
		}
	}
</script>

<style lang="less">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	
	.banner {
		width:100%;
		border-bottom: 1px solid #ccc;
	}
	.swiper {
		height: 300rpx;
	}
	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}
	
	
	.banner_item--img{
		width: 100%;
		height:100%;
		
	}
	.goods_box{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
	}
	.goods_item{
		width: 50%;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;
		&:nth-child(odd){
			border-right: 1px solid #ccc;
		}
	}
	.goods_item--cover{
		width: 100%;
		height:400rpx;
	}
	.goods_item--cart{
		width: 40rpx;
		height: 40rpx;
	}
</style>
