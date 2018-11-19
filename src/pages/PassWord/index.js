import React, { Component } from 'react'
import { Divider, Input, Button,message } from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react'
import util from '../../common/util'
@inject('passWordStore')
@observer
export default class index extends Component {
  handleInputChange = (name, e) => {
    this.props.passWordStore.setValue(name, e.target.value)
  }

  handleSubmit = () => {
    console.log(this.props.passWordStore)
    if(this.valid()){
      this.props.passWordStore.changePassWord().then(rsp => {
        if(rsp.code === 0){
          message.success('密码修改成功')
        }else{
          message.error(rsp.content)
        }
      })
    }
  }

  valid = () => {
    if(!this.props.passWordStore.oldPassWord){
      message.error('请输入原密码', 1.5)
      return false
    }
    if(!this.props.passWordStore.newPassWord){
      message.error('请输入新密码', 1.5)
      return false
    }
    if(!this.props.passWordStore.confirmPassWord){
      message.error('请输入确认密码', 1.5)
      return false
    }
    if(this.props.passWordStore.newPassWord !== this.props.passWordStore.confirmPassWord){
      message.error('两次密码不一致', 1.5)
      return false
    }
    if(!util.validatePassWord(this.props.passWordStore.newPassWord)){
      message.error('新密码必须且只能包含数字、字母，长度在8-12位', 1.5)
      return false
    }
    if(!util.validatePassWord(this.props.passWordStore.confirmPassWord)){
      message.error('确认密码必须且包含数字、字母，长度在8-12位', 1.5)
      return false
    }
    return true
  }

  render() {
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
              onChange={this.handleInputChange.bind(this, 'oldPassWord')}
            />
          </li>
          <li>
            <label>新密码：</label>
            <Input
              type="password"
              className="password"
              onChange={this.handleInputChange.bind(this, 'newPassWord')}
            />
          </li>
          <li>
            <label>确认密码：</label>
            <Input
              type="password"
              className="password"
              onChange={this.handleInputChange.bind(this, 'confirmPassWord')}
            />
          </li>
          <li>
            <Button type="primary" onClick={this.handleSubmit}>
              确定修改
            </Button>
          </li>
        </ul>
      </div>
    )
  }
}
