import React, { Component } from 'react'
import { Button, Input, message, Icon,Row,Col,Divider } from 'antd'
import { observer, inject } from 'mobx-react'

import VerifyCode from '../../components/VerifyCode'
import './index.less'
@inject('forgetPasswordStore', 'rootStore')
@observer
export default class index extends Component {
  handleInputChange = (name, e) => {
    this.props.forgetPasswordStore.setValue(name, e.target.value)
  }

  handleLogin = () => {
    if (this.valid()) {
      this.props.rootStore.showLoading()
      this.props.forgetPasswordStore
        .changePassword()
        .then(rsp => {
          if (rsp.code === 0) {
            message.success('新密码设置成功')
            setTimeout(() => {
              this.props.history.push({ pathname: '/login' })
            }, 2000)
            
          } else {
            message.error(rsp.content || '新密码设置错误')
          }
          this.props.rootStore.hideLoading()
        })
        .catch(err => {
          this.props.rootStore.hideLoading()
          message.error('新密码设置错误')
        })
    }
  }

  // todo 校验表单数据
  valid = () => {
    const {user} = this.props.forgetPasswordStore
    if (!user.userName) {
      message.error('请输入登录账号')
      return false
    }
    if (!user.verify) {
      message.error('请输入验证码')
      return false
    }
    if (!user.userName) {
      message.error('请输入登录账号')
      return false
    }
    if (!user.newPassword) {
      message.error('请输入新的密码')
      return false
    }
    if (!user.confirmPassword) {
      message.error('请输入确认密码')
      return false
    }
    if(user.newPassword !== user.confirmPassword){
      message.error('两次密码不一致')
      return false
    }
    return true
  }

  render() {
    const { user } = this.props.forgetPasswordStore
    const { loading } = this.props.rootStore
    return (
      <div className="forget-page">
        <div className="form">
          <h2>找回密码</h2>
          <Divider/>
          <div>
          <Row>
            <Col>登录账号：</Col>
          </Row>
          <Row className="pdtb10">
            <Col>
              <Input
                style={{ width: '300px' }}
                prefix={<Icon type="user" />}
                value={user.userName}
                placeholder="请输入登录账号"
                onChange={this.handleInputChange.bind(this, 'userName')}
              />
            </Col>
          </Row>
          <VerifyCode handleInputChange={this.handleInputChange} prevalue={{v:user.userName,t:'请先输入登录账号',c: 'forget',e: user.userName}}/>
          <Row>
            <Col>设置密码：</Col>
          </Row>
          <Row className="pdtb10">
            <Col>
              <Input
                style={{ width: '300px' }}
                prefix={<Icon type="lock" />}
                type="password"
                value={user.newPassword}
                placeholder="请输入新的密码"
                onChange={this.handleInputChange.bind(this, 'newPassword')}
              />
            </Col>
          </Row>
          <Row>
            <Col>确认密码：</Col>
          </Row>
          <Row className="pdtb10">
            <Col>
              <Input
                style={{ width: '300px' }}
                prefix={<Icon type="lock" />}
                type="password"
                value={user.confirmPassword}
                placeholder="请输入新的密码"
                onChange={this.handleInputChange.bind(this, 'confirmPassword')}
              />
            </Col>
          </Row>
          <Row>
            <Col />
          </Row>
          <Row className="pdtb10">
            <Col>
              <Button
                onClick={this.handleLogin}
                loading={loading}
                type="primary"
              >
                确定修改
              </Button>
              <Button
                onClick={() => this.props.history.push({ pathname: '/login' })}
              >
                返回登录
              </Button>
            </Col>
          </Row>
          </div>
        </div>
      </div>
    )
  }
}
