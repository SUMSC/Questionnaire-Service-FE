<template lang="pug">
    div(class="activity-list")
        van-card(
            v-for="item in myEvent"
            class="list-item"
            :desc="item.detail"
            :title="item.name"
            @click="clickItem(item.id)"
            :key="item.id")
</template>

<script>
    import {mapState} from "vuex";
    import * as types from "../../store/mutation-types";
    import {log} from "@/utils/lib";

    export default {
        name: "CreatedActivity",
        computed: {
            ...mapState(['id', 'myEvent'])
        },
        beforeCreate() {
            this.$store.dispatch('getMyEvent');
        },
        methods: {
            clickItem(id) {
                this.$router.push({name: 'activity-info', query: {target: 'event', id}})
            }
        }
    }
</script>

<style scoped>
    .list-item {
        background-color: white;
    }
</style>