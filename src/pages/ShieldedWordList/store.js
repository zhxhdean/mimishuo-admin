import { observable, action } from 'mobx'
import { SHIELDED_WORD_LIST, SHIELDED_WORD_DELETE,SHIELDED_WORD_BATCH_DELETE } from '../../service/urls'
import { post } from '../../service/request'
class ShieldedWordStore {
  @observable
  shieldedWordList = []
  @observable
  current = 1
  @observable
  total = 0
  @observable
  keyword = ''

  @action
  async getList(pageIndex, pageSize, keyword = '') {
    this.current = pageIndex
    const rsp = await post({
      url: SHIELDED_WORD_LIST,
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword
      }
    })
    if (rsp.code === 0) {
      this.shieldedWordList = rsp.data
      // 测试数据
      this.total = 76
    }
    return rsp
  }

  @action
  setKeyWord(value) {
    this.keyword = value
  }

  // 删除单条
  @action
  async delete(id) {
    // todo 调接口
    const rsp = await post({ url: SHIELDED_WORD_DELETE, data: { id: id } })
    if (rsp.code === 0) {
      const index = this.shieldedWordList.findIndex(item => item.id === id)
      if (index > -1) {
        this.shieldedWordList.splice(index, 1)
      }
    }
    return rsp
  }

  // 批量删除
  @action
  async batchDelete(ids) {
    // todo 调接口
    const rsp = await post({ url: SHIELDED_WORD_BATCH_DELETE, data: { ids: ids } })
    if (rsp.code === 0) {
      ids.forEach(id => {
        const index = this.shieldedWordList.findIndex(item => item.id === id)
        if (index > -1) {
          this.shieldedWordList.splice(index, 1)
        }
      })
    }
    return rsp
  }
}
export default new ShieldedWordStore()
