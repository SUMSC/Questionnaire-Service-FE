<template>
    <van-field
            v-model="message"
            type="textarea"
            :placeholder="placeholder||'请输入留言'"
            rows="1"
            :required="required"
            clearable
            :label="label"
            autosize
    />
</template>

<script>
    export default {
        name: "TextForm",
        props: ['placeholder']
    }
</script>

<style scoped>

</style>