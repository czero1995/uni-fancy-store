<template>
	<view>
		<uni-segmented-control :current="current" :values="categoryItems" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		<view  class="goods_box flex_wrap" >
			<view class="goods_item" v-for="item in goodsDatas" :key="item.uid" @click="toDetail(item.uid)">
				<image class="goods_item--cover" :src="item.imgCover"></image>
					<view class="goods_info">
						<view class="goods_title">{{item.title}}</view>
						<view class="color_awark goods_price">{{item.priceNow}}</view>
						<!-- <image class="goods_item--cart" src="/static/logo.png"></image> -->
					</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from '@/components/uni-segmented-control/uni-segmented-control.vue'
	export default {
		components: {
			uniSegmentedControl
		},
		data() {
			return {
				current: 0,
				colorIndex: 0,
				activeColor: '#dd524d',
				styleType: 'text',
				categoryData:[],
				categoryItems:[],
				goodsDatas:[],
			}
		},
		mounted(){
			this.getCategoryData()
			this.getGoodsDatas('糖果')
		},
		methods: {
			getCategoryData(){
				uni.request({
				    url: `${this.$baseApiUrl}category/all`,
				    complete: (res)=> {
						this.categoryData = res.data.data
						this.categoryItems = res.data.data.map(item => item.title)
					}
				});
			},
			getGoodsDatas(type){
				uni.showLoading({  
				    title: '加载中'  
				});
				uni.request({
				    url: `${this.$baseApiUrl}product/all?pageNum=0&category=${type}`,
				    complete: (res)=> {
						this.goodsDatas = res.data.data
						uni.hideLoading();  
					}
				});
				
			},
			onClickItem(val){
				this.categoryData.map((item,index) => {
					if(index == val.currentIndex){
						this.getGoodsDatas(item.title)
					}
				})
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
	.goods_box{
		width: 100%;
	}
	.goods_item{
		display: flex;
		align-items: flex-start;
		border-bottom: 1px solid #ccc;
		box-sizing: border-box;
	}
	.goods_item--cover{
		width: 200rpx;
		height:200rpx;
		margin-right: 10rpx;
	}
	.goods_item--cart{
		width: 40rpx;
		height: 40rpx;
	}
	.goods_price{
		margin: 20rpx 0;
	}
	.goods_info{
		padding-top: 6rpx;
	}
</style>
