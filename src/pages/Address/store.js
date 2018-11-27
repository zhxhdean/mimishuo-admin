import {ADDRESS_LIST, ADDRESS_ADD, ADDRESS_EDIT,ADDRESS_DELETE} from '../../service/urls'
import {post} from '../../service/request'
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
    return await post({url: ADDRESS_ADD, data: {address: this.address}})
  }
  @action
  async getList(){
    const rsp = await post({url: ADDRESS_LIST})
    if(rsp.code === 0){
      this.addressList = rsp.data
    }
    return rsp
  }

  @action
  async edit(id){
    return await post({url: ADDRESS_EDIT, data: {id: id}})
  }

  @action
  async delete(id){
    return await post({url: ADDRESS_DELETE, data: {id: id}})
  }
}
export default new AddressStore()