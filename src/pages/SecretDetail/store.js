
import {observable, action} from 'mobx'
import {post,get} from '../../service/request'
import {SECRET_DETAIL,SECRET_DETAIL_EDIT} from '../../service/urls'
class SecretDetailStore {
  @observable
  secretDetail = {imageUrls: []}

  @action
  async getDetail(id){
    const rsp = await get({url: `${SECRET_DETAIL}/${id}`})
    if(rsp.code === 0){
      this.secretDetail = rsp.data || this.secretDetail
    }
    return rsp
  }

  @action 
  setValue(name, value){
    this.secretDetail[name] = value
  }

  @action
  async editDetail(){
    return await post({url: SECRET_DETAIL_EDIT, data: this.secretDetail})
  }
}

export default new SecretDetailStore()