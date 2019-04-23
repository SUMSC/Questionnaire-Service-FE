<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
    </van-cell-group>
</template>

<script>
    export default {
        name: "PlainForm",
        data() {
            return {}
        },
        props: ['label', 'remark', 'index']
    }
</script>

<style scoped>

</style>