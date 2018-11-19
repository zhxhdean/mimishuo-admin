import { observable, action } from 'mobx'
import { post } from '../../service/request'
import { USER_CHANGE_PASSWORD } from '../../service/urls'
class PassWordStore {
  @observable
  oldPassWord = ''
  @observable
  newPassWord = ''
  @observable
  confirmPassWord = ''

  @action
  setValue(name, value) {
    this[name] = value
  }

  @action
  async changePassWord() {
    return await post({
      url: USER_CHANGE_PASSWORD,
      data: {
        old: this.oldPassWord,
        new: this.newPassWord,
        confirm: this.confirmPassWord
      }
    })
  }
}
export default new PassWordStore()
