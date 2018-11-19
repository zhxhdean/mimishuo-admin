import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import {Divider} from 'antd'
@inject('userInformationStore')
@observer
export default class index extends Component {
  componentDidMount() {
    this.props.userInformationStore.getUserInformation(10)
  }
  render() {
    const { userInformation } = this.props.userInformationStore
    return (
      <div>
        <h2>用户信息</h2>
        <Divider/>
        <ul>
          <li>UID：{userInformation.uid}</li>
          <li>登录账号：{userInformation.userName}</li>
          <li>手机号：{userInformation.phone}</li>
          <li>企业名称：{userInformation.company}</li>
          <li>统一社会信用代码：{userInformation.creditCode}</li>
          <li>注册二维码</li>
        </ul>
        
      </div>
    )
  }
}
