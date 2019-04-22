import * as crypto from "crypto";
import axios from "axios";
import * as types from "./mutation-types";
import * as queries from "./queries";
import * as mutations from "./db_mutations";
import jwt from 'jsonwebtoken';

const secret = crypto.createHash('md5').update('sumsc666').digest('hex');

const resource = axios.create({
    baseURL: "http://localhost:8000/",
    method: 'POST'
});

const verify = token => {
    console.log(token);
    try {
        jwt.verify(token, secret);        
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
};

export default {
    async login(context, {id, password}) {
        const hash = crypto.createHash('md5');
        hash.update(password);
        const token = hash.digest('hex');
        const options = {
            method: 'GET',
            url: 'http://192.168.2.169:5000/login/',
            params: {
                id,
                token
            },
            responseType: 'json'
        };
        // TODO: 添加注释及异常处理
        await axios(options).then(async res => {
            if (res['data']['ok'] && verify(res['data']['message'])) {
                console.log(res);
                const userData = jwt.decode(res['data']['message']);
                const options = {
                    data: {
                        query: mutations.createUser(`ok message user {id idTag name}`),
                        variables: {idTag: userData['id'], name: userData['name']}
                    }
                };
                await resource(options).then(async res => {
                    res = res['data']['data']['createUser'];
                    console.log(res);
                    if (res['ok']) {
                        context.commit(types.UPDATE_USER, {...res['user'], usertype: '1'})
                    } else {
                        const options = {
                            data: {
                                query: queries.user(`id idTag name`),
                                variables: {idTag: userData['id']}
                            }
                        };
                        await resource(options).then(res => {
                            res = res['data']['data'];
                            console.log(res);
                            if (res['user'].length !== 0)
                                context.commit(types.UPDATE_USER, {...res['user'][0], usertype: '1'});
                        })
                    }
                });
            } else {
                console.log("Failed");
                // 登录失败
            }
        }).catch(err => {
            console.log(err);
        });
        context.commit(types.SHOW_LOGIN_SHEET, false);
    },
    async getMyParticipate(context) {
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
                'Authorization': context.state.auth_token
            }
        };
        await resource(options).then(res => {
            context.commit(types.UPDATE_MY_PARTICIPATE, res['data']['data']['participate']);
        }).catch(err => {
            console.log(err);
        })
    },
    async getMyEvent(context) {
        const options = {
            data: {
                query: queries.event(
                    `id name detail`
                )
            }
        };
        await resource(options).then(res => {
            console.log(res['data']['data']['event']);
            context.commit(types.UPDATE_MY_EVENT, res['data']['data']['event']);
        }).catch(err => {
            console.log(err);
        })
    }
}