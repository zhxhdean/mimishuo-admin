/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Icon, Tooltip,Avatar} from 'antd'
import './index.less'
import {observer,inject} from 'mobx-react'

@inject('loginStore','authenticateStore')
@observer
export default class index extends Component {
  render() {
    const {userInfo} = this.props.authenticateStore
    return (
      <div className="header-right">
        <Link to="/userinfo"><Avatar style={{ backgroundColor: '#1890ff' }} icon="user" /> {userInfo.companyInfo.companyName}</Link>
        <Tooltip title="退出系统">
        <Icon type="logout" onClick={this.props.loginStore.logout}/>
        </Tooltip>
      </div>
    )
  }
}
