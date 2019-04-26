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
    // 获取需要渲染的表单
    // async getForm(context, {target, id}) {
    //     log(`Get Event Form`);
    //     const options = {
    //         data: {
    //             query: queries[target](`form`),
    //             variables: {
    //                 id: id
    //             }
    //         }
    //     };
    //     await api(options).then(res => {
    //         res = JSON.parse(res['data']['data'][target][0]['form']);
    //         log(`This Form`, res);
    //         context.commit(types.UPDATE_CURRENT_FORM, res);
    //     });
    // },
    // async initAnswer(context, {target, op, id}) {
    //     log(`Init Form & Answer`);
    //     if (op === 'edit') {
    //         target = answerTarget(target);
    //         const options = {
    //             data: {
    //                 query: queries[target](`answer`),
    //                 variables: {
    //                     userId: context.state.id,
    //                     id: id
    //                 }
    //             }
    //         };
    //         await api(options).then((res => {
    //             res = JSON.parse(res['data']['data'][target][0]['answer']);
    //             log("This Answer", res);
    //             context.commit({
    //                 type: types.INIT_ANSWER,
    //                 form: res
    //             });
    //         }))
    //     }
    // },
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