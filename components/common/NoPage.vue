<template>
    <view class="content" >
        <image src="../../static/image/github.png" />
        <p @click="onHome">{{ title }}</p>
    </view>
</template>
<script>
export default {
    props: { title: String },
    data() {
        return {
            toLogin: false
        };
    },
    components: {
    },
    methods: {

    }
};
</script>
<style lang="less" scoped>
.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: 100%;
}

image {
    text-align: center;
    margin: 60rpx 0;
    width: 200rpx;
    height: 200rpx;
}

.to_login {
    margin-top: 20rpx;
}
</style>
