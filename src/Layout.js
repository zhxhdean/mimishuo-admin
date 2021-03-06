/*eslint no-undef: "off"*/ 
/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import {Layout, Icon, Tooltip} from 'antd'
import {router} from './router'
import LeftMenu from './components/Menu'
import MyHeader from './components/Header'
import Logo from './logo.png'
import Suggest from './components/Suggest'
const { Header, Sider, Content } = Layout



export default class Index extends Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
    }  
  }
  
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo"><img src={Logo} alt="秘密说管理系统"/></div>
          <LeftMenu />
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
            <Tooltip placement="right" title={this.state.collapsed ? '展开菜单' : '收起菜单'}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
            </Tooltip>
            <MyHeader />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 600 }}>
            {router}
            <Suggest />
          </Content>
        </Layout>
      </Layout>
    )
  }
}
