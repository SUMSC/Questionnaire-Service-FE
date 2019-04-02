<template>
    <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o" :to="{name:'home'}">首页</van-tabbar-item>
        <van-tabbar-item icon="user-o" :to="{name:'mine'}">我的</van-tabbar-item>
    </van-tabbar>
</template>

<script>
    import * as types from '../../store/mutation-types'

    export default {
        name: "Tabbar",
        data() {
            return {
                discoverIcon: {
                    normal: 'https://picture-1256456369.cos.ap-shanghai.myqcloud.com/%E5%8F%91%E7%8E%B0-%E7%81%B0.png',
                    active: '\thttps://picture-1256456369.cos.ap-shanghai.myqcloud.com/%E5%8F%91%E7%8E%B0-%E8%93%9D.png'
                }
            }
        },
        computed: {
            active: {
                get() {
                    return this.$store.state.activeTab;
                },
                set(activeTab) {
                    this.$store.commit(types.SET_ACTIVE_TAB, activeTab);
                }
            }
        }
    }
</script>

<style scoped>
</style>