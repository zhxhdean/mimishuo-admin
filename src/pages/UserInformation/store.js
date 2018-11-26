import { observable, action } from 'mobx'
import { USER_INFORMATION,SYSTEM_CONFIG_EDIT } from '../../service/urls'
import { get,post } from '../../service/request'
class UserInformationStore {
  @observable
  userInformation = {
    uid: '',
    userName: '',
    phone: '',
    company: '',
    creditCode: '',
    email: ''
  }

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
  async getUserInformation(uid) {
    const rsp = await get({ url: USER_INFORMATION, data: { uid: uid } })
    if(rsp.code === 0){
      this.userInformation = rsp.data
    }
  }

  @action
  async edit() {
    const rsp = await post({
      url: SYSTEM_CONFIG_EDIT,
      data: {
        email: this.email,
        phone: this.phone,
        password: this.password,
        verify: this.verify
      }
    })
    if (rsp.code === 0) {
      this.userInformation.email = rsp.data.email
      this.userInformation.phone = rsp.data.phone
    }
    return rsp
  }

  @action
  setValue (name, value){
    this[name] = value
  }
}

export default new UserInformationStore()
