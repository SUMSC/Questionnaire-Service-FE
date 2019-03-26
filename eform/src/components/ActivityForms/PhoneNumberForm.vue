<template>
    <van-field
            v-model="value"
            label="label||'手机号'"
            :placeholder="placeholder||'请输入手机号'"
            error-message="手机号格式错误"
            :required="required"
            clearable
    />
</template>

<script>
    export default {
        name: "PhoneNumberForm",
        data() {
            return {
                value: ''
            }
        }
    }
</script>

<style scoped>

</style>