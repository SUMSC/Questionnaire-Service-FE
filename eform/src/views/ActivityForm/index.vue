<template>
    <div class="form-body">
        <van-popup
                v-model="showWarn"
                position="top"
                :overlay="false"
                lazy-render
                close-on-click-overlay
                :lock-scroll="false"
        >
            <p class="warn-message">
                <van-icon name="fail" size="1.2rem" />
                <span><b>
                    请完成所有题目
                </b></span>
            </p>
        </van-popup>
        <div v-for="(item, index) in currentForm.form">
            <PlainForm
                    v-if="item.type === 'plain'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
            <InputForm
                    v-if="item.type === 'input'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
            <RadioForm
                    v-if="item.type === 'radio'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
            <SelectForm
                    v-if="item.type === 'select'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
            <CheckboxForm
                    v-if="item.type === 'checkbox'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
            <RateForm
                    v-if="item.type === 'rate'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
            <UploadForm
                    v-if="item.type === 'upload'"
                    :key="index"
                    v-bind="{...item.data, index}"
            />
        </div>
        <div class="submit-btn">
            <van-button size="large" type="info" @click="submit">提交</van-button>
        </div>
    </div>
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

    export default {
        name: "index",
        components: {PlainForm, UploadForm, RateForm, CheckboxForm, SelectForm, RadioForm, InputForm},
        computed: {
            // ...mapState(['currentForm'])
        },
        data() {
            return {
                currentForm: {
                    type: 'standard',
                    form: [
                        {
                            type: "plain",
                            data: {
                                "label": "测试文本描述",
                                "remark": "这是备注"
                            }
                        },
                        {
                            type: "input",
                            data: {
                                "label": "测试文本题",
                                "validator": "email",
                                "remark": "这是备注",
                                "required": true
                            }
                        },
                        {
                            type: "radio",
                            data: {
                                "label": "测试单选题",
                                "options": ["选项1", "选项2", "选项3"],
                                "remark": "这是备注",
                                "required": true
                            }
                        },
                        {
                            type: "select",
                            data: {
                                "label": "测试下拉题",
                                "options": ["选项1", "选项2", "选项3", "选项4", "选项5"],
                                "remark": "这是备注",
                                "required": true
                            }
                        },
                        {
                            type: "checkbox",
                            data: {
                                "label": "测试多选题",
                                "remark": "这是备注",
                                "options": ["选项1", "选项2", "选项3"],
                                "maxChoose": 0,
                                "other": true,
                                "required": true
                            }
                        },
                        {
                            "type": "rate",
                            "data": {
                                "label": "测试评分题",
                                "remark": "这是备注",
                                "count": 5,
                                "required": true
                            }
                        },
                        {
                            "type": "upload",
                            "data": {
                                "label": "测试上传",
                                "remark": "这是备注",
                                "required": true
                            }
                        }
                    ]
                },
                showWarn: false
            }
        },
        mounted() {
            this.$store.dispatch({
                type: 'getForm',
                target: 'event',
                id: this.$route.params.eventId
            });
        },
        methods: {
            submit() {
                const answer = this.$store.state.currentAnswer.form;
                log(answer);
                let sth_null = false;
                for (let i in answer) {
                    const formItem = this.currentForm.form[i];
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