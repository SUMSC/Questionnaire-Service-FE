<template>
    <div class="search-resule">
        <van-cell-group v-if="inputSearch">
            <van-cell title="搜索活动：" :value="searchText" @click="searchActivity"/>
            <van-cell title="通过邀请码参与：" :value="searchText" @click="searchActivity"/>
        </van-cell-group>
        <ActivityList v-else/>
    </div>
</template>

<script>
    import * as types from '../../store/mutation-types'
    import {mapState} from "vuex";
    import ActivityList from "@/components/ActivityList/";

    export default {
        name: "HomeSearch",
        components: {ActivityList},
        data() {
            return {
                list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8]
            };
        },
        computed: {
            ...mapState({
                searchText: state => state.search.searchText,
                inputSearch: state => state.search.inputSearch
            })
        },
        methods: {
            searchActivity() {
                this.$store.commit(types.SEARCH.UPDATE_SEARCH_STATUS, false);
            }
        }
    }
</script>

<style>
    .search-result {
        overflow-y: scroll;
    }
</style>

