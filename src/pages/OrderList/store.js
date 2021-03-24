
import {observable,action} from 'mobx'
import {post,get} from '../../service/request'
import {ORDER_LIST,INVOICE_CREATE,INVOICE_DETAIL} from '../../service/urls'

/*eslint no-undef: "off"*/
class OrderListStore{

  @observable orderInfo = {}
  @observable invoiceInfo = {}
  @observable invoiceModal = false

  //发票抬头
  @observable title = ''
  // 税号
  @observable taxCode = ''
  // 地址
  @observable address = ''

  @observable
  orderList = [{orderId: 1, status: 1, invoiceStatus:1},
    {orderId: 2, status: 2, invoiceStatus:1},
    {orderId: 3, status: 2, invoiceStatus:2},
    {orderId: 4, status: 2, invoiceStatus:3}]

  @action
  async getList(){
    const rsp = await post({url: ORDER_LIST})
    if(rsp.code === 0){
      this.orderList = rsp.data
    }
    return rsp
  }

  @action
  showInvoiceModal(order, invoiceInfo={}){
    this.invoiceModal = true
    this.orderInfo = order
    invoiceInfo && (this.invoiceInfo = invoiceInfo)
  }

  @action
  hideInvoiceModal(){
    this.invoiceModal = false
  }

  @action 
  setValue(name, value){
    this[name] = value
  }

  // 创建发票信息
  @action
  async createInvoice(option){
    const data = {title: this.title,taxCode: this.taxCode, address:this.address,...option}
    const rsp = await post({url: INVOICE_CREATE, data: data})
    return rsp
  }

  // 查找发票信息
  @action
  async getInvoice(id){
    const rsp = await get({url: INVOICE_DETAIL, data: {id: id}})
    if(rsp.code === 0){
      this.invoiceInfo = rsp.data
    }
    return rsp
  }
}

export default new OrderListStore()