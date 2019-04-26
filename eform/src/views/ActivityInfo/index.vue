<template>
    <div class="page">
        <div class="loading" v-if="loading">
            <van-loading/>
        </div>
        <div class="info-page" v-else>
            <h1 class="title">{{title}}</h1>
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
                    <p>{{detail}}</p>
                </van-col>
            </van-row>
            <van-row type="flex" justify="center">
                <van-col class="time-block" span="20">
                    <p>
                        <b>活动开始时间：</b>
                    </p>
                    <p>
                        <span>{{start_time}}</span>
                    </p>
                    <p>
                        <b>报名截止时间：</b>
                    </p>
                    <p>
                        <span>{{deadline}}</span>
                    </p>
                </van-col>
            </van-row>

            <div class="join-event" v-if="active">
                <van-button
                        v-if="relation === 'stranger'"
                        size="large"
                        type="info"
                        @click="joinActivity"
                >参与活动</van-button>
                <van-button
                        v-else-if="relation === 'participant'"
                        size="large"
                        type="info"
                        @click="editAnswer"
                >修改我的报名表</van-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {getEventById} from "../../utils/resource";
    import {log, timeFormat} from "../../utils/lib";

    export default {
        name: "ActivityInfo",
        computed: {
            // 判断与当前活动有什么关系
            relation() {
                const owner = this.$store.state.myEvent.filter(
                    item => item.id === this.$route.params.eventId
                ).length !== 0;
                const participant = this.$store.state.myParticipate.filter(
                    item => item.event.id === this.$route.params.eventId
                ).length !== 0;
                if (owner) {
                    return 'owner';
                } else if (participant){
                    return 'participant';
                } else
                    return 'stranger';
            }
        },
        data() {
            return {
                title: this.data['name'],
                tagList: [`创建者：${this.data['creator']['name']}`],
                detail: this.data['detail'],
                start_time: timeFormat(this.data['start_time']),
                deadline: timeFormat(this.data['deadline']),
                active: this.data['_active']
            }
        },
        methods: {
            joinActivity() {
                this.$router.push({name: 'activity-form', query: {
                    id: this.$route.params.eventId,
                    op: 'init',
                    target: 'event'
                }});
            },
            editAnswer() {
                this.$router.push({name: 'activity-form', query: {
                    id: this.$route.params.eventId,
                    op: 'edit',
                    target: 'event'
                }});
            }
        },
        props: ['data'],
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