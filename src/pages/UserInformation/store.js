import { observable, action } from 'mobx'
import { USER_INFORMATION } from '../../service/urls'
import { get } from '../../service/request'
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
  @action
  async getUserInformation(uid) {
    const rsp = await get({ url: USER_INFORMATION, data: { uid: uid } })
    if(rsp.code === 0){
      this.userInformation = rsp.data
    }
  }
}

export default new UserInformationStore()
