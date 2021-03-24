/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { Divider, Input, Button,message } from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react'
import util from '../../common/util'
@inject('passWordStore','rootStore')
@observer
export default class index extends Component {
  handleInputChange = (name, e) => {
    this.props.passWordStore.setValue(name, e.target.value)
  }

  handleSubmit = () => {
    console.log(this.props.passWordStore)
    if(this.valid()){
      this.props.rootStore.showLoading()
      this.props.passWordStore.changePassWord().then(rsp => {
        if(rsp.code === 0){
          message.success('密码修改成功')
        }else{
          message.error(rsp.content)
        }
        this.props.rootStore.hideLoading()
      }).catch(err => {
        message.error('遇到错误')
        this.props.rootStore.hideLoading()
      })
    }
  }

  valid = () => {
    if(!this.props.passWordStore.oldPassword){
      message.error('请输入原密码', 1.5)
      return false
    }
    if(!this.props.passWordStore.newPassword){
      message.error('请输入新密码', 1.5)
      return false
    }
    if(!this.props.passWordStore.confirmPassword){
      message.error('请输入确认密码', 1.5)
      return false
    }
    if(this.props.passWordStore.newPassword !== this.props.passWordStore.confirmPassword){
      message.error('两次密码不一致', 1.5)
      return false
    }
    if(!util.validatePassWord(this.props.passWordStore.newPassword)){
      message.error('新密码必须且只能包含数字、字母，长度在8-12位', 1.5)
      return false
    }
    if(!util.validatePassWord(this.props.passWordStore.confirmPassword)){
      message.error('确认密码必须且包含数字、字母，长度在8-12位', 1.5)
      return false
    }
    return true
  }

  render() {
    const {loading} = this.props.rootStore
    return (
      <div className="change-password">
        <h2>修改密码</h2>
        <Divider />
        <ul>
          <li>
            <label>原密码：</label>
            <Input
              type="password"
              className="password"
              placeholder="请输入原始密码"
              onChange={this.handleInputChange.bind(this, 'oldPassword')}
            />
          </li>
          <li>
            <label>新密码：</label>
            <Input
              type="password"
              className="password"
              placeholder="密码需包含数字、大小写字母，长度8-12位"
              onChange={this.handleInputChange.bind(this, 'newPassword')}
            />
          </li>
          <li>
            <label>确认密码：</label>
            <Input
              type="password"
              className="password"
              placeholder="密码需包含数字、大小写字母，长度8-12位"
              onChange={this.handleInputChange.bind(this, 'confirmPassword')}
            />
          </li>
          <li>
            <Button type="primary" onClick={this.handleSubmit} loading={loading}>
              确定修改
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}
