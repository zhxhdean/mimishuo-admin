import { observable, action } from 'mobx'
import { message } from 'antd'
import { post } from '../../service/request'
import { NEWS_LETTER_PUBLISH, NEWS_LETTER_CACHE_ADD, NEWS_LETTER_CACHE_DELETE } from '../../service/urls'
class NewsLetterPendingListStore {
  //发布清单集合
  @observable pendingList = []
  // newsletter 标题
  @observable title = ''
  @observable content = ''

  @action
  setValue(name, value) {
    this[name] = value
  }

  @action // 加入当前行
  async join(obj, check = true) {
    // todo 调用接口
    const index = this.pendingList.findIndex(
      item => item.secretId === obj.secretId
    )
    let rsp = {code: 0}
    if (index === -1) {
      rsp = await post({ url: `${NEWS_LETTER_CACHE_ADD}/${obj.secretId}` })
      if (rsp.code === 0) {
        this.pendingList.push(obj)
        check && message.success('成功添加到清单！', 1.5)
      }
    } else {
      check && message.warn('已存在发布清单中！', 1.5)
    }
    return rsp
  }

  @action // 批量加入
  batchJoin(batch) {
    batch.forEach(item => this.join(item, false))
    message.success('成功添加到清单！', 1.5)
  }

  @action // 移除当前行
  async remove(obj) {
    // todo 调用接口
    const rsp = await post({url: `${NEWS_LETTER_CACHE_DELETE}/${obj.secretId}`})
    if(rsp.code === 0){
      const index = this.pendingList.findIndex(item => item.secretId === obj.secretId)
      if (index > -1) {
        this.pendingList.splice(index, 1)
      }
    }
    return rsp
  }

  @action // 移除所有
  clear() {
    this.pendingList = []
  }

  @action
  async publish() {
    return await post({
      url: NEWS_LETTER_PUBLISH,
      data: {
        title: this.title,
        content: this.content,
        secretIds: this.pendingList.map(item => item.id)
      }
    })
  }
}

export default new NewsLetterPendingListStore()
