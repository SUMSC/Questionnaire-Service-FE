const Koa = require('koa');

// 注意require('koa-router')返回的是函数:
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const staticServer = require('koa-static');
const moment = require('moment');
const controller = require('./controller');

const app = new Koa();
const router = new Router();
const host = '0.0.0.0';
const port = 8888;

// log request URL:
app.use(async (ctx, next) => {
    console.log(`${moment().format()} Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
});

// add url-route:
app.use(controller());

// add static middleware:
app.use(staticServer(__dirname + '/dist'));

// add router middleware:
app.use(bodyParser());
app.use(router.routes());

app.listen(port, host);
console.log(`\n>>> Koa App started at ${host}:${port}\n`);