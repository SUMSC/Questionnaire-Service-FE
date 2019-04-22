<template>
    <div class="activity-list">
        <van-card
                v-for="item in myParticipate"
                class="list-item"
                :desc="item.event.detail"
                :title="item.event.name"
                @click="clickItem"
                :key="item.id"
        />
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "JoinedActivity",
        computed: {
            ...mapState(['id', 'myParticipate'])
        },
        mounted() {
            console.log('Mount Get My Participate');
            this.$store.dispatch('getMyParticipate');
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