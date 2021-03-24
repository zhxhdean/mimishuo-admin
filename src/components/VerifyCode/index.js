/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import {Row,Col,Button,Input,message} from 'antd'
import { inject } from 'mobx-react';
import {CONFIG_SEND_EVENT} from '../../common/constant'
let interval
@inject('rootStore','authenticateStore')
export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      disable: false,
      countDown: 60
    }
  }

  handleSend =() => {
    if(this.props.prevalue&&!this.props.prevalue.v){
      message.error(this.props.prevalue.t)
      return
    }
    let event = ''
    if(this.props.prevalue.c === 'email'){
      event = CONFIG_SEND_EVENT.CHANGE_EMAIL
    }else if(this.props.prevalue.c === 'phone'){
      event = CONFIG_SEND_EVENT.CHANGE_MOBILE
    }else if (this.props.prevalue.c === 'forget'){
      event = CONFIG_SEND_EVENT.FORGET_PASSWORD
    }
    // 找回密码，取this.props.prevalue.e 
    this.props.rootStore.getVerifyCodeByEmail({email: this.props.authenticateStore.userInfo.email || this.props.prevalue.e || '', event: event}).then(rsp => {
      if(rsp.code === 0){
        message.success('验证码已发送邮箱')
      }else{
        message.error('验证码发送遇到错误')
      }
    }).catch(err => {
      message.error('验证码发送遇到错误')
    })
    
    let countDown = this.state.countDown
    //todo 调接口发送验证码
    this.setState({disable: true})
    interval = setInterval(() => {
      if(this.state.countDown === 0){
        clearInterval(interval)
        this.setState({disable: false, countDown: 60})
      }else{
        this.setState({countDown: --countDown})
      }
    }, 1000)
  }

  componentWillUnmount(){
    clearInterval(interval)
  }
  render() {
    return (
      <div>
          <Row>
            <Col>验证码：</Col>
          </Row>
          <Row className="pdtb10">
            <Col>
              <Input
                placeholder="请输入验证码"
                onChange={this.props.handleInputChange.bind(this, 'verify')}
                style={{width: '150px'}}
              />
              <Button type="primary" style={{marginTop: '0', marginLeft: '30px'}} disabled={this.state.disable} onClick={this.handleSend}>获取验证码{this.state.disable && `(${this.state.countDown})`}</Button>
            </Col>
          </Row>
      </div>
    )
  }
}
