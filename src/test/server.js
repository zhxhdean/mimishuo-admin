const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const app = new koa();

const router = require('./router');

// 跨域
app.use(cors({
  origin: (ctx) => {
    //返回客户端host
    return 'http://localhost:8181'
  },
  credentials: true,
  allowMethods: [
    'GET', 'POST', 'DELETE', 'OPTIONS'
  ],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'clientid', 'sessionid', 'token']
}));

// 接受post数据
app.use(bodyParser());

// 路由
router(app);

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000');
});
