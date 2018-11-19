const router = require('koa-router')()

module.exports = app => {
  router.post('/user/login', async ctx => {
    const req = ctx.request.body
    console.log(req)
    ctx.response.body = {
      code: 0
    }
  })

  router.get('/user/status', async ctx => {
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

  router.post('/user/logout', async ctx => {
    ctx.response.body = {
      code: 0
    }
  })

  router.get('/user/info', async ctx => {
    const req = ctx.query //get 获取参数 ; ctx.request.body 获取post参数
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

  router.post('/user/changepassword', async ctx => {
    const req = ctx.request.body //get 获取参数 ; ctx.request.body 获取post参数

    if (req.old !== 'abc') {
      ctx.response.body = {
        code: 1,
        content: '原密码错误'
      }
    } else {
      ctx.response.body = {
        code: 0,
        content: '',
        data: {
          new: req.new,
          confirm: req.confirm,
          old: req.old
        }
      }
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
