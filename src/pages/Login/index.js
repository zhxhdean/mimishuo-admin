/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Button, Input, message, Icon,Modal, Checkbox } from 'antd'
import { observer, inject } from 'mobx-react'
import { STATUS } from '../../common/constant'
import './index.less'
@inject('loginStore', 'rootStore', 'authenticateStore')
@observer
export default class index extends Component {
  state = {
    checked: false,
  };
  handleInputChange = (name, e) => {
    this.props.loginStore.setValue(name, e.target.value)
  }

  handleLogin = () => {
    if (this.valid()) {
      this.props.rootStore.showLoading()
      this.props.loginStore
        .login()
        .then(rsp => {
          if (rsp.code === 0) {
            message.success('登录成功')
            this.props.authenticateStore.setStatus(STATUS.LOGINED)
            this.props.history.push({ pathname: '/' })
          } else {
            message.error(rsp.content || '登录错误')
          }
          this.props.rootStore.hideLoading()
        })
        .catch(err => {
          this.props.rootStore.hideLoading()
        })
    }
  }

  handleAgree = (e) => {
    this.setState({
      checked: e.target.checked,
    });
  }

  // todo 校验表单数据
  valid = () => {
    if (!this.state.checked) {
      message.error('请同意“秘密说网服务协议及免责条款”')
      return false
    }
    if (!this.props.loginStore.user.userName) {
      message.error('请输入用户名')
      return false
    }
    if (!this.props.loginStore.user.passWord) {
      message.error('请输入密码')
      return false
    }
    return true
  }

  render() {
    const { user } = this.props.loginStore
    const { loading } = this.props.rootStore
    return (
      <div className="login-page">
        <div className="form">
          <h2>登　录</h2>
          <ul>
            <li>
              <span>用户名：</span>
              <Input
                style={{ width: '300px' }}
                prefix={<Icon type="user" />}
                value={user.userName}
                defaultValue={user.userName}
                placeholder="请输入用户名"
                onChange={this.handleInputChange.bind(this, 'userName')}
              />
            </li>
            <li>
              <span>密　码：</span>
              <Input
                style={{ width: '300px' }}
                prefix={<Icon type="lock" />}
                type="passWord"
                value={user.passWord}
                placeholder="请输入密码"
                onPressEnter={this.handleLogin}
                onChange={this.handleInputChange.bind(this, 'passWord')}
              />
            </li>
            <li>
              <Button
                onClick={this.handleLogin}
                loading={loading}
                type="primary"
              >
                登录
              </Button>
            </li>
            <li>
              <Checkbox onChange={this.handleAgree} checked={this.state.checked} /> 我接受 <a href="./static/agree.html" target="_blank">秘密说网服务协议 及 免责条款</a>
            </li>
            <li className="pright"><Link to="/forget">忘记密码？</Link></li>
          </ul>
        </div>
      </div>
    )
  }
}
