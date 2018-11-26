import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Icon, Tooltip} from 'antd'
import './index.less'
import {observer,inject} from 'mobx-react'

@inject('loginStore','authenticateStore')
@observer
export default class index extends Component {
  render() {
    const {userInfo} = this.props.authenticateStore
    return (
      <div className="header-right">
        <Link to="/userinfo"><Icon type="idcard" style={{fontSize: '14px'}}/> {userInfo.company}</Link>
        <Tooltip title="退出系统">
        <Icon type="logout" onClick={this.props.loginStore.logout}/>
        </Tooltip>
      </div>
    )
  }
}
