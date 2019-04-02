import * as crypto from "crypto";
import * as request from "request-promise";
import * as types from "./mutation-types";


export default {
    async login(context, {id, password}) {
        const hash = crypto.createHash('md5');
        hash.update(password);
        const token = hash.digest('hex');
        const options = {
            url: 'http://192.168.2.169:8000',
            qs: {
                id,
                token
            },
            json: true
        };
        await request(options).then(res => {
            console.log('Login:',res);
            if (res.status === 'ok') {
                context.commit({
                    type: types.UPDATE_USER,
                    ...res['data']
                });
            }
        }).catch(err => {
            console.log(err);
        });
        context.commit(types.SHOW_LOGIN_SHEET, false);
    }
}