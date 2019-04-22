<template>
    <div id="app">
        <van-nav-bar
                v-if="!mainPage"
                :title="title"
                left-text="返回"
                left-arrow
                @click-left="goBack"
        >
        </van-nav-bar>
        <router-view/>
        <Tabbar v-if="mainPage"/>
    </div>
</template>

<script>
    import Tabbar from "./components/Tabbar/";
    import {mapState} from "vuex";

    export default {
        name: "App",
        components: {Tabbar},
        computed: {
            ...mapState(['mainPage']),
            title() {
                return this.$route.meta.title;
            }
        },
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style>
    #app {
        font-family: '等线', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        height: 100%;
    }


</style>
