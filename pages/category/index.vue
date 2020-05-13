<template>
	<view>
		<uni-segmented-control :current="current" :values="categoryItems" :style-type="styleType" :active-color="activeColor" @clickItem="onClickItem" />
		<view  class="goods_box flex_wrap" >
			<view class="goods_item" v-for="item in goodsDatas" :key="item.uid" >
				<image class="goods_item--cover" :src="item.imgCover" @click="toDetail(item.uid)"></image>
					<view class="goods_info">
						<view class="goods_title" @click="toDetail(item.uid)">{{item.title}} {{categoryUid}}</view>
						<view class="color_awark goods_price" @click="toDetail(item.uid)">{{item.priceNow}}</view>
                        <uni-icons type="heart"  size="20" @click.stop="onAddCart(item)"/>
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
				categoryUid:2
			}
		},
		mounted(){
			this.getCategoryData()
			this.getGoodsDatas('糖果')
		},
		methods: {
			getCategoryData(){
                let a = uni.getStorageSync('sessionId')
                console.log('aaa',a)
				uni.request({
				    url: `${this.$baseApiUrl}category/all`,
                    header:{'sessionId':a},
				    complete: (res)=> {
						this.categoryData = res.data.data.slice(1)
						this.categoryItems = res.data.data.map(item => item.title).slice(1)
					}
				});
			},
			getGoodsDatas(){
				uni.showLoading({  
				    title: '加载中'  
				});
				uni.request({
				    url: `${this.$baseApiUrl}product/all?pageNum=0&categoryUid=${this.categoryUid}`,
				    complete: (res)=> {
						this.goodsDatas = res.data.data
						uni.hideLoading();  
					}
				});
				
			},
			onClickItem(val){
				this.categoryData.map((item,index) => {
					if(index == val.currentIndex){
						this.categoryUid = item.uid
						this.getGoodsDatas()
					}
				})
			},
            async onAddCart(item) {
                uni.showLoading({
                    title: '加载中'  
                });
                uni.request({
                    url: `${this.$baseApiUrl}cart/add`,
                    header:{sessionId:uni.getStorageSync('sessionId')}, 
                    method:"POST",
                    data:{
                      productId:item.uid  
                    },
                    complete: (res)=> {
                        if(res.data.code == 200){
                            uni.showToast({
                                title: '添加成功',
                                duration: 2000
                            });
                        }else{
                            uni.showToast({
                                icon:'none',
                                title: res.data.msg,
                                duration: 5000
                            });
                        }
                		uni.hideLoading();  
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
