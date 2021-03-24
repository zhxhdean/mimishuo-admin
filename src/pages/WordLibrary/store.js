import { observable, action } from 'mobx'
import { WORD_LIBRARY_LIST,WORD_LIBRARY_IMPORT, WORD_LIBRARY_BATCH_IMPORT} from '../../service/urls'
import { post,get } from '../../service/request'
/*eslint no-undef: "off"*/
class WordLibraryStore {
  @observable
  wordLibraryList = []
  @observable
  current = 1
  @observable
  total = 0
  @observable
  keyword = ''



  @action
  async getList(pageIndex, pageSize, keyword = '') {
    this.current = pageIndex
    const rsp = await get({
      url: WORD_LIBRARY_LIST,
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword
      }
    })
    if (rsp.code === 0) {
      this.wordLibraryList = rsp.data.items|| []
      // 测试数据
      this.total = rsp.data.totalCount
    }
    return rsp
  }

  @action
  setKeyWord(value) {
    this.keyword = value
  }

  @action
  async import(id) {
    return await post({
      url: `${WORD_LIBRARY_IMPORT}/${id}`
    })
  }

  @action
  async batchImport(ids) {
    return await post({
      url: WORD_LIBRARY_BATCH_IMPORT,
      data: {
        maskWordIdList: ids
      }
    })
  }


}
export default new WordLibraryStore()
