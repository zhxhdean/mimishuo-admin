import { observable, action } from 'mobx'
import { post } from '../../service/request'

class LoginStore {
  @observable
  user = {
    userName: '',
    passWord: ''
  }

  @observable
  userInfo ={ //用户信息
    userName: '',
    phone: '',
    company: '',
    creditCode: '',
    email: ''
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
    if(rsp.code === 0){
      this.userInfo = rsp.data
    }
    return rsp
  }

  @action
  async logout (){
    const rsp = await post({url: '/user/logout'})
    return rsp
  }
}

export default new LoginStore()
