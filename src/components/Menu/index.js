/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'
import {DEFAULT_PAGESIZE} from '../../common/constant'
const SubMenu = Menu.SubMenu



@inject('secretListStore','newsLetterStore')
@observer
class index extends Component {

  handlePageIndex (type) {
    if(type === 'secret'){
      this.props.secretListStore.getList(1, DEFAULT_PAGESIZE)
    }else if(type === 'newsletter'){
      this.props.newsLetterStore.getList(1, DEFAULT_PAGESIZE)
    }
    
  }

  render() {
    const path = this.props.history.location.pathname
    let key = '11'
    switch (path) {
      case '/index':
        key = '11'
        break
      case '/userinfo':
        key = '31'
        break
      case '/changepassword':
        key = '32'
        break
      case '/recharge':
        key = '33'
        break
      case '/payment':
        key = '33'
        break
      case '/order':
        key = '34'
        break
      case '/secret':
        key = '21'
        break
      case '/newsletter':
        key = '23'
        break
      case '/shieldedword':
        key = '41'
        break
      case '/wordlibrary':
        key = '41'
        break
      case '/tags':
        key = '42'
        break
      case '/address':
        key = '43'
        break
      case '/address/add':
        key = '43'
        break
      case '/systemconfig':
        key = '44'
        break
      case '/topic/1':
        key = '51'
        break
      case '/topic/2':
        key = '52'
        break
      case '/topic/3':
        key = '53'
        break
      default:
        key = '11'
        break
    }
    if (path.includes('/secret/detail')) {
      key = '21'
    }
    if (path.includes('/newsletter/detail')) {
      key = '23'
    }
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    console.log(path)
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
        selectedKeys={[key]}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="home" />
              <span>首页</span>
            </span>
          }
        >
          <Menu.Item key="11">
            <Link to="/index">我的面板</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="insurance" />
              <span>秘密管理</span>
            </span>
          }
        >
          <Menu.Item key="21">
            <Link to="/secret" onClick={this.handlePageIndex.bind(this, 'secret')}>秘密列表</Link>
          </Menu.Item>
          {/* <Menu.Item key="22">搜索</Menu.Item> */}
          <Menu.Item key="23">
            <Link to="/newsletter" onClick={this.handlePageIndex.bind(this, 'newsletter')}>周刊管理</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub5"
          title={
            <span>
              <Icon type="sound" />
              <span>话题管理</span>
            </span>
          }
        >
          <Menu.Item key="51">
            <Link to="/topic/1" >话题列表</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="user" />
              <span>用户中心</span>
            </span>
          }
        >
          <Menu.Item key="31">
            <Link to="/userinfo">用户信息</Link>
          </Menu.Item>
          <Menu.Item key="32">
            <Link to="/changepassword">密码修改</Link>
          </Menu.Item>
          <Menu.Item key="33"><Link to="/recharge">在线充值</Link></Menu.Item>
          <Menu.Item key="34"><Link to="/order">我的订单</Link></Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span>
              <Icon type="setting" />
              <span>系统设置</span>
            </span>
          }
        >
          <Menu.Item key="41">
            <Link to="/shieldedword">屏蔽词管理</Link>
          </Menu.Item>
          <Menu.Item key="42"><Link to="/tags">标签设置</Link></Menu.Item>
          <Menu.Item key="43"><Link to="/address">公司地址管理</Link></Menu.Item>
          <Menu.Item key="44"><Link to="/systemconfig">设置配置</Link></Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}

export default(withRouter(index))

