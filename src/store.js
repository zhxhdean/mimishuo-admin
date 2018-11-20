// 全局sotre

import {observable, action} from 'mobx'

 class RootStore {
   // 加载提示
  @observable loading = false

  // 图片切换对话框
  @observable carouselModal = false
  @observable carouseIndex = 0

  @action
  showLoading(){
    this.loading = true
  }

  @action
  hideLoading(){
    this.loading = false
  }

  @action.bound
  showCarouse(index){
    this.carouselModal = true
    this.carouseIndex = index
  }

  @action.bound
  hideCarouse(){
    this.carouselModal = false
  }
 }

 export default new RootStore()