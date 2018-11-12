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
      code: 0
    }
  })

  app
    .use(router.routes())
    .use(router.allowedMethods());
}
