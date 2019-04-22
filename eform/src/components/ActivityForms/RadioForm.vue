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
    export default {
        name: "RadioForm",
        data() {
            return {
                answer: 1
            }
        },
        props: ['required', 'label', 'remark', 'index', 'options']
    }
</script>

<style scoped>

</style>