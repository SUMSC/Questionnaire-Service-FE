<template>
    <div class="search-resule">
        <van-cell-group v-if="inputSearch">
            <van-cell title="搜索活动：" :value="searchText" @click="searchActivity"/>
            <van-cell title="搜索问卷：" :value="searchText" @click="searchQnaire"/>
            <van-cell title="通过邀请码参与：" :value="searchText" @click="searchByToken"/>
        </van-cell-group>
        <div class="activity-list" v-else>
            <van-card
                    v-for="item in searchData"
                    class="list-item"
                    :desc="item._source.detail"
                    :title="item._source.name"
                    @click="clickItem(item._source.id)"
                    :key="item._id"
            />
        </div>
    </div>
</template>

<script>
    import * as types from '../../store/mutation-types'
    import {mapState} from "vuex";
    import {log} from "../../utils/lib";

    export default {
        name: "HomeSearch",
        data() {
            return {
                target: ""
            };
        },
        computed: {
            ...mapState('search', {
                searchText: state => state.searchText,
                inputSearch: state => state.inputSearch,
                searchData: state => state.searchResult
            })
        },
        methods: {
            searchActivity() {
                this.target = "activity";
                this.$store.dispatch({
                    type: "search/doSearch",
                    title: "event"
                });
                this.$store.commit('search/' + types.SEARCH.UPDATE_SEARCH_STATUS, false);
            },
            searchQnaire() {
                this.target = "qnaire";
                this.$store.dispatch({
                    type: "search/doSearch",
                    title: "qnaire"
                });
                this.$store.commit('search/' + types.SEARCH.UPDATE_SEARCH_STATUS, false);
            },
            searchByToken() {
                this.$store.commit('search/' + types.SEARCH.UPDATE_SEARCH_STATUS, false);
            },
            clickItem(id) {
                log(id);
                this.$router.push({name: 'activity-info', params: {eventId: id}})
            }
        }
    }
</script>

<style scoped>
    .search-result {
        overflow-y: scroll;
    }

    .list-item {
        background-color: white;
    }
</style>

