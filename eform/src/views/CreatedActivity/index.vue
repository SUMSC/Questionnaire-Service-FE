<template>
    <div class="activity-list">
        <van-card
                v-for="item in myEvent"
                class="list-item"
                :desc="item.detail"
                :title="item.name"
                @click="clickItem(item.id)"
                :key="item.id"
        />
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {log} from "@/utils/lib";

    export default {
        name: "CreatedActivity",
        computed: {
            ...mapState(['id', 'myEvent'])
        },
        mounted() {
            log('Mount Get My Created Event');
            this.$store.dispatch('getMyEvent');
        },
        methods: {
            clickItem(id) {
                log(id);
                this.$router.push({name: 'activity-info', params: {eventId: id}})
            }
        }
    }
</script>

<style scoped>
    .list-item {
        background-color: white;
    }
</style>