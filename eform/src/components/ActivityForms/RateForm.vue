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
        computed: {
            answer: {
                get: function() {
                    return this._answer || 5;
                },
                set: function(answer) {
                    this.$store.commit({
                        type: types.UPDATE_CURRENT_ANSWER,
                        index: this.index,
                        answer: answer
                    })
                }
            }
        },
        props: ['required', '_answer', 'label', 'remark', 'index', 'count'],
        created() {
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