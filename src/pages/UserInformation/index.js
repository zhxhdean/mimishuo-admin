import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Divider, Row, Col,message, Modal, Input } from 'antd'
import VerifyCode from '../../components/VerifyCode'

@inject('userInformationStore','rootStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      name: ''
    }
  }
  componentDidMount() {
    this.props.userInformationStore.getUserInformation(10)
  }

  handleInputChange = (name, e) => {
    this.props.userInformationStore.setValue(name, e.target.value)
  }

  handleShowModal = name => {
    this.props.userInformationStore.showModal()
    const title = name === 'phone' ? '新的手机号码' : '新的邮箱地址'
    this.setState({ title: title, name: name })
  }

  handleSubmit =() => {
    if(!this.props.userInformationStore.password){
      message.error('登录密码必须输入')
      return
    }
    // todo 校验格式
    if(!this.props.userInformationStore.email && this.state.name === 'email'){
      message.error('请输入新的通知邮箱地址')
      return
    }
    if(!this.props.userInformationStore.phone && this.state.name === 'phone'){
      message.error('请输入新的通知手机号码')
      return
    }
    if(!this.props.userInformationStore.verify){
      message.error('请输入验证码')
      return
    }
    this.props.rootStore.showLoading()
    this.props.userInformationStore.edit().then(rsp => {
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        this.props.userInformationStore.hideModal()
        message.success('修改成功')
      }else{
        message.error(rsp.content)
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('修改遇到错误')
    })
  }
  render() {
    const { userInformation } = this.props.userInformationStore
    return (
      <div>
        <h2>用户信息</h2>
        <Divider />
        <Row>
          <Col><img src={userInformation.avatar} width="150px" alt="用户头像"/></Col>
        </Row>
        <Row className="pdtb10">
          <Col span={3}>登录账号：</Col>
          <Col span={8} className="black">
            {userInformation.userName}
          </Col>
        </Row>
        <Row className="pdtb10">
          <Col span={3}>通知邮箱：</Col>
          <Col span={8} className="black">
            {/*eslint-disable no-script-url */}
            {userInformation.email || '尚未设置通知邮箱'}
             <a
              href="javascript:void(0)"
              onClick={this.handleShowModal.bind(this, 'email')}
              className="ml20"
            >
              设置
            </a>
          </Col>
       
        </Row>
        <Row className="pdtb10">
          <Col span={3}>通知手机：</Col>
          <Col span={8} className="black">
            {/*eslint-disable no-script-url */}
            {userInformation.phone || '尚未设置通知手机'}
            <a
            className="ml20"
              href="javascript:void(0)"
              onClick={this.handleShowModal.bind(this, 'phone')}
            >
              设置
            </a>
          </Col>
          
        </Row>

        <Row className="pdtb10">
          <Col span={3}>企业名称：</Col>
          <Col span={8} className="black">
            {userInformation.company}
          </Col>
        </Row>
        <Row className="pdtb10">
          <Col span={3}>社会信用代码：</Col>
          <Col span={8} className="black">
            {userInformation.creditCode}
          </Col>
        </Row>

        <Modal
          visible={this.props.userInformationStore.modal}
          onCancel={this.props.userInformationStore.hideModal}
          closable={false}
          onOk = {this.handleSubmit}
        > <Row>
        <Col>登录密码：</Col>
      </Row>
      
      <Row className="pdtb10">
        <Col>
          <Input
          type="password"

            placeholder="请输入登录密码"
            onChange={this.handleInputChange.bind(this, 'password')}
          />
        </Col>
      </Row>
          <Row>
            <Col>{this.state.title}：</Col>
          </Row>
          
          <Row className="pdtb10">
            <Col>
              <Input
            
                placeholder={`请输入${this.state.title}`}
                onChange={this.handleInputChange.bind(this, this.state.name)}
              />
            </Col>
          </Row>
        <VerifyCode handleInputChange={this.handleInputChange}/>
        </Modal>
      </div>
    )
  }
}
