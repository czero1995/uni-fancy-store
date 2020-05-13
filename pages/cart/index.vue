<template>
        <view>
            <uni-swipe-action v-if="cartsData.length > 0">
            	<uni-swipe-action-item v-for="(cartItem, cartIndex) in cartsData" :options="options" :key="cartIndex"  @click="swipeClick(cartItem,cartIndex)">
            		<view class="flex_center cart_item">
            		    <label class="radio">
            		    	<radio :value="cartItem.goodsRadio" :checked="cartItem.goodsRadio" color="#FFCC33"  style="transform: scale(0.7);" @click="onGoodsRadio(cartItem)"/>
            		    </label>
            		    <image class="goods-img" :src="cartItem.productItems.imgCover" @click.stop="toDetail(cartItem.productId)" />
            		    <view class="goods-textBox" >
            		        <view class="product_title" @click.stop="toDetail(cartItem.uid)" >{{ cartItem.productItems.title }}</view>
            		        <view class="goodsOp flex_center">
            		            <uni-icons type="minus"  size="20" @click.stop="onCutCart(cartItem)"/>
            		            <input class="w100" type="number" :value="cartItem.num" />
            		            <uni-icons type="plus"  size="20" @click.stop="onAddCart(cartItem)"/>
            		        </view>
            		        <view class="color_awark goods_price" >{{ cartItem.productItems.priceNow }}</view>
            		    </view>
            		</view>
            	</uni-swipe-action-item>
            </uni-swipe-action>
              <!--  <view class="cart-item flex_between" :class="{ selected: itemIndex === cartIndex }" v-for="(cartItem, cartIndex) in cartsData" :key="cartIndex">
                    <view class="flex_center overflow_hidden">
                        <label class="radio">
                        	<radio :value="cartItem.goodsRadio" :checked="cartItem.goodsRadio" color="#FFCC33"  style="transform: scale(0.7);" @click="onGoodsRadio(cartItem)"/>
                        </label>
                        <image class="goods-img" :src="cartItem.productItems.imgCover" @click.stop="toDetail(cartItem.uid)" />
                        <view class="goods-textBox" >
                            <view class="product_title" @click.stop="toDetail(cartItem.uid)" >{{ cartItem.productItems.title }}</view>
                            <view class="goodsOp flex_center">
                                <uni-icons type="minus"  size="20" @click.stop="onCutCart(cartItem)"/>
                                <input class="w100" type="number" :value="cartItem.num" />
                                <uni-icons type="plus"  size="20" @click.stop="onAddCart(cartItem)"/>
                            </view>
                            <view class="color_awark goods_price" >{{ cartItem.productItems.priceNow }}</view>
                        </view>
                    </view>
                </view>
            </view> -->
             <NoPage v-else ref="nopage" :title="title"></NoPage>
        </view>
</template>

