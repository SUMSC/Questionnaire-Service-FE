<template>
    <div id="home">
        <form action="/" @submit.prevent class="search-form">
            <van-search
                    v-model="searchText"
                    placeholder="输入关键字或邀请码"
                    show-action
                    @search="onSearch"
                    @cancel="onCancel"
                    @click="onFocusSearch"
            />
        </form>
        <div class="home-content">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/mutation-types'

    export default {
        name: "Home",
        computed: {
            searchText: {
                get() {
                    return this.$store.state.search.searchText;
                },
                set(searchText) {
                    this.$store.commit(types.SEARCH.UPDATE_SEARCH_TEXT, searchText);
                }
            }
        },
        methods: {
            onSearch() {
                this.$store.commit(types.SEARCH.UPDATE_SEARCH_STATUS, false);
            },
            onCancel() {
                this.$router.push({name: 'home'});
            },
            onFocusSearch() {
                this.$router.push({name: 'search'});
                this.$store.commit(types.SEARCH.UPDATE_SEARCH_STATUS, true);
            }
        },
        mounted() {
            this.$store.commit(types.SET_ACTIVE_TAB, 0);
        }
    }
</script>

<style>
    #home {
        height: 100%;
        overflow: hidden;
    }

    .search-form {
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
    }

    .home-content {
        margin-top: 3rem;
    }
</style>