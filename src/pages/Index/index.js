import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
export default class index extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <h3>已完成的页面</h3>
          </Col>
          <Col span={12}>
            <h3>未开始的页面</h3>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            {' '}
            <Link to="/userinfo">用户中心</Link>
            <br />
            <Link to="/changepassword">密码修改</Link>
            <br />
            <Link to="/secret">秘密列表</Link>
            <br />
            <Link to="/secret/detail/1">秘密详情</Link>
            <br />
            <Link to="/newsletter">newsletter</Link>
            <br />
            <Link to="/newsletter/detail/1">newsletter详情</Link><br/>
            <Link to="/shieldedword">关键字屏蔽（列表、搜索、新增）</Link><br/>
          </Col>
          <Col span={12}>
         
          <Link to="/#">在线充值</Link><br/>
          <Link to="/#">充值记录</Link><br/>
          
          <Link to="/#">标签设置（列表、搜索、新增）</Link><br/>
          <Link to="/#">系统配置（通知手机、邮箱）</Link><br/>
          <Link to="/#">公司地址管理</Link><br/>
          </Col>
        </Row>
      </div>
    )
  }
}
