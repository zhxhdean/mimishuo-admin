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

  router.post('/secret/list', async ctx => {
    const req = ctx.request.body //get 获取参数 ; ctx.request.body 获取post参数
    let data = [
      {
        id: 1,
        title: '测试标题',
        createTime: '2018-11-19 12:00:01',
        viewCount: 3,
        voteCount: 2,
        reply: false,
        status: 1,
        remove: false
      },
      {
        id: 2,
        title: '测试标题2',
        createTime: '2018-11-19 12:00:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 2,
        remove: false
      },
      {
        id: 3,
        title: '测试标题3',
        createTime: '2018-11-19 12:10:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 3,
        remove: false
      },
      {
        id: 4,
        title: '测试标题4',
        createTime: '2018-11-19 12:20:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 4,
        remove: true
      },
      {
        id: 5,
        title: '测试标题',
        createTime: '2018-11-19 12:00:01',
        viewCount: 3,
        voteCount: 2,
        reply: false,
        status: 1,
        remove: false
      },
      {
        id: 6,
        title: '测试标题2',
        createTime: '2018-11-19 12:00:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 2,
        remove: false
      },
      {
        id: 7,
        title: '测试标题3',
        createTime: '2018-11-19 12:10:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 3,
        remove: false
      },
      {
        id: 8,
        title: '测试标题4',
        createTime: '2018-11-19 12:20:11',
        viewCount: 3,
        voteCount: 2,
        reply: true,
        status: 4,
        remove: true
      }
    ]
    if (req.keyword !== '') {
      data = data.filter(item => item.title.includes(req.keyword))
    }
    ctx.response.body = {
      code: 0,
      content: '',
      data: data
    }
  })

  router.post('/shieldedword/list', async ctx => {
    const req = ctx.request.body //get 获取参数 ; ctx.request.body 获取post参数
    let data = [
      {
        id: 1,
        title: '王八',
        createTime: '2018-11-19 12:00:01',
        similar: '王八蛋',
        category: 1
      },
      {
        id: 2,
        title: 'SB',
        createTime: '2018-11-19 12:00:01',
        similar: '傻逼,sb',
        category: 2
      },
      {
        id: 3,
        title: '王八',
        createTime: '2018-11-19 12:00:01',
        similar: '王八蛋',
        category: 1
      },
      {
        id: 4,
        title: 'SB',
        createTime: '2018-11-19 12:00:01',
        similar: '傻逼,sb',
        category: 2
      },
      {
        id: 5,
        title: '王八',
        createTime: '2018-11-19 12:00:01',
        similar: '王八蛋',
        category: 1
      },
      {
        id: 6,
        title: 'SB',
        createTime: '2018-11-19 12:00:01',
        similar: '傻逼,sb',
        category: 2
      }
    ]
    if (req.keyword !== '') {
      data = data.filter(item => item.title.includes(req.keyword))
    }
    ctx.response.body = {
      code: 0,
      content: '',
      data: data
    }
  })
  router.post('/wordlibrary/list', async ctx => {
    const req = ctx.request.body //get 获取参数 ; ctx.request.body 获取post参数
    let data = [
      {
        id: 1,
        title: '王八',
        createTime: '2018-11-19 12:00:01',
        similar: '王八蛋',
        category: 1
      },
      {
        id: 2,
        title: 'SB',
        createTime: '2018-11-19 12:00:01',
        similar: '傻逼,sb',
        category: 2
      },
      {
        id: 3,
        title: '王八',
        createTime: '2018-11-19 12:00:01',
        similar: '王八蛋',
        category: 1
      },
      {
        id: 4,
        title: 'SB',
        createTime: '2018-11-19 12:00:01',
        similar: '傻逼,sb',
        category: 2
      },
      {
        id: 5,
        title: '王八',
        createTime: '2018-11-19 12:00:01',
        similar: '王八蛋',
        category: 1
      },
      {
        id: 6,
        title: 'SB',
        createTime: '2018-11-19 12:00:01',
        similar: '傻逼,sb',
        category: 2
      }
    ]
    if (req.keyword !== '') {
      data = data.filter(item => item.title.includes(req.keyword))
    }
    ctx.response.body = {
      code: 0,
      content: '',
      data: data
    }
  })

  router.post('/newsletter/list', async ctx => {
    const req = ctx.request.body //get 获取参数 ; ctx.request.body 获取post参数
    let data = [
      {
        id: 1,
        title: '测试标题',
        createTime: '2018-11-19 12:00:01',
        content: '测试内容',
        status: 1
      },
      {
        id: 2,
        title: '测试标题2',
        createTime: '2018-11-19 12:00:01',
        content: '测试内容2',
        status: 2
      },
      {
        id: 3,
        title: '测试标题3',
        createTime: '2018-11-19 12:00:01',
        content: '测试内容',
        status: 3
      },
      {
        id: 4,
        title: '测试标题3',
        createTime: '2018-11-19 12:00:01',
        content: '测试内容',
        status: 4
      }
    ]

    if (req.keyword !== '') {
      data = data.filter(item => item.title.includes(req.keyword))
    }

    ctx.response.body = {
      code: 0,
      content: '',
      data: data
    }
  })

  router.post('/secret/reply', async ctx => {
    const req = ctx.request.body
    if (req.id && req.content) {
      ctx.response.body = {
        code: 0,
        content: `提交的数据id:${req.id},提交的内容${req.content}`
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: `提交的数据id:${req.id},提交的内容${req.content}`
      }
    }
  })

  router.post('/secret/detail', async ctx => {
    const req = ctx.request.body
    if (req.id) {
      ctx.response.body = {
        code: 0,
        data: {
          id: req.id,
          title: '公司反馈意见标题' + req.id,
          author: '张三',
          uid: 101,
          viewCount: 3,
          voteCount: 1,
          content:
            '我对公司的卫生情况有很大意见，很多员工桌上有大量未吃完零食。时间长了导致有蟑螂滋生，特别恶心！希望尽快处理！',
          createTime: '2018-11-19 10:23:22',
          removeTime: '2018-11-21 17:00:00',
          replyContent: '',
          tags: [1, 2, 3],
          status: 1,
          remove: req.id === 4 ? true : false,
          img: [
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711249406&di=ba9f9bfe9bd7aaf61309aa06ee0ca5fd&imgtype=0&src=http%3A%2F%2Fimg3.myhsw.cn%2F2018-03-22%2Fcp4yy0x9.jpg%3F86i',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711249408&di=3b8c09e57a6d0938e807ed4c9057f47e&imgtype=0&src=http%3A%2F%2Fpic.shejiben.com%2Fcase%2F2015%2F06%2F13%2F20150613075420-236250cd.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711248924&di=d447728206a39e7d8ae292ea8b735a37&imgtype=0&src=http%3A%2F%2Fwww.yw2005.com%2Fbaike%2Fuploads%2Fallimg%2F160604%2F1-160604155221243.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711249406&di=ba9f9bfe9bd7aaf61309aa06ee0ca5fd&imgtype=0&src=http%3A%2F%2Fimg3.myhsw.cn%2F2018-03-22%2Fcp4yy0x9.jpg%3F86i',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711249408&di=3b8c09e57a6d0938e807ed4c9057f47e&imgtype=0&src=http%3A%2F%2Fpic.shejiben.com%2Fcase%2F2015%2F06%2F13%2F20150613075420-236250cd.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711248924&di=d447728206a39e7d8ae292ea8b735a37&imgtype=0&src=http%3A%2F%2Fwww.yw2005.com%2Fbaike%2Fuploads%2Fallimg%2F160604%2F1-160604155221243.jpg',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711249406&di=ba9f9bfe9bd7aaf61309aa06ee0ca5fd&imgtype=0&src=http%3A%2F%2Fimg3.myhsw.cn%2F2018-03-22%2Fcp4yy0x9.jpg%3F86i',
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1542711249408&di=3b8c09e57a6d0938e807ed4c9057f47e&imgtype=0&src=http%3A%2F%2Fpic.shejiben.com%2Fcase%2F2015%2F06%2F13%2F20150613075420-236250cd.jpg'
          ]
        }
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })

  router.post('/newsletter/detail', async ctx => {
    const req = ctx.request.body
    if (req.id) {
      ctx.response.body = {
        code: 0,
        data: {
          id: req.id,
          title: '公司反馈意见标题' + req.id,
          content:
            '我对公司的卫生情况有很大意见，很多员工桌上有大量未吃完零食。时间长了导致有蟑螂滋生，特别恶心！希望尽快处理！',
          createTime: '2018-11-19 10:23:22',
          status: 1,
          secretList: [
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            },
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            },
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            },
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            },
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            },
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            },
            {
              id: 1,
              title: '秘密1',
              content: '111秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '闪电侠'
            },
            {
              id: 2,
              title: '22秘密1',
              content: '秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '绿灯侠'
            },
            {
              id: 3,
              title: '333秘密1',
              content: '333秘密描述1',
              createTime: '2018-11-19 10:23:22',
              author: '钢铁侠'
            }
          ]
        }
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })

  router.post('/secret/detail/edit', async ctx => {
    ctx.response.body = {
      code: 0,
      data: ctx.request.body
    }
  })

  router.post('/newsletter/publish', async ctx => {
    ctx.response.body = {
      code: 0,
      data: ctx.request.body
    }
  })

  router.post('/shieldedword/delete', async ctx => {
    const req = ctx.request.body
    if (req.id) {
      ctx.response.body = {
        code: 0,
        content: req.id
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })

  router.post('/shieldedwrod/batchdelete', async ctx => {
    const req = ctx.request.body
    if (req.ids) {
      ctx.response.body = {
        code: 0,
        content: req.ids
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })

  router.post('/shieldedwrod/add', async ctx => {
    const req = ctx.request.body
    if (req.category) {
      ctx.response.body = {
        code: 0,
        content: req.ids
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })

  router.post('/wordlibrary/import', async ctx => {
    const req = ctx.request.body
    if (req.id) {
      ctx.response.body = {
        code: 0,
        content: req.id
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })
  router.post('/wordlibrary/batchimport', async ctx => {
    const req = ctx.request.body
    if (req.ids) {
      ctx.response.body = {
        code: 0,
        content: req.ids
      }
    } else {
      ctx.response.body = {
        code: 1,
        content: '请求参数错误'
      }
    }
  })

  var tags = [{ id: 1, name: '一般' }]
  router.post('/tags/list', async ctx => {
    const req = ctx.request.body
    ctx.response.body = {
      code: 0,
      data: tags
    }
  })

  router.post('/tags/add', async ctx => {
    const req = ctx.request.body
    tags.push({ id: tags.length + 1, name: req.tag })
    ctx.response.body = {
      code: 0,
      data: tags
    }
  })

  router.post('/tags/delete', async ctx => {
    const req = ctx.request.body
    const index = tags.findIndex(item => item.id === +req.id)
    tags.splice(index, 1)
    ctx.response.body = {
      code: 0,
      data: tags
    }
  })

  app.use(router.routes()).use(router.allowedMethods())
}
