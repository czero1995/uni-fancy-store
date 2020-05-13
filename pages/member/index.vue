<template>
	<view>
		<view class="floor floor_one"> 
			<image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl"/>
            <image v-else src="../../static/image/github.png"/>
            <view v-if="userInfo.nickName" class="color_white mt8">{{userInfo.nickName}}</view>
            <view v-else>
                <button  class="mini-btn"  size="mini" type="primary" open-type="getUserInfo" @getuserinfo="authLogin" withCredentials="true">点击登录</button>
            </view>
		</view>
        <!-- <uni-section title="详细信息" type="line"></uni-section> -->
        <!-- <uni-list> -->
        	<!-- <uni-list-item title="个人信息" /> -->
          <!--  <uni-list-item title="我的订单" />
            <uni-list-item title="我的地址" />
            <uni-list-item title="设置" /> -->
        <!-- </uni-list> -->
    </view>
</template>

<script>
    import {mapGetters,mapMutations} from 'vuex'
    import uniSection from '@/components/uni-section/uni-section.vue'
    import uniList from '@/components/uni-list/uni-list.vue'
    import uniListItem from '@/components/uni-list-item/uni-list-item.vue'
	export default {
        components:{
            uniSection,
            uniList,
            uniListItem
        },
		data() {
			return {
				isLogin:false,
			}
		},
         computed:{
            ...mapGetters(['userInfo'])
         },
       
		mounted(){
            this.checkSession()
		},
        onShow(){
        },
		methods: {
            checkSession(){
                console.log('check')
                uni.checkSession({
                    success:() =>{
                        this.isLogin = true
                    },
                    fail:() => {
                        this.isLogin = false
                    }
                })
            },
			getUserInfo(){
				uni.checkSession({
					success: function(infoRes) {
						console.log('用户昵称为：' + JSON.stringify(infoRes));
					},
					fail:function(res) {
						console.log('fail',res)
					}
				})
			},
			authLogin(auth) {
                uni.login({
                    provider: 'weixin',
                    success: (res) =>  {
                        this.isLogin = true
                        let userInfo = auth.detail.userInfo
                        uni.request({
                            url: `${this.$baseApiUrl}wx/applet/login`,
                            method:'POST',
                            data:{
                                code:res.code,
                                userInfo:{
                                    nickName:userInfo.nickName,
                                    gender:userInfo.gender,
                                    country:userInfo.country,
                                    province: userInfo.province,
                                    city:userInfo.city,
                                    avatarUrl:userInfo.avatarUrl
                                }
                                
                            },
                             complete: (data)=> {
                                 uni.setStorageSync('sessionId', data.data.sessionId);
                                 uni.setStorageSync('userInfo', data.data);
                                 this.setUserInfo(data.data)
                                },
                             
                        });
                        
                    }
                });
            },
            ...mapMutations({
                   setUserInfo: "SET_USER_INFO",
             })
		}
	}
</script>

<style lang="less">
.floor_one {
    width: 100%;
    height: 400rpx;
    background: #6495ed;
    text-align: center;
    image {
        width: 180rpx;
        height: 180rpx;
        border-radius: 50%;
        margin-top: 60rpx;
    }
}
</style>
