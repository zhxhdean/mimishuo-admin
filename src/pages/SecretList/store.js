
import {observable, action} from 'mobx'
import {post} from '../../service/request'
import {SECRET_LIST} from '../../service/urls'
class SecretListStore {

  @observable
  secretList = []
  @action
  async getList(pageIndex = 1, pageSize = 20) {
    const rsp = await post({url: SECRET_LIST, data: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }})
    if(rsp.code === 0){
      this.secretList = rsp.data
    }
  }
}

export default new SecretListStore()