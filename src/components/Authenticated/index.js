import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {STATUS} from '../../common/constant'

import {observer,inject} from 'mobx-react'

@inject('authenticateStore')
@observer
export default class index extends Component {

  componentDidMount(){
    // 获取用户的登录状态
    this.props.authenticateStore.getStatus()
  }


  render() {
    const status = this.props.authenticateStore.status
    if(status === STATUS.LOGINED){
      return (this.props.children)
    }else if(status === STATUS.UNLOGIN){
      return <Redirect to="/login" />
    }else {
      return `校验中`
    }
  }
}
