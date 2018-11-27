
import {observable, action} from 'mobx'
import {post} from '../../service/request'
import {SECRET_LIST,SECRET_REPLY_CONTENT} from '../../service/urls'
class SecretListStore {

  @observable
  secretList = []
  @observable
  current = 1
  @observable
  total = 0
  @observable
  keyword= ''
  @observable
  startDate = ''
  @observable
  endDate = ''


  @observable // 显示回复弹框
  showQuickReplyModal = false
  @observable // 回复内容
  replyContent = ''
  @observable // 当前行的数据
  record = {}

  @action
  setValue (name,value) {
    this[name] = value
  }

  @action 
  setKeyword (value) {
    this.keyword = value
  }

  // 搜索、筛选、分页数据
  @action
  async getList(pageIndex, pageSize, keyword = '', filters, sorter={name: 'id', order: 'desc'}) {
    this.current = pageIndex
    const rsp = await post({url: SECRET_LIST, data: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      keyword: keyword,
      filters: filters,
      startDate: this.startDate,
      endDate: this.endDate,
      sorter: {name: sorter.name, order: sorter.order}
    }})
    if(rsp.code === 0){
      this.secretList = rsp.data
      // 测试数据
      this.total = 106
    }
  }

  //打开or关闭回复弹框
  @action.bound
  showQuickReply (value, record = {}) {
    this.showQuickReplyModal = value
    this.record = record
  }

  @action
  async reply(id, content){
    return await post({url: SECRET_REPLY_CONTENT, data:{
      id: id,
      content: content
    }})
  }
  
}

export default new SecretListStore()