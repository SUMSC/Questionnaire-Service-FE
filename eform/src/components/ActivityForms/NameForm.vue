<template>
    <van-field
            v-model="value"
            :required="required"
            clearable
            :label="label||'姓名'"
            :placeholder="placeholder||'请输入你的姓名'"
    />
</template>

<script>
    export default {
        name: "NameForm",
        props: ['label', 'required', 'placeholder'],
        data() {
            return {
                value: ''
            }
        }
    }
</script>

<style scoped>

</style>