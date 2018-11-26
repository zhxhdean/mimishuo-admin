import { observable, action } from 'mobx'
import { WORD_LIBRARY_LIST,WORD_LIBRARY_IMPORT, WORD_LIBRARY_BATCH_IMPORT} from '../../service/urls'
import { post } from '../../service/request'
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
    const rsp = await post({
      url: WORD_LIBRARY_LIST,
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize,
        keyword: keyword
      }
    })
    if (rsp.code === 0) {
      this.wordLibraryList = rsp.data
      // 测试数据
      this.total = 76
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
      url: WORD_LIBRARY_IMPORT,
      data: {
       id: id
      }
    })
  }

  @action
  async batchImport(ids) {
    return await post({
      url: WORD_LIBRARY_BATCH_IMPORT,
      data: {
       ids: ids
      }
    })
  }


}
export default new WordLibraryStore()
