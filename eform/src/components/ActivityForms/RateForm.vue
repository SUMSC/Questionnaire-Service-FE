<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-rate class="rate" v-model="answer" :count="count" />
    </van-cell-group>
</template>

<script>
    import {log} from "../../utils/lib";
    import * as types from "../../store/mutation-types";

    export default {
        name: "RateForm",
        data() {
            return {
                answer: this._answer || 5,
            }
        },
        watch: {
            answer(to, from) {
                this.$store.commit({
                    type: types.UPDATE_CURRENT_ANSWER,
                    index: this.index,
                    answer: to
                })
            }
        },
        props: ['required', '_answer', 'label', 'remark', 'index', 'count'],
        mounted() {
            this.$store.commit({
                type: types.UPDATE_CURRENT_ANSWER,
                index: this.index,
                answer: this.count
            })
        }
    }
</script>

<style scoped>
    .rate {
        padding-top: 10px;
        padding-bottom: 10px;
        background-color: #fff;
    }
    .van-rate {
        margin-left: 15px;
    }
</style>