<script>
import { mapMutations } from "vuex";
import NoPage from "@/components/common/NoPage";
import uniSection from '@/components/uni-section/uni-section.vue'
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
export default {
    data() {
        return {
            goodsRadioAll: false,
            allCoach: 0,
            radioArr: [],
            itemIndex: "",
            cartsData: [],
            checked: true,
            showEdit: false,
            title:'用户未登陆',
            options: [{
            	text: '删除',
            	style: {
            		backgroundColor: 'rgb(255,58,49)'
            	}
            }],
        };
    },
    components: {
        uniSection,
        uniSwipeAction,
        uniSwipeActionItem,
        NoPage,
    },
    onShow() {
        this.getCart();
    },
    mounted() {},
    methods: {
        async getCart() {
            uni.showLoading({
                title: '加载中'  
            });
            
            uni.request({
                url: `${this.$baseApiUrl}cart/all`,
                header:{sessionId:uni.getStorageSync('sessionId')}, 
                complete: (res)=> {
                    if(res.data.code == 0){
                        this.cartsData = res.data.data
                        if (this.cartsData.length == 0) {
                            this.title = "购物车为空";
                        } else {
                            this.cartsData.map(item => {
                                typeof item.goodsRadio == "undefined" && this.$set(item, "goodsRadio", false);
                            });
                        }
                    }else{
                        this.title = '未登陆'
                        this.$store.state.userInfo = {}
                    }
            		
            		uni.hideLoading();  
            	}
            });
            
        },
        onGoodsRadio(item) {
            item.goodsRadio = !item.goodsRadio
            this.radioArr = [];
            this.cartsData.forEach(itemGoods => {
                this.radioArr.push(itemGoods.goodsRadio);
            });
            this.radioArr.indexOf(false) == -1 ? (this.goodsRadioAll = true) : (this.goodsRadioAll = false);
            this.onCalAllCoach();
        },
        onSelectAll() {
            !this.goodsRadioAll
                ? this.cartsData.forEach(item => {
                      item.goodsRadio = true;
                  })
                : this.cartsData.forEach(item => {
                      item.goodsRadio = false;
                  });
            this.onCalAllCoach();
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
                  productId:item.productId  
                },
                complete: (res)=> {
                    item.num++;
                    this.onCalAllCoach();
            		uni.hideLoading();  
            	}
            });
        },
        async onCutCart(item) {
            if (item.num > 1) {
                uni.request({
                    url: `${this.$baseApiUrl}cart/cut`,
                    header:{sessionId:uni.getStorageSync('sessionId')}, 
                    method:"POST",
                    data:{
                      productId:item.productId  
                    },
                    complete: (res)=> {
                        item.num--;
                        this.onCalAllCoach();
                		uni.hideLoading();  
                	}
                });
            }
        },
        onCalAllCoach() {
            this.allCoach = 0;
            this.cartsData.forEach(item => {
                item.goodsRadio && (this.allCoach += item.num * item.productItems.priceNow);
            });
            this.allCoach = this.allCoach * 100;
        },
        onOrder() {
            let orderArr = [];
            this.cartsData.forEach(item => {
                item.goodsRadio && orderArr.push(item);
            });

            if (!orderArr.length) {
                return Toast.fail(this.$t("m.order.choiceConfirm"));
            }
            this.$router.push({
                path: "orderwait",
                query: {
                    status: "todo"
                }
            });
            this.setOrders(orderArr);
        },
        onEdit() {
            this.showEdit = !this.showEdit;
        },
        toDetail(uid){
        	uni.navigateTo({
        	    url: `/pages/detail/index?uid=${uid}`
        	});
        },
        swipeClick(item,index) {
            uni.showModal({
            	title: '提示',
            	content: '是否删除',
            	success: (res) => {
            		if (res.confirm) {
                        uni.request({
                            url: `${this.$baseApiUrl}cart/delete`,
                            header:{sessionId:uni.getStorageSync('sessionId')}, 
                            method:"POST",
                            data:{
                              productId:item.productId  
                            },
                            complete: (res)=> {
                               this.cartsData.splice(index, 1);
                                uni.hideLoading();  
                        	}
                        });
            			
            		}
            	}
            });
        },
        ...mapMutations({
            setOrders: "SET_ORDERS"
        })
    }
};
</script>

<style lang="less" scoped>

.cart-item {
    border-bottom: 1px solid #cccccc;
    height: 120px;
    padding: 0 10px;
    background: white;
}

.goods-img {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    margin-left: 10px;
}

.goods-coach {
    color: red;
    align-self: flex-end;
}

.goodsOp {
    margin: 20px 0;
    input {
        border: none;
        font-size: 14px;
        text-align: center;
        width: 30px;
    }
}

.cartBottom-detail {
    line-height: 60px;
    font-size: 14px;
    width: 100%;
    position: absolute;
    bottom: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    background: white;
    border-top: 1px solid #ccc;
}

.subminCart {
    padding-right: 20px;
}
.van-submit-bar {
    bottom: 50px;
}
.van-submit-bar__bar {
    padding-left: 10px;
}
.cart_item{
    width:100%;
    border-bottom:1px solid #ccc;
    padding:10rpx 0;
}
</style>
