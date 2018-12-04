import React, { Component } from 'react'
import { Modal, Select, Row, Col, Input,message } from 'antd'
import { observer, inject } from 'mobx-react'
import { cities } from '../../common/city'
const Option = Select.Option
@inject('orderListStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProvice: -1,
      city: [],
      selectedCity: -1,
      district: [],
      selectedDistrict: -1
    }
  }
  handleInvoiceModal = () => {
    this.props.orderListStore.hideInvoiceModal()
  }
  handleLoadCity = value => {
    const city = cities.filter(
      item => item.level === '2' && item.parentId === value
    )
    this.setState({ city: city, selectedCity: -1, selectedProvice: value })
  }

  handleLoadDistrict = value => {
    const district = cities.filter(
      item => item.level === '3' && item.parentId === value
    )
    this.setState({
      district: district,
      selectedCity: value,
      selectedDistrict: -1
    })
  }

  handleSelectDistrict = value => {
    this.setState({ selectedDistrict: value })
  }

  handelInputChange = (name, e) => {
    this.props.orderListStore.setValue(name, e.target.value)
  }

  handleSubmit = () => {
    console.log(this.props.orderListStore.address)
    if(!this.props.orderListStore.title){
      message.error('请输入发票抬头')
      return
    }
    if(!this.props.orderListStore.taxCode){
      message.error('请输入税号')
      return
    }
    if(this.state.selectedDistrict === -1){
      message.error('请选择邮寄地区')
      return
    }
    if(!this.props.orderListStore.address){
      message.error('请输入详情地址')
      return
    }
    const self = this
    Modal.confirm({
      title: '是否确认提交发票信息？',
      onOk(){
        self.props.orderListStore.createInvoice({
          provice: self.state.selectedDistrict,
          city: self.state.selectedCity,
          district: self.state.selectedDistrict
        }).then(rsp => {
          // todo
        })
      }
    })
    
  }

  render() {
    const { invoiceModal } = this.props.orderListStore
    const provice = cities.filter(item => item.level === '1')
    return (
      <div>
        <Modal
          title="发票信息"
          visible={invoiceModal}
          onCancel={this.handleInvoiceModal}
          onOk={this.handleSubmit}
        >
          <Row>
            <Col span={4}>商品名称：</Col>
            <Col>秘密说1年套餐</Col>
          </Row>
          <Row style={{ marginTop: '10px' }}>
            <Col span={4}>发票类型：</Col>
            <Col>增值税普通发票</Col>
          </Row>
          <Row style={{ marginTop: '10px' }} type="flex" align="middle">
            <Col span={4}>发票抬头：</Col>
            <Col span={16}>
              <Input onChange={this.handelInputChange.bind(this, 'title')}/>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }} type="flex" align="middle">
            <Col span={4}>税号：</Col>
            <Col span={16}>
              <Input onChange={this.handelInputChange.bind(this, 'taxCode')}/>
            </Col>
          </Row>
          <Row style={{ marginTop: '10px' }} type="flex" align="middle">
            <Col span={4}>邮寄地址：</Col>
            <Col span={6}>
              <Select
                placeholder="请选择省"
                style={{ width: 120 }}
                onChange={this.handleLoadCity}
              >
                {provice.map(item => (
                  <Option key={+item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6} offset={1}>
              <Select
                placeholder="请选择市"
                style={{ width: 120 }}
                onChange={this.handleLoadDistrict}
              >
                {this.state.city.map(item => (
                  <Option key={+item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
            <Col span={6} offset={1}>
              <Select
                placeholder="请选择区"
                style={{ width: 120 }}
                onChange={this.handleSelectDistrict}
              >
                {this.state.district.map(item => (
                  <Option key={+item.id} value={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row style={{ marginTop: '10px' }}>
            <Col offset={4}>
              <Input onChange={this.handelInputChange.bind(this, 'address')}/>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}
