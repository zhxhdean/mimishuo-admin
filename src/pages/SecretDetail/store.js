
import {observable, action} from 'mobx'
import {post} from '../../service/request'
import {SECRET_DETAIL} from '../../service/urls'
class SecretDetailStore {
  @observable
  secretDetail = {img: []}

  @action
  async getDetail(id){
    const rsp = await post({url: SECRET_DETAIL, data: {id: id}})
    if(rsp.code === 0){
      this.secretDetail = rsp.data
    }
    return rsp
  }
}

export default new SecretDetailStore()