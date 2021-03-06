// 全局sotre
/*eslint no-undef: "off"*/ 
import { observable, action } from 'mobx'
import { CONFIG_KEY } from './common/constant'
import { VERIFY_CODE_BY_EMAIL } from './service/urls'
import { post } from './service/request'
import md5 from 'js-md5'
/*eslint no-undef: "off"*/
class RootStore {
  // 加载提示
  @observable loading = false

  // 图片切换对话框
  @observable carouselModal = false
  @observable carouseIndex = 0

  // newsletter弹窗
  @observable newsletterModal = false

  // 显示loading
  @action
  showLoading() {
    this.loading = true
  }

  @action
  hideLoading() {
    this.loading = false
  }

  // 显示图片预览
  @action.bound
  showCarouse(index) {
    this.carouselModal = true
    this.carouseIndex = index
  }

  @action.bound
  hideCarouse() {
    this.carouselModal = false
  }

  // newsletter弹框
  @action.bound
  showNewsLetter() {
    this.newsletterModal = true
  }

  @action.bound
  hideNewsLetter() {
    this.newsletterModal = false
  }



  @action
  getVerifyCodeByEmail(option) {
    const now = Date.now()
    console.log(now, md5(now + CONFIG_KEY))
    return post({
      url: VERIFY_CODE_BY_EMAIL,
      data: {
        email: option.email,
        event: option.event,
        timestamp: now,
        token: md5(now + CONFIG_KEY)
      }
    })
  }
}

export default new RootStore()
