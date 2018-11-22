// 全局sotre

import { observable, action } from 'mobx'

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
}

export default new RootStore()
