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

  router.post('/serect/list', async ctx => {
    const req = ctx.request.body //get 获取参数 ; ctx.request.body 获取post参数
    ctx.response.body = {
      code: 0,
      content: '',
      data: [{
        id: 1,
        title: '测试标题',
        createTime: '2018-11-19 12:00:01',
        viewCount: 3,
        voteCount: 2,
        reply: false,
        status: 1,
        remove: false
      },{
        id: 2,
        title: '测试标题2',
        createTime: '2018-11-19 12:00:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 2,
        remove: false
      },{
        id: 3,
        title: '测试标题3',
        createTime: '2018-11-19 12:10:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 3,
        remove: false
      },{
        id: 4,
        title: '测试标题4',
        createTime: '2018-11-19 12:20:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 4,
        remove: true
      }]
    }

  })

  router.post('/serect/reply', async ctx => {
    const req = ctx.request.body
    if(req.id && req.content){
      ctx.response.body = {
        code: 0,
        content: `提交的数据id:${req.id},提交的内容${req.content}`
      }
    }else{
      ctx.response.body = {
        code: 1,
        content: `提交的数据id:${req.id},提交的内容${req.content}`
      }
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
