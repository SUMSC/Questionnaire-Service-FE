<template>
    <div class="page">
        <div class="info-page">
            <h1 class="title">{{info.name}}</h1>
            <van-row type="flex" justify="center">
                <van-col class="tags" span="16">
                    <van-tag
                            class="tag"
                            v-for="(tag, index) in tagList"
                            type="primary"
                            size="medium"
                            :key="index"
                    >
                        {{tag}}
                    </van-tag>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col class="detail" span="20">
                    <p>{{info.detail}}</p>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col class="time-block" span="20">
                    <p>
                        <b>活动开始时间：</b>
                    </p>
                    <p>
                        <span>{{timeFormat(info.start_time || info.creator_name)}}</span>
                    </p>
                    <p>
                        <b>报名截止时间：</b>
                    </p>
                    <p>
                        <span>{{timeFormat(info.deadline)}}</span>
                    </p>
                </van-col>
            </van-row>

            <div class="join-event" v-if="info._active">
                <van-button
                        v-if=""
                        size="large"
                        type="info"
                        @click="editAnswer"
                >{{relationship === 'stranger'?'参与活动':'修改我的报名表'}}</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {log, warn, timeFormat} from "../../utils/lib";
    import * as types from "../../store/mutation-types";

    export default {
        name: "ActivityInfo",
        computed: {
            // 判断与当前活动有什么关系
            info() {
                return this.$store.state.currentInfo;
            },
            tagList() {
                return [`创建者：${this.info.creator?this.info.creator.name:""}`];
            }
        },
        data() {
            return {
                relationship: "stranger"
            }
        },
        watch: {
            relationship: function(to, from) {
                if (to === 'participant') {
                    this.$store.dispatch({
                        type: "getCurrentAnswer",
                        target: this.target,
                        id: this.id
                    })
                } else {
                    this.$store.commit(types.INIT_ANSWER, {});
                }
            },
            info: function(to, from) {
                if (this.$store.state.id === to.creator_id)
                    this.relationship = 'owner';
                else if (to.participant && to.participant.filter(
                    item => item.user_id === this.$store.state.id
                ).length !== 0)
                    this.relationship = 'participant';
            }
        },
        props: ['target', 'id'],
        methods: {
            editAnswer() {
                this.$router.push({name: 'activity-form', query: {
                    id: this.info.id,
                    target: 'event',
                    op: this.relationship
                }});
            },
            timeFormat
        },
        async beforeMount() {
            this.$store.dispatch({
                type: 'getCurrentInfo',
                target: this.target,
                id: this.id
            });
        }
    }
</script>

<style scoped>
    .title {
        text-align: center;
        padding: 1rem;
        font-size: 24px;
    }

    .tags {
        text-align: center;
    }

    .tag {
        margin-left: 0.2rem;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
    }

    .info-page {

    }

    .detail {
        margin-top: 1rem;
        padding: 1rem 1.5rem 1rem 1.5rem;
        line-height: 1.5rem;
        border-style: solid;
        border-color: #DCDFE6 white #DCDFE6 white;
        border-width: 1px;
        background-color: #F2F6FC;
        color: #606266;
        font-size: 14px;
    }

    .time-block {
        color: #606266;
        margin: 1.5rem;
        padding: 1rem;
        background-color: #d9ecff;
        border-color: #a0cfff white #a0cfff white;
        border-style: solid;
        border-width: 1px;
    }

    .time-block p {
        margin-bottom: 0.5rem;
    }

    .join-event {
        position: fixed;
        width: 100%;
        bottom: 0;
        left: 0;
    }

    .loading {
        display: flex;
        justify-content:center;
        margin: 1rem auto 0 auto;
    }

    .page {
        height: 100%;
        background-color: white;
    }
</style>