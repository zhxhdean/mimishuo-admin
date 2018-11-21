import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
const SubMenu = Menu.SubMenu
export default class index extends Component {
  render() {
    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4']}
        
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="home" />
              <span>
                首页
              </span>
            </span>
          }
        >
          <Menu.Item key="11"><Link to="/index">我的面板</Link></Menu.Item>
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
          <Menu.Item key="21"><Link to="/secret">秘密列表</Link></Menu.Item>
          <Menu.Item key="22">搜索</Menu.Item>
          <Menu.Item key="23">newsletter</Menu.Item>
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
          <Menu.Item key="32"><Link to="/changepassword">密码修改</Link></Menu.Item>
          <Menu.Item key="33">在线充值</Menu.Item>
          <Menu.Item key="34">充值记录</Menu.Item>
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
          <Menu.Item key="41">关键字屏蔽</Menu.Item>
          <Menu.Item key="42">标签设置</Menu.Item>
        </SubMenu>
      </Menu>
    )
  }
}
