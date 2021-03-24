
import {observable, action} from 'mobx'
import {post} from '../../service/request'
import util from '../../common/util'
import {DEFAULT_PAGESIZE} from '../../common/constant'
import {SECRET_LIST,SECRET_REPLY_CONTENT} from '../../service/urls'
/*eslint no-undef: "off"*/
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
  async getList(pageIndex, pageSize, keyword = '', filters ={}, sorter={}) {
    this.current = pageIndex
    let _filters = {...filters}
    if(this.startDate && this.endDate){
      _filters['createEndTime'] = this.endDate
      _filters['createBeginTime'] = this.startDate
    }
    // api排序字段 CreateTime,ViewNum,LikeNum
    const orderName = util.toUpperFirstLetter(sorter.name)
    const rsp = await post({url: SECRET_LIST, data: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      keyword: keyword,
      filter: _filters,
      order: {
        searchOrder: orderName || 'CreateTime',
        desc: sorter.order === undefined ? true : sorter.order
      }
      
    }})
    if(rsp.code === 0){
      this.secretList = rsp.data.items
      // 测试数据
      this.total = rsp.data.totalCount
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
    const rsp = await post({url: SECRET_REPLY_CONTENT, data:{
      secretId: id,
      content: content
    }})
    if(rsp.code === 0){
      this.getList(this.current,DEFAULT_PAGESIZE)
    }
    return rsp
  }
  
}

export default new SecretListStore()