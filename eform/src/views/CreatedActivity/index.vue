<template>
    <div class="activity-list">
        <van-card
                v-for="item in myEvent"
                class="list-item"
                :desc="item.detail"
                :title="item.name"
                @click="clickItem"
                :key="item.id"
        />
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "CreatedActivity",
        computed: {
            ...mapState(['id', 'myEvent'])
        },
        mounted() {
            console.log('Mount Get My Created Event');
            this.$store.dispatch('getMyEvent');
        },
        methods: {
            clickItem() {
                this.$router.push({name: 'activity-info'})
            }
        }
    }
</script>

<style scoped>
    .list-item {
        background-color: white;
    }
</style>