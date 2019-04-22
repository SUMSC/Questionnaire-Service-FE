import axios from "axios";
import jwt from "jsonwebtoken";
import * as types from "./mutation-types";
import * as queries from "../utils/queries";
import * as mutations from "../utils/db_mutations";
import * as auth from "../utils/auth";
import {api, search_api} from "../utils/resource";
import {log, debug, warn, error} from "../utils/lib";


export default {
    async login(context, {id, password}) {
        log("User Login");
        // 获取 JSON Web Token
        const webToken = await auth.userLogin(id, hashSeed(password, 'md5'))['data'];
        if (webToken['ok'] && auth.verify(webToken['message'])) {
            context.commit(types.UPDATE_AUTH_TOKEN, webToken['message']);
            const userData = jwt.decode(webToken['message']);
            let res = await api({
                data: {
                    query: mutations.createUser(`id idTag name`),
                    variables: {idTag: userData['id'], name: userData['name']}
                }
            })['data']['data']['createUser'];
            // 创建用户
            if (res['ok']) {
                log(`Create Success, Update User: ${res['user']['name']}`);
                context.commit(types.UPDATE_USER, {...res['user'], usertype: userData['usertype']});
            } else {
                // 失败则获取已存在的用户 ID
                res = await api({
                    data: {
                        query: queries.user(`id idTag name`),
                        variables: {idTag: userData['id']}
                    }
                })['data']['data'];
                if (res['user'].length !== 0) {
                    log(`Create Failed, Update User: ${res['user'][0]['name']}`);
                    context.commit(types.UPDATE_USER, {...res['user'][0], usertype: userData['userType']});
                } else {
                    warn(`No Such User, Login Failed`);
                }
            }
        } else {
            warn("Login Failed");
            // 登录失败
        }
        context.commit(types.SHOW_LOGIN_SHEET, false);
    },
    // 获取我参加的活动
    async getMyParticipate(context) {
        log(`Get My Participate`);
        const options = {
            data: {
                query: queries.participate(
                    `event {id name detail Active}`
                ),
                variables: {
                    id: context.state.id
                }
            },
            responseType: 'json',
            headers: {
                'Authorization': context.state.authToken
            }
        };
        api(options).then(res => {
            log(res['data']['data']['participate']);
            context.commit(types.UPDATE_MY_PARTICIPATE, res['data']['data']['participate']);
        }).catch(err => {
            error(err);
        });
    },
    // 获取我创建的活动
    async getMyEvent(context) {
        log(`Get My Event`);
        const options = {
            data: {
                query: queries.event(
                    `id name detail Active`
                ),
                variables: {
                    userId: context.state.id
                }
            },
            responseType: 'json',
            headers: {
                'Authorization': context.state.authToken
            }
        };
        api(options).then(res => {
            log(res['data']['data']['event']);
            context.commit(types.UPDATE_MY_EVENT, res['data']['data']['event']);
        }).catch(err => {
            error(err);
        })
    },
    async getForm(context, {target, id}) {
        log(`Get Event Form`);
        const options = {
            data: {
                query: queries[target](`form`),
                variables: {
                    id: id
                },
                responseType: 'json',
                headers: {
                    'Authorization': context.state.authToken
                }
            };
            api(options).then(res => {
                log(res['data']['data']['event']);
                context.commit(types.UPDATE_CURRENT_FORM, res['data']['data']['event']);
            })
        }
    }
}