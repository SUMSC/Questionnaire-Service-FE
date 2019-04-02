<template>
    <div id="home-content">
        <van-notice-bar mode="closeable" left-icon="volume-o" delay="5" v-if="isNotice">
            {{noticeText}}
        </van-notice-bar>
        <Swipe/>
        <HomeMenu/>
    </div>
</template>

<script>
    import Swipe from "@/components/Swipe/";
    import {mapState} from 'vuex';
    import HomeMenu from "@/components/HomeMenu/";

    export default {
        name: "HomeContent",
        components: {HomeMenu, Swipe},
        computed: {
            ...mapState({
                noticeText: state => state.notice.noticeText,
                isNotice: state => state.notice.isNotice
            }),
        }
    }
</script>

<style>
    #home-content {
        height: 100%;
        overflow: hidden;
    }
</style>