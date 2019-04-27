<template>
    <van-cell-group :title="`${index+1}、`">
        <van-cell :title="label" :label="remark"/>
        <van-field
                v-model.trim="$v.answer.$model"
                type="textarea"
                rows="1"
                placeholder="请填写你的答案"
                :required="required"
                clearable
                autosize
                :error-message="$v.answer.$error?error:''"
        />
    </van-cell-group>
</template>

<script>
    import * as types from "../../store/mutation-types";
    import {requiredIf, email, numeric} from "vuelidate/lib/validators";

    export default {
        name: "InputForm",
        computed: {
            answer: {
                get: function() {
                    return this._answer || "";
                },
                set: function(answer) {
                    this.$store.commit({
                        type: types.UPDATE_CURRENT_ANSWER,
                        index: this.index,
                        answer: answer
                    })
                }
            }
        },
        data() {
            return {
                error:
                    this.validator === "email" ? "邮箱格式错误" :
                        this.require ? "请填写你的答案" : ""
            }
        },
        props: ['required', '_answer', 'label', 'remark', 'index', 'validator'],
        created() {
            if (!this.$store.state.currentAnswer[this.index]) {
                this.$store.commit({
                    type: types.UPDATE_CURRENT_ANSWER,
                    index: this.index,
                    answer: ""
                })
            }
        },
        validations() {
            return {
                answer: {
                    email: this.validator === 'email' ? email : null
                }
            }
        }
    }
</script>

<style scoped>

</style>