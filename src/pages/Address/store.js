import {ADDRESS_LIST, ADDRESS_ADD} from '../../service/urls'
import {post,get,del} from '../../service/request'
import { observable,action } from 'mobx';

class AddressStore {
  @observable
  addressList = []

  @observable
  address = {
    address: '',
    lng: 0, //经度
    lat: 0 //维度
  }

  @action
  setValue(name, value){
    this.address[name] = value
  }
  
  @action
  async add(name, value){
    return await post({url: ADDRESS_ADD, data: this.address})
  }
  @action
  async getList(){
    const rsp = await get({url: ADDRESS_LIST})
    if(rsp.code === 0){
      this.addressList = rsp.data
    }
    return rsp
  }

  @action
  async edit(id,status){
    const rsp =  await get({url: `${ADDRESS_LIST}/${id}`, data: {status: status ? 1 : 0}})
    if(rsp.code === 0){
      this.getList()
    }
    return rsp
  }

  @action
  async delete(id){
    const rsp = await del({url: `${ADDRESS_LIST}/${id}`})
    if(rsp.code === 0){
      this.getList()
    }
    return rsp
  }
}
export default new AddressStore()