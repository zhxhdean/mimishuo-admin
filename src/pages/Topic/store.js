
import {observable, action} from 'mobx'
import {post,del,get} from '../../service/request'

import {TOPIC_ADD, TOPIC_LIST, TOPIC_CLOSE} from '../../service/urls'
/*eslint no-undef: "off"*/
class TopicStore {
  @observable //秘密详情页使用
  tagsForSecret = []
  @observable
  topic = []


  @observable
  showInputText = false



  @action
  async add(data){
    const rsp = await post({url: TOPIC_ADD, data})
    if(rsp.code === 0){
      this.tag = ''
      this.getList({
        pageIndex: 1,
        pageSize: 100})
    }
    return rsp
  }

  @action
  async getList(data){
   const rsp = await post({url: TOPIC_LIST, data})
   if(rsp.code === 0){
     this.topic = rsp.data.items && rsp.data.items.map((item) => ({ show: false, ...item, reply: [] })) || [];
   }
   return rsp
  }

  @action
  async close(id){
    const rsp = await get({url: TOPIC_CLOSE + '/' + id})
    if(rsp.code === 0){
      this.tag = ''
      this.getList({
        pageIndex: 1,
        pageSize: 100})
    }
    return rsp
  }

}

export default new TopicStore()