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
            target === 'anonymousQnaire' ? 'anonymousAnswer' : target;

const foreignTarget = target =>
    target === 'participate' ? 'event':
        target === 'anonymous_answer'? 'anonymous_qnaire':
            target === 'answer'? "qnaire": target;

const columnTarget = target =>
    /qnaire/.test(target) ? 'qnaire_id' : 'event_id';

const ownershipTarget = target =>
    /event|qnaire/.test(target) ? 'creator_id': 'user_id';

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
    async getMyBackref(context, target) {
        log(`Get My ${target}`);
        select_api(target, {
            [ownershipTarget(target)]: context.state.id
        }).then(res => {
            log(`[My ${target}]`, res['data']);
            context.commit(types[`UPDATE_MY_${target.toUpperCase()}`], res['data']);
        }).catch(err => {
            warn(`[My ${target}]`, err);
        });
    },
    async getCurrentInfo(context, {target, id}) {
        log(`Get Current Info: ${target}`);
        await select_api(foreignTarget(target), {id}).then(res => {
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
}