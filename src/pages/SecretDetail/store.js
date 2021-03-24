
import {observable, action} from 'mobx'
import {post,get} from '../../service/request'
import {SECRET_DETAIL,SECRET_DETAIL_EDIT,SECRECT_SAVE} from '../../service/urls'
/*eslint no-undef: "off"*/
class SecretDetailStore {
  @observable
  secretDetail = {imageUrls: [],tags: []}

  @observable
  tags = []

  @action
  async getDetail(id){
    const rsp = await get({url: `${SECRET_DETAIL}/${id}`})
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
  setTags(value){
    this.tags = value
  }
  @action
  async editDetail(){
    return await post({url: SECRET_DETAIL_EDIT, data: this.secretDetail})
  }

  @action
  async save(content, id, tagIds){
    return await post({url: SECRECT_SAVE, data: {
        content: content,
        secretId: id,
        tagIdList: tagIds
    }})
  }
}

export default new SecretDetailStore()