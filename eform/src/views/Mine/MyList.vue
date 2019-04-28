<template lang="pug">
    div(class="activity-list" v-if="/event|qnaire/.test(target)")
        van-card(
            v-for="item in listData"
            class="list-item"
            :desc="item.detail"
            :title="item.name"
            @click="clickItem(item.id)"
            :key="item.id")
    div(class="activity-list" v-else)
        van-card(
            v-for="item in listData"
            class="list-item"
            :desc="item[columnName].detail"
            :title="item[columnName].name"
            @click="clickItem(item[columnName].id)"
            :key="item[columnName].id")
</template>

<script>
    import * as types from "../../store/mutation-types";
    import {log} from "@/utils/lib";

    const firstUpper = word => word.split("_").map(s => s.charAt(0).toUpperCase() + s.slice(1)).join("");

    export default {
        name: "MyList",
        props: ['target'],
        computed: {
            listData() {
                return this.$store.state[`my${firstUpper(this.target)}`]
            },
            columnName() {
                if (this.target === 'participate') return 'event';
                if (this.target === 'answer') return 'qnaire';
                return 'anonymous_qnaire';
            }
        },
        created() {
            this.$store.dispatch('getMyBackref', this.target);
        },
        methods: {
            clickItem(id) {
                this.$router.push({name: 'activity-info', query: {target: this.target, id}})
            },

        }
    }
</script>

<style scoped>
    .list-item {
        background-color: white;
    }
</style>