import { observable,action } from "mobx";
import {USER_FORGET_PASSWORD} from '../../service/urls'
import { post } from "../../service/request";
/*eslint no-undef: "off"*/
class ForgetPasswordStore{

  @observable user = {
    userName: '',
    verify: '',
    newPassword: '',
    confirmPassword: ''
  }

  @action
  setValue(name, value){
    this.user[name] = value
  }

  @action
  async changePassword(){
    return await post({url: USER_FORGET_PASSWORD, data: {userName: this.user.userName, password: this.user.newPassword, verificationCode: this.user.verify}})
  }
}
export default new ForgetPasswordStore()