import { observable, action } from 'mobx'
import { STATUS } from '../../common/constant'
import { get } from '../../service/request'
class AuthenticateStore {
  @observable status = STATUS.CHECKING

  @action
  setStatus(value) {
    this.status = value
  }

  @action
  async getStatus() {
    // todo 校验请求数据
    const rsp = await get({ url: '/user/status' })
    if (rsp.code === 0) {
      this.status = STATUS.LOGINED
    } else {
      this.status = STATUS.UNLOGIN
    }
    return rsp
  }
}

export default new AuthenticateStore()
