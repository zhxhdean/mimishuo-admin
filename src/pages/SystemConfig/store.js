import { observable, action } from 'mobx'
import { post,get } from '../../service/request'
import { SYSTEM_CONFIG, SYSTEM_CONFIG_EDIT } from '../../service/urls'
/*eslint no-undef: "off"*/
class SystemConfigStore {
  @observable
  replace = false
  @observable
  gps = false



  @action
  async getConfig() {
    const rsp = await get({ url: SYSTEM_CONFIG })
    if (rsp.code === 0) {
      this.replace = rsp.data.autoFilterWord
      this.gps = rsp.data.checkGPS
    }
    return rsp
  }

  @action
  async setConfig() {
    const rsp = await post({ url: SYSTEM_CONFIG_EDIT, data: {
      autoFilterWord:this.replace,
      checkGPS: this.gps
    } })
    // todo
    return rsp
  }


  @action
  setValue (name, value){
    this[name] = value
  }
}
export default new SystemConfigStore()
