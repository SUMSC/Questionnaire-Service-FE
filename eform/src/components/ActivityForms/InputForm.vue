<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-field
                v-model="answer"
                type="textarea"
                rows="1"
                placeholder="请填写你的答案"
                :required="required"
                clearable
                autosize
        />
    </van-cell-group>
</template>

<script>
    export default {
        name: "InputForm",
        data() {
            return {
                answer: ""
            }
        },
        props: ['required', 'label', 'remark', 'index']
    }
</script>

<style scoped>

</style>