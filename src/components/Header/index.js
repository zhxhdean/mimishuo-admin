import React, { Component } from 'react'
import {Icon} from 'antd'
import './index.less'
import {observer,inject} from 'mobx-react'

@inject('loginStore','authenticateStore')
@observer
export default class index extends Component {
  render() {
    const {userInfo} = this.props.authenticateStore
    return (
      <div className="header-right">
        {userInfo.company}
        <Icon type="logout" onClick={this.props.loginStore.logout}/>
      </div>
    )
  }
}
