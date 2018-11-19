import { observable, action } from 'mobx'
import { post } from '../../service/request'
import {LOGIN, LOGOUT} from '../../service/urls'
class LoginStore {
  @observable
  user = {
    userName: '',
    passWord: ''
  }

  @action
  setValue(name, value) {
    this.user[name] = value
  }

  @action
  async login() {
    // todo 校验请求数据
    const rsp = await post({
      url: LOGIN,
      data: { username: this.user.userName, password: this.user.passWord }
    })
    return rsp
  }

  @action
  async logout (){
    const rsp = await post({url: LOGOUT})
    if(rsp.code === 0) {
      window.location.href = '#/login'
      return
    }
    return rsp
  }
}

export default new LoginStore()
