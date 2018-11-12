import { observable, action } from 'mobx'
import { post } from '../../service/request'

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
      url: '/user/login',
      data: { username: this.user.userName, password: this.user.passWord }
    })
    return rsp
  }
}

export default new LoginStore()
