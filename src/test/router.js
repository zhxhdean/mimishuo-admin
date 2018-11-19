const router = require('koa-router')();

module.exports = (app) => {
  router.post('/user/login', async(ctx) => {
    const req = ctx.request.body;
    console.log(req)
    ctx.response.body = {
      code: 0
    }
  })

  router.get('/user/status', async(ctx) => {
    ctx.response.body = {
      code: 0,
      data: {
        userName: 'zhxh',
        phone: '13917552082',
        company: '点融信息科技有限公司',
        creditCode: '10001',
        email: 'zhangxiaohu@dianrong.com'
      }
    }
  })

  router.post('/user/logout', async(ctx) => {
    ctx.response.body = {
      code: 0
    }
  })

  router.get('/user/info', async(ctx) => {
    const req = ctx.query; //get 获取参数 ; ctx.request.body 获取post参数
    ctx.response.body = {
      code: 0,
      data: {
        uid: req.uid,
        userName: 'zhxh',
        phone: '13917552082',
        company: '点融信息科技有限公司',
        creditCode: '10001',
        email: 'zhangxiaohu@dianrong.com'
      }
    }
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
