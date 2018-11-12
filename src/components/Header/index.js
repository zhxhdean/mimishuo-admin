import React, { Component } from 'react'
import {Icon} from 'antd'
import './index.less'
import {observer,inject} from 'mobx-react'

@inject('loginStore')
@observer
export default class index extends Component {
  render() {
    const {userInfo} = this.props.loginStore
    return (
      <div>
        {userInfo.company}
        <Icon type="logout" onClick={this.props.loginStore.logout}/>
      </div>
    )
  }
}
