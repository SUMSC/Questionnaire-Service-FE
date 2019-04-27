<template>
    <van-cell-group :title="`${index+1}、`">
        <van-popup
                v-model="showWarn"
                position="top"
                :overlay="false"
                lazy-render
                close-on-click-overlay
                :lock-scroll="false"
        >
            <p class="warn-message"><b>文件过大，无法上传</b></p>
        </van-popup>
        <van-cell :title="label" :label="remark"/>
        <form method="post" enctype="multipart/form-data">
            <input class="upload" type="file" @change="chooseFile">
        </form>
    </van-cell-group>
</template>

<script>
    import {log, warn} from "../../utils/lib";
    import * as types from "../../store/mutation-types";

    export default {
        name: "UploadForm",
        data() {
            return {
                answer: null,
                showWarn: false
            }
        },
        props: ['required', 'label', 'remark', 'index'],
        methods: {
            chooseFile(event) {
                log(event);
                if (event.target.files[0] && event.target.files[0].size <= 52428800) {
                    this.$store.commit({
                        type: types.UPDATE_CURRENT_ANSWER,
                        index: this.index,
                        answer: event.target.files[0]
                    })
                } else {
                    warn("File is too large.");
                    this.showWarn = true;
                    setInterval(() => {this.showWarn=false}, 3000);
                }
            }
        },
        created() {
            if (!this.$store.state.currentAnswer[this.index]) {
                this.$store.commit({
                    type: types.UPDATE_CURRENT_ANSWER,
                    index: this.index,
                    answer: null
                })
            }
        }
    }
</script>

<style scoped>
    .upload {
        padding: 1rem;
    }
    .warn-message {
        background: #DCDFE6;
        padding: 1rem;
    }
</style>