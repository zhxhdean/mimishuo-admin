import { observable, action } from 'mobx'
import { STATUS } from '../../common/constant'
import { get } from '../../service/request'
import {USER_INFORMATION} from '../../service/urls'
/*eslint no-undef: "off"*/
/*eslint no-restricted-globals: "off"*/

class AuthenticateStore {
  @observable status = STATUS.CHECKING
  @observable
  userInfo ={ //用户信息
    accountId: 0,
    companyInfo: {
      companyId: 0,
      companyName: '',
      creditCode: ''
    },
    userName: '',
    mobile: '',
    expireDate: '',
    email: ''
  }
  @action
  setStatus(value) {
    this.status = value
  }

  @action
  async getStatus() {
    // todo 校验请求数据
    const rsp = await get({ url: USER_INFORMATION })
    if (rsp.code === 0) {
      this.status = STATUS.LOGINED
      this.userInfo = rsp.data
    } else {
      this.status = STATUS.UNLOGIN
    }
    return rsp
  }
}

export default new AuthenticateStore()
