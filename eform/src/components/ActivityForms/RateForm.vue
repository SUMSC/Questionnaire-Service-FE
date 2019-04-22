<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-rate class="rate" v-model="answer" :count="count" />
    </van-cell-group>
</template>

<script>
    export default {
        name: "RateForm",
        data() {
            return {
                answer: 1
            }
        },
        props: ['required', 'label', 'remark', 'index', 'count']
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