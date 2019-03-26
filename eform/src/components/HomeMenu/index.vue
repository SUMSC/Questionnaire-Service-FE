<template>
    <div id="HomeMenu">
        <van-row gutter="20">
            <van-col span="8">
                <div class="menu-item" @click="handleClick('create')">
                    <img class="menu-icon"
                         src="https://picture-1256456369.cos.ap-shanghai.myqcloud.com/%E5%88%9B%E5%BB%BA%E6%B4%BB%E5%8A%A8.png">
                    <p>创建活动</p>
                </div>
            </van-col>
            <van-col span="8">
                <div class="menu-item" @click="handleClick('search')">
                    <img class="menu-icon"
                         src="https://picture-1256456369.cos.ap-shanghai.myqcloud.com/%E5%8A%A0%E5%85%A5%E6%B4%BB%E5%8A%A8.png">
                    <p>加入活动</p>
                </div>
            </van-col>
            <van-col span="8" class="menu-item">
                <div class="menu-item" @click="handleClick('mine')">
                    <img class="menu-icon"
                         src="https://picture-1256456369.cos.ap-shanghai.myqcloud.com/%E6%88%91%E7%9A%84%E6%B4%BB%E5%8A%A8.png">
                    <p>我的活动</p>
                </div>
            </van-col>
        </van-row>
    </div>
</template>

<script>
    import * as types from "../../store/mutation-types"
    import { Dialog } from 'vant';

    export default {
        name: "HomeMenu",
        methods: {
            handleClick(target) {
                if (target === 'create') {
                    Dialog.alert({
                        title: '无法在手机上使用',
                        message: '请使用电脑登录本网站创建项目。'
                    }).then(() => {
                        // on close
                    });
                } else {
                    this.$router.push({name: target});
                }

            }
        }
    }
</script>

<style scoped>
    #HomeMenu {
        margin-top: 1rem;
        padding-top: 1rem;
        padding-bottom: 1rem;
        text-align: center;
        background-color: #ffffff;
    }

    .menu-icon {
        height: 2.5rem;
    }
</style>