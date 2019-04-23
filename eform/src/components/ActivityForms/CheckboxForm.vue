<template>
    <van-checkbox-group v-model="answer" :max="maxChoose">
        <van-cell-group :title="`${index+1}、`" >
            <van-cell :title="label" :label="remark"/>
            <van-cell
                    v-for="(item, index) in options"
                    clickable
                    :key="index"
                    :title="item"
                    @click="toggle(index)"
            >
                <van-checkbox :name="item" ref="checkboxes" />
            </van-cell>
        </van-cell-group>
    </van-checkbox-group>
</template>

<script>
    // TODO: 添加【其他】选项的支持
    import {log} from "../../utils/lib";
    import * as types from "../../store/mutation-types";

    export default {
        name: "CheckboxForm",
        data() {
            return {
                answer: []
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
        props: ['required', 'label', 'remark', 'index', 'options', 'maxChoose', 'other'],
        methods: {
            toggle(index) {
                this.$refs.checkboxes[index].toggle();
            }
        },
        mounted() {
            this.$store.commit({
                type: types.UPDATE_CURRENT_ANSWER,
                index: this.index,
                answer: []
            })
        }
    }
</script>

<style scoped>

</style>