<template>
    <div class="info-page">
        <Swipe/>
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
                    <b>报名开始时间：</b>
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
                <p>
                    <b>活动开始时间：</b>
                </p>
                <p>
                    <span>{{act_start_time}}</span>
                </p>
            </van-col>
        </van-row>

        <div class="join-form">
            <van-button size="large" type="info" @click="joinActivity">参与活动</van-button>
        </div>
    </div>
</template>

<script>
    import Swipe from "@/components/Swipe/";

    export default {
        name: "ActivityInfo",
        components: {Swipe},
        data() {
            return {
                title: '参观微软苏州',
                tagList: ['单人项目', '需要提交附件', '报销路费', '测试Tag', '测试Tag', '测试Tag'],
                detail: '微软“智在未来”实习生计划是为即将毕业的本科、硕士、博士学生量身打造的实习计划旨在帮助在未来一年有全职求职意愿的同学提供了解微软和加入微软（中国及全球）的最佳机会和平台。实习职位涵盖软件开发技术支持等领域。实习生在微软的实习期通常需要达到三个月或以上，形式分全职兼职两种，全职实习生周一至周五工作5天，兼职实习生一周需要保证工作3个工作日以上。我们鼓励同学们在假期进行全职实习，以获得更全面连贯的实习项目经验。',
                start_time: '2019 年 01 月 01 日 08:00',
                deadline: '2019 年 01 月 01 日 08:00',
                act_start_time: '2019 年 01 月 01 日 08:00'
            }
        },
        methods: {
            joinActivity() {
                this.$router.push({name: 'activity-form'});
            }
        }
    }
</script>

<style scoped>
    .title {
        text-align: center;
        margin: 1rem;
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
        background-color: white;
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
</style>