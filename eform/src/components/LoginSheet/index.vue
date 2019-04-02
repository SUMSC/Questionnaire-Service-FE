<template>
    <van-actionsheet v-model="show" title="登录">
        <van-cell-group>
            <van-field
                    v-model="id"
                    required
                    clearable
                    label="学号"
                    placeholder="请输入学号"
            />
            <van-field
                    v-model="password"
                    type="password"
                    label="密码"
                    clearable
                    placeholder="请输入密码"
                    required
            />
        </van-cell-group>
        <van-button size="large" @click="onLogin">登录</van-button>
    </van-actionsheet>
</template>

<script>
    import * as types from '../../store/mutation-types';

    export default {
        name: "index",
        data() {
            return {
                id: '',
                password: ''
            }
        },
        computed: {
            show: {
                get() {
                    return this.$store.state.showLoginSheet;
                },
                set(show) {
                    this.$store.commit(types.SHOW_LOGIN_SHEET, show)
                }
            }
        },
        methods: {
            onLogin() {
                this.$store.dispatch({
                    type: 'login',
                    id: this.id,
                    password: this.password
                })
            }
        }
    }
</script>

<style scoped>

</style>