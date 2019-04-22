<template>
    <div class="activity-list">
        <van-card
                v-for="item in [title]"
                class="list-item"
                desc="item.event.detail"
                title="item.event.name"
                @click="clickItem"
                key="item.event.id"
        />
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    export default {
        name: "ActivityList",
        props: {
            title: String
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