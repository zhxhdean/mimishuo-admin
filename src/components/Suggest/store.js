import{observable,action} from 'mobx'
import { get, put, post } from '../../service/request';
import {UPLOAD,SUGGEST_ADD} from '../../service/urls'
import { clear } from 'size-sensor';

/*eslint no-undef: "off"*/
class SuggestStore{
  @observable fileList = []

  @observable uploadUrls = []

  @observable subject = ''
  @observable description = ''
  @observable mobile = ''
  @observable attachmentKeyList = []

  @action
  addFile(file){
    this.fileList.push(file)
  }
  @action
  removeFile(file){
    const index = this.fileList.findIndex(item => item === file)
    this.fileList.splice(index, 1)
  }

  // 获取上传图片地址
  @action 
  async getUploadUrl(){
    const rsp = await get({url: UPLOAD})
    if(rsp.code === 0){
      this.uploadUrls.push(rsp.presignedUrl)
    }
    return rsp
  }

  @action
  async upload(url, data){
    return await put({url: url, data: data})
  }

  @action
  setValue (name, value){
    this[name] = value
  }

  @action
  clear(){
    this.subject = ''
    this.description = ''
    this.mobile = ''
    this.attachmentKeyList = []
  }

  @action
  async add(){
    return await post({url: SUGGEST_ADD, data: {attachmentKeyList: this.attachmentKeyList, description: this.description, mobile: this.mobile, subject: this.subject}})
  }
}

export default new SuggestStore()