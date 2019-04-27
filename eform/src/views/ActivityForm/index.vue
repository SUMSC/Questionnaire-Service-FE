<template lang="pug">
    div(class="form-body")
        van-popup(
            v-model="showWarn"
            position="top"
            :overlay="false"
            lazy-render
            close-on-click-overlay
            :lock-scroll="false"
        )
            p(class="warn-message")
                van-icon(name="fail" size="1.2rem")/
                span: b 请完成所有题目
        div(v-for="(item, index) in currentForm")
            PlainForm(
                v-if="item.type === 'plain'"
                :key="index"
                v-bind="{...item.data, index}"
            )
            InputForm(
                v-if="item.type === 'input'"
                :key="index"
                v-bind="{...item.data, index}"
            )
            RadioForm(
                v-if="item.type === 'radio'"
                :key="index"
                v-bind="{...item.data, index}"
            )
            SelectForm(
                v-if="item.type === 'select'"
                :key="index"
                v-bind="{...item.data, index}"
            )
            CheckboxForm(
                v-if="item.type === 'checkbox'"
                :key="index"
                v-bind="{...item.data, index}"
            )
            RateForm(
                v-if="item.type === 'rate'"
                :key="index"
                v-bind="{...item.data, index}"
            )
            UploadForm(
                v-if="item.type === 'upload'"
                :key="index"
                v-bind="{...item.data, index}"
            )
        div(class="submit-btn")
            van-button(size="large" type="info" @click="submit") 提交
</template>

<script>
    import {mapState} from "vuex";
    import InputForm from "../../components/ActivityForms/InputForm";
    import RadioForm from "../../components/ActivityForms/RadioForm";
    import SelectForm from "../../components/ActivityForms/SelectForm";
    import CheckboxForm from "../../components/ActivityForms/CheckboxForm";
    import RateForm from "../../components/ActivityForms/RateForm";
    import UploadForm from "../../components/ActivityForms/UploadForm";
    import PlainForm from "../../components/ActivityForms/PlainForm";
    import {log} from "../../utils/lib";
    import Vue from 'vue'

    export default {
        name: "index",
        components: {PlainForm, UploadForm, RateForm, CheckboxForm, SelectForm, RadioForm, InputForm},
        computed: {
            currentForm() {
                let form = JSON.parse(this.$store.state.currentInfo.form || "{}");
                let answer = this.$store.state.currentAnswer;
                log(form, answer);
                for (let i in answer) {
                    Vue.set(form[i]['data'], '_answer', answer[i]);
                }
                return form;
            },
        },
        data() {
            return {
                showWarn: false
            }
        },
        props: ['target', 'id', 'relationship'],
        methods: {
            submit() {
                const answer = this.$store.state.currentAnswer;
                let sth_null = false;
                for (let i in answer) {
                    const formItem = this.currentForm[i];
                    if (formItem.data.required) {
                        if (formItem.type === 'input' ||
                            formItem.type === 'radio' ||
                            formItem.type === 'checkbox') {
                            if (answer[i].length === 0) {
                                sth_null = true;
                                break;
                            }
                        } else if (formItem.type === 'upload') {
                            if (!answer[i]) {
                                sth_null = true;
                                break;
                            }
                        }
                    }
                }
                if (sth_null) {
                    this.showWarn = true;
                    setInterval(() => {this.showWarn=false}, 3000);
                } else {
                    // TODO: 添加上传文件功能
                    this.$store.dispatch({
                        type: "submitAnswer",
                        target: this.target,
                        id: this.id,
                        op: this.relationship
                    })
                }
            }
        }
    }
</script>

<style scoped>
    .form-body {
        margin-bottom: 5rem;
    }

    .submit-btn {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    .warn-message {
        background: #FFFFFF;
        color: #E6A23C;
        padding: 1rem;
        display: flex;
    }
</style>