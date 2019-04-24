<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-picker
                :columns="options"
                @change="onChange"
                :default-index="_answer || 1"
        />
    </van-cell-group>
</template>

<script>
    import {log} from "../../utils/lib";
    import * as types from "../../store/mutation-types";

    export default {
        name: "SelectForm",
        props: ['required', '_answer', 'label', 'remark', 'index', 'options'],
        methods: {
            onChange(picker, value, index) {
                this.$store.commit({
                    type: types.UPDATE_CURRENT_ANSWER,
                    index: this.index,
                    answer: value
                })
            }
        },
        mounted() {
            this.$store.commit({
                type: types.UPDATE_CURRENT_ANSWER,
                index: this.index,
                answer: this.options[0]
            })
        }
    }
</script>

<style scoped>

</style>