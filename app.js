const config = require('./config');
const http = require('http');
const Koa = require('koa');

const PORT = config.PORT;
const app = new Koa();
const webServer = http.createServer(app.callback());

// CORS
const cors = require('@koa/cors');
app.use(cors({
    origin: '*',
    credentials: true,
}))

global.$LOG = require('./plugins/logger');

app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.get('X-Response-Time');
    $LOG.info(`${ctx.method} ${ctx.url} - ${rt}`);
});

app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// Body Parser
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

// Socket
global.$IO = require('./socket')(webServer);

// DB
const connectSequelize = require('./plugins/connectSequelize');
global.$DB = connectSequelize(config.DB, __dirname+'/models', false);

// API_CALL Global regist
global.$API_CALL = require('./lib/API_CALL');

// Router
const autoRouter = require('./plugins/autoRouter');
autoRouter(app, __dirname+'/routes', "/");

app.use( async(ctx) => {
    ctx.body = {
        success: true,
        data : config
    }
})

webServer.listen(PORT, () => {
    $LOG.info(`http://ssoapi.bnb.com:${PORT}`);
});