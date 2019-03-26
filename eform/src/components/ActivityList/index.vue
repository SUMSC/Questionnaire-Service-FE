<template>
    <div class="activity-list">
        <van-card
                class="list-item"
                desc="描述信息"
                title="活动一"
                @click="clickItem"
        />
    </div>
</template>

<script>
    export default {
        name: "ActivityList",
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