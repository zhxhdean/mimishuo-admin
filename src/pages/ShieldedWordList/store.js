import { observable, action } from 'mobx'
import { SHIELDED_WORD_LIST } from '../../service/urls'
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
  setKeyWord(value){
    this.keyword = value
  }
}
export default new ShieldedWordStore()
