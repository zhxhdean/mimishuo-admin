import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'


// 包装页面，未登录的时候跳转至登录页面

const STATUS = {
  CHECKING: 'CHECKING',
  UNLOGIN: 'UNLOGIN',
  LOGINED: 'LOGINED',
}

export default class index extends Component {

  constructor(props){
    super(props)
    this.state = {
      logined: STATUS.CHECKING,
      user:{
        name: 'zhxh',
        company: '本来生活信息科技有限公司'
      }
    }
  }
  componentDidMount (){
    //todo 调api判断当前是否登陆状态
    this.setState({logined: STATUS.LOGINED})
  }

  render() {
    const status = this.state.logined
    if(status === STATUS.LOGINED){
      return (this.props.children)
    }else if(status === STATUS.UNLOGIN){
      return <Redirect to="/login" />
    }else {
      return `校验中`
    }
  }
}
