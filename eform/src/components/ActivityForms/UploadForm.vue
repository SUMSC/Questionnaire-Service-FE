<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <input class="upload" type="file">
    </van-cell-group>
</template>

<script>
    // TODO: 补全并测试此表单
    export default {
        name: "UploadForm",
        data() {
            return {
                answer: ""
            }
        },
        props: ['required', 'label', 'remark', 'index']
    }
</script>

<style scoped>
    .upload {
        padding: 1rem;
    }
</style>