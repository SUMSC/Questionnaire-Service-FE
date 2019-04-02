<template>
    <van-field
            v-model="value"
            type="password"
            label="密码"
            placeholder="请输入密码"
            required
    />
</template>

<script>
    export default {
        name: "PasswordForm",
        data() {
            return {
                value: ''
            }
        }
    }
</script>

<style scoped>

</style>