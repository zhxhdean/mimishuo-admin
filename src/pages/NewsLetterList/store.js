import { action, observable } from 'mobx'
import {post} from '../../service/request'
import {NEWS_LETTER_LIST} from '../../service/urls'
class NewsLetterStore {
  @observable
  newsLetterList = []
  @observable
  current = 1
  @observable
  total = 0
  @observable
  keyword = ''

  @action
  setKeyword (value) {
    this.keyword = value
  }

  // 搜索、筛选、分页数据
  @action
  async getList(pageIndex, pageSize, keyword = '', filters) {
    this.current = pageIndex
    const rsp = await post({
      url: NEWS_LETTER_LIST,
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword,
        filters: filters
      }
    })
    if (rsp.code === 0) {
      this.newsLetterList = rsp.data
      // 测试数据
      this.total = 106
    }
  }
}

export default new NewsLetterStore()
