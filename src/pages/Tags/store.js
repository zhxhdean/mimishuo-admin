
import {observable, action} from 'mobx'
import {post,del,get} from '../../service/request'
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
    const rsp = await post({url: TAGS_ADD, data: {tagName: this.tag, tagId: 0}})
    if(rsp.code === 0){
      this.tag = ''
      this.getList()
    }
    return rsp
  }

  @action
  async getList(){
   const rsp = await get({url: TAGS_LIST})
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
        label: item.tarName,
        value: item.tagId
      }
    })
   }else{
    this.tagsForSecret = DEFAULT_SECRET_TAGS
   }
  }

  @action
  async delete(id){
    const rsp = await del({url: `${TAGS_DELETE}/${id}`})
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