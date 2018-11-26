import { observable, action } from 'mobx'
import { post } from '../../service/request'
import { SYSTEM_CONFIG, SYSTEM_CONFIG_EDIT } from '../../service/urls'
class SystemConfigStore {
  @observable
  email = ''
  @observable
  phone = ''

  @observable
  verify = ''
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
  async getConfig() {
    const rsp = await post({ url: SYSTEM_CONFIG })
    if (rsp.code === 0) {
      this.email = rsp.data.email
      this.phone = rsp.data.phone
    }
    return rsp
  }

  @action
  async edit() {
    const rsp = await post({
      url: SYSTEM_CONFIG_EDIT,
      data: {
        email: this.email,
        phone: this.phone
      }
    })
    if (rsp.code === 0) {
      this.email = rsp.data.email
      this.phone = rsp.data.phone
    }
    return rsp
  }

  @action
  setValue (name, value){
    this[name] = value
  }
}
export default new SystemConfigStore()
