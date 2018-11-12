import React, { Component } from 'react'
import {Button, Input, message} from 'antd'
import {observer,inject} from 'mobx-react'
import {STATUS} from '../../common/constant'

@inject('loginStore','rootStore','authenticateStore')
@observer
export default class index extends Component {

  
  handleInputChange = (name, e) => {
    this.props.loginStore.setValue(name, e.target.value)
  }
  
  handleLogin = () => {
    this.props.rootStore.showLoading()
    this.props.loginStore.login().then(rsp => {
      if(rsp.code === 0){
        message.success('登录成功')
        this.props.authenticateStore.setStatus(STATUS.LOGINED)
        this.props.history.push({pathname: '/'})
      }
      this.props.rootStore.hideLoading()
    }).catch(err => {
      this.props.rootStore.hideLoading()
    })
  }
  render() {
    const {user} = this.props.loginStore
    const {loading} = this.props.rootStore
    return (
      <div>
        {this.props.history.location.pathname}
        登录页面<br/>
        用户名：<Input value={user.userName} onChange={this.handleInputChange.bind(this, 'userName')}/>
        密码：<Input type="passWord" value={user.passWord} onChange={this.handleInputChange.bind(this, 'passWord')}/>
        <Button onClick={this.handleLogin} loading={loading}>登录</Button>
      </div>
    )
  }
}
