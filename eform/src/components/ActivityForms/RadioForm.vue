<template>
    <van-radio-group v-model="answer">
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-cell
                v-for="(item, index) in options"
                :key="index"
                :title="item"
                clickable @click="answer = item"
        >
            <van-radio :name="item" />
        </van-cell>
    </van-cell-group>
    </van-radio-group>
</template>

<script>
    import {log} from "../../utils/lib";
    import * as types from "../../store/mutation-types";

    export default {
        name: "RadioForm",
        computed: {
            answer: {
                get: function() {
                    return this._answer || "";
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
        props: ['required', '_answer', 'label', 'remark', 'index', 'options'],
        created() {
            this.$store.commit({
                type: types.UPDATE_CURRENT_ANSWER,
                index: this.index,
                answer: ""
            })
        }
    }
</script>

<style scoped>

</style>