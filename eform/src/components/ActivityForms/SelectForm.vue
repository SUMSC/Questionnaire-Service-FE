<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-picker
                :columns="options"
                @change="onChange"
        />
    </van-cell-group>
</template>

<script>
    export default {
        name: "SelectForm",
        data() {
            return {
                answer: ""
            }
        },
        props: ['required', 'label', 'remark', 'index', 'options'],
        methods: {
            onChange(picker, value, index) {

            }
        }
    }
</script>

<style scoped>

</style>