import { observable, action } from "mobx";
import {message} from 'antd'
class NewsLetterPendingListStore {
  //发布清单集合
  @observable pendingList = []

  @action // 加入当前行
  join(obj, check = true){
    // todo 调用接口
    const index = this.pendingList.findIndex(item => item.id === obj.id)
    if(index === -1){
      this.pendingList.push(obj)
      check && message.success('成功添加到清单！', 1.5)
    }else{
      check && message.warn('已存在发布清单中！', 1.5)
    }
  }

  @action // 批量加入
  batchJoin(batch){
    batch.forEach(item => this.join(item, false))
    message.success('成功添加到清单！', 1.5)
  }

  @action // 移除当前行
  remove(obj){
    // todo 调用接口
    const index = this.pendingList.findIndex(item => item.id === obj.id)
    if(index > -1){
      this.pendingList.splice(index, 1)
    }
  }

  @action // 移除所有
  clear(){
    this.pendingList = []
  }
}

export default new NewsLetterPendingListStore()