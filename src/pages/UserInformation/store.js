import { observable, action } from 'mobx'
import { USER_EMAIL_CHANGE,USER_PHONE_CHANGE } from '../../service/urls'
import {post } from '../../service/request'
class UserInformationStore {

  // 修改时候需要用的
  @observable
  verify = ''
  @observable
  password = ''
  @observable
  email = ''
  @observable
  phone = ''

  @observable
  modal = false


  @action
  showModal(){
    this.modal = true
  }
  @action.bound
  hideModal(){
    this.modal = false
  }


  @action
  async edit() {
    let data = {}
    if(this.email){
      // 修改邮箱
      data = {
        newEmail: this.email,
        password: this.password,
        verify: this.verify
      }
    }else if(this.phone){
      data = {
        newMobile: this.phone,
        password: this.password,
        verify: this.verify
      }
    }
    const rsp = await post({
      url: this.email ? USER_EMAIL_CHANGE : USER_PHONE_CHANGE ,
      data: data
    })
    return rsp
  }

  @action
  setValue (name, value){
    this[name] = value
  }
}

export default new UserInformationStore()
