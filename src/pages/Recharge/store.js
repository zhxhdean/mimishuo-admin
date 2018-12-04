import {action,observable} from 'mobx'
import {post} from '../../service/request'
import {ORDER_CREATE,ORDER_STATUS} from '../../service/urls'
class RechargeStore{
  // 订单信息
  @observable
  orderInfo = {
    orderId: '订单号',
    packageName: '套餐名称',
    packagePrice: '套餐金额',
    payPrice: '支付金额',
    expiresDate: '到期时间',
    status: '订单状态'
  }

  @action // 创建订单
  async createOrder(items){
    const data = {}
    const rsp = await post({url: ORDER_CREATE, data: data})
    if(rsp.code === 0){
      this.orderInfo = rsp.data // todo
    }
    return rsp
  }

  @action
  async getOrderStatus(){
    return await post({url: ORDER_STATUS, data: {orderId: this.orderInfo.orderId}})
  }
}
export default new RechargeStore()