<template lang="pug">
    div(class="activity-list")
        van-card(
            v-for="item in myParticipate"
            class="list-item"
            :desc="item.event.detail"
            :title="item.event.name"
            @click="clickItem(item.event.id)"
            :key="item.id")
</template>

<script>
    import {mapState} from "vuex";
    import * as types from "../../store/mutation-types";
    import {log} from "../../utils/lib";

    export default {
        name: "JoinedActivity",
        computed: {
            ...mapState(['id', 'myParticipate'])
        },
        beforeCreate() {
            this.$store.dispatch('getMyParticipate');
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