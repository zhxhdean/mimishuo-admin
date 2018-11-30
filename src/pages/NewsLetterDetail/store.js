import { observable, action } from 'mobx'
import { get } from '../../service/request'
import { NEWS_LETTER_DETAIL } from '../../service/urls'
class NewsLetterDetailStore {
  @observable newsLetterDetail = { secretList: [] }

  @action
  async getDetail(id) {
    const rsp = await get({ url: `${NEWS_LETTER_DETAIL}/${id}` })
    if (rsp.code === 0) {
      this.newsLetterDetail = rsp.data
    }
    return rsp
  }
}
export default new NewsLetterDetailStore()
