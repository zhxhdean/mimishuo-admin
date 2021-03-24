import { observable, action } from 'mobx'
import { post } from '../../service/request'
import { USER_CHANGE_PASSWORD } from '../../service/urls'
/*eslint no-undef: "off"*/
class PassWordStore {
  @observable
  oldPassword = ''
  @observable
  newPassword = ''
  @observable
  confirmPassword = ''

  @action
  setValue(name, value) {
    this[name] = value
  }

  @action
  async changePassWord() {
    return await post({
      url: USER_CHANGE_PASSWORD,
      data: {
        originalPassword: this.oldPassword,
        newPassword: this.newPassword
      }
    })
  }
}
export default new PassWordStore()
