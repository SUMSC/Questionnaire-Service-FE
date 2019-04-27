import axios from "axios";
import jwt from "jsonwebtoken";
import * as types from "./mutation-types";
import * as queries from "../utils/queries";
import * as mutations from "../utils/db_mutations";
import * as auth from "../utils/auth";
import {search_api, update_api, insert_api, delete_api, select_api} from "../utils/resource";
import {log, debug, warn, error} from "../utils/lib";

const answerTarget = target =>
    target === 'event' ? 'participate' :
        target === 'qnaire' ? 'answer' :
            target === 'anonymousQnaire' ? 'anonymousAnswer' : "";

const columnTarget = target =>
    /qnaire/.test(target) ? 'qnaire_id' : 'event_id';

export default {
    async login(context, {id, password}) {

        log("User Login");
        // 获取 JSON Web Token
        let webToken = await auth.userLogin(id, password).then(res => res['data']);
        if (webToken['ok'] && auth.verify(webToken['message'])) {
            context.commit(types.UPDATE_AUTH_TOKEN, webToken['message']);
            // 从 JWT 中获取一部分用户信息
            const payload = jwt.decode(webToken['message']);
            const updateUserInfo = userInfo => {
                log(`Update User`, userInfo);
                userInfo = userInfo['data'];
                context.commit(types.UPDATE_USER, {
                    ...userInfo,
                    usertype: payload['usertype']
                });
                context.commit(types.UPDATE_MY_ANONYMOUS_QNAIRE, userInfo['my_anonymous_qnaire']);
                context.commit(types.UPDATE_MY_EVENT, userInfo['my_event']);
                context.commit(types.UPDATE_MY_PARTICIPATE, userInfo['my_participation']);
                context.commit(types.UPDATE_MY_ANSWER, userInfo['my_answer']);
                context.commit(types.UPDATE_MY_QNAIRE, userInfo['my_qnaire']);
            };
            // 尝试 GET UserInfo
            select_api('user', {
                "id_tag": payload['id']
            }).then(updateUserInfo).catch(err => {
                // 用户不存在时，创建新的用户
                insert_api('user', {
                    "id_tag": payload['id'],
                    "name": payload['name']
                }).then(updateUserInfo).catch(err => {
                    warn(`Create Failed, Login Failed`, err);
                });
            }).then(() => {
                context.commit(types.SHOW_LOGIN_SHEET, false);
            });
        } else {
            // 登录失败
            warn("Login Failed");
            context.commit(types.SHOW_LOGIN_SHEET, false);
        }

    },
    // 获取我参加的活动
    async getMyParticipate(context) {
        log(`Get My Participate`);
        select_api('participate', {
            'user_id': context.state.id
        }).then(res => {
            log('[MyParicipate]', res['data']);
            context.commit(types.UPDATE_MY_PARTICIPATE, res['data']);
        }).catch(err => {
            warn('[MyParicipate]', err);
        });
    },
    // 获取我创建的活动
    async getMyEvent(context) {
        log(`Get My Event`);
        select_api('event', {
            'creator_id': context.state.id
        }).then(res => {
            log('[MyEvent]', res['data']);
            context.commit(types.UPDATE_MY_EVENT, res['data']);
        }).catch(err => {
            warn('[MyEvent]', err);
        });
    },
    async getCurrentInfo(context, {target, id}) {
        log(`Get Current Info`);
        await select_api(target, {id}).then(res => {
            context.commit(types.UPDATE_CURRENT_INFO, res['data'][0]);
        }).catch(err => {
            warn('[UpdateInfo]', err);
        })
    },
    async getCurrentAnswer(context, {target, id}) {
        log(`Get Current Answer`);
        const modelTarget = answerTarget(target);
        const idTarget = columnTarget(target);
        const answer = await select_api(modelTarget, {
            user_id: context.state.id,
            [idTarget]: id
        }).then(res => {
            context.commit(types.INIT_ANSWER, JSON.parse(res['data'][0]['answer']));
        })
    },
    async submitAnswer(context, {target, id, op}) {
        const modelTarget = answerTarget(target); // 判断是问卷、匿名问卷还是活动
        const idTarget = columnTarget(target);  //
        (op === 'stranger' ? insert_api : update_api)(modelTarget, {
            user_id: context.state.id,
            [idTarget]: id,
            answer: context.state.currentAnswer
        }).then(res => {
            log(res)
        }).catch(err => warn(err));
    },
    // async submitAnswer(context, {target, id, op}) {
    //     log(`Submit Answer`);
    //     target = answerTarget(target);
    //     const options = {
    //         data: {
    //             query: mutations[target](op)(`answer`),
    //             variables: {
    //                 userId: context.state.id,
    //                 id: id,
    //                 answer: JSON.stringify(context.state.currentAnswer)
    //             }
    //         }
    //     };
    //     api(options).then(res => {
    //         res = res['data']['data'];
    //         log(`POST My Answer`, res);
    //     }).catch(err => {
    //         warn(err);
    //     })
    // }
}