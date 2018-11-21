
import {observable, action} from 'mobx'
import {post} from '../../service/request'
import {SECRET_DETAIL,SECRET_DETAIL_EDIT} from '../../service/urls'
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