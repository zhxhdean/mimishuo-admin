import { observable, action } from 'mobx'
import { post } from '../../service/request'
import { SYSTEM_CONFIG, SYSTEM_CONFIG_EDIT } from '../../service/urls'
class SystemConfigStore {
  @observable
  replace = false
  @observable
  gps = false



  @action
  async getConfig() {
    const rsp = await post({ url: SYSTEM_CONFIG })
    if (rsp.code === 0) {
      this.replace = rsp.data.replace
      this.gps = rsp.data.gps
    }
    return rsp
  }

  @action
  async setConfig() {
    const rsp = await post({ url: SYSTEM_CONFIG_EDIT })
    // todo
    return rsp
  }


  @action
  setValue (name, value){
    this[name] = value
  }
}
export default new SystemConfigStore()
