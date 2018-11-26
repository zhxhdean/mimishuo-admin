
import {observable, action} from 'mobx'
import {post} from '../../service/request'
import {DEFAULT_SECRET_TAGS} from '../../common/constant'
import {TAGS_ADD,TAGS_LIST,TAGS_DELETE} from '../../service/urls'
class TagsStore {
  @observable //秘密详情页使用
  tagsForSecret = []
  @observable
  tags = []

  @observable
  tag = ''

  @observable
  showInputText = false

  @action.bound 
  showInput (){
    this.showInputText = true
  }

  @action
  async add(){
    const rsp = await post({url: TAGS_ADD, data: {tag: this.tag}})
    if(rsp.code === 0){
      this.tag = ''
      this.getList()
    }
    return rsp
  }

  @action
  async getList(){
   const rsp = await post({url: TAGS_LIST})
   if(rsp.code === 0){
     this.tags = rsp.data
   }
   return rsp
  }

  @action
  async formatTags (){
   const rsp = await this.getList()
   if(rsp.code === 0){
    this.tagsForSecret = rsp.data.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
   }else{
    this.tagsForSecret = DEFAULT_SECRET_TAGS
   }
  }

  @action
  async delete(id){
    const rsp = await post({url: TAGS_DELETE, data: {id: id}})
    if(rsp.code === 0){
      this.tags = rsp.data
    }
    return rsp
  }

  @action 
  setValue(value){
    this.tag = value
  }


}

export default new TagsStore()