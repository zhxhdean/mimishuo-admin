import React, { Component } from 'react'
import { Divider, Card,Row, Col } from 'antd'
import './index.less'
export default class index extends Component {
  render() {
    return (
      <div className="recharge-page">
        <h2>在线充值</h2>
        <Divider />
        <div className="msg"><strong>选择套餐</strong> <span>一次性购买1年以上服务请咨询客服：<strong>(021)-400-90-1898</strong></span></div>
        
        <div className="body">

          <div style={{width: '75%'}} className="price-item">
          <span>请选择您需要购买的套餐方案：</span>
        <Row style={{marginTop: '10px'}}>
          <Col span={8} offset={0}>
            <Card
            bordered={false} 
              title="1年套餐"
              headStyle={{ fontSize: '30px', textAlign: 'center' }}
            >
            <div className="content">
              <p className="price">
                ￥3999.00 <span>￥5500.00</span>
              </p>
              <p>365天</p>
              </div>
            </Card>
          </Col>
          <Col span={8} offset={0}>
            <Card
            bordered={false} 
              title="6个月套餐"
              headStyle={{ fontSize: '30px', textAlign: 'center' }}
            >
            <div className="content">
              <p className="price">
                ￥3999.00 <span>￥5500.00</span>
              </p>
              <p>180天</p>
              </div>
            </Card>
          </Col>
          <Col span={8}offset={0}>
            <Card
            bordered={false} 
              title="3个月套餐"
              headStyle={{ fontSize: '30px', textAlign: 'center' }}
            >
            <div className="content">
              <p className="price">
                ￥3999.00 <span>￥5500.00</span>
              </p>
              <p>90天</p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={0}>
            <Card
            bordered={false} 
              title="2个月套餐"
              headStyle={{ fontSize: '30px', textAlign: 'center' }}
            >
            <div className="content">
              <p className="price">
                ￥3999.00 <span>￥5500.00</span>
              </p>
              <p>60天</p>
              </div>
            </Card>
          </Col>
          <Col span={8} offset={0}>
            <Card
            bordered={false} 
              title="1个月套餐"
              headStyle={{ fontSize: '30px', textAlign: 'center' }}
            >
            <div className="content">
              <p className="price">
                ￥3999.00 <span>￥5500.00</span>
              </p>
              <p>30天</p>
              </div>
            </Card>
          </Col>
          <Col span={8}offset={0}>
            <Card
            bordered={false} 
              title="1周套餐"
              headStyle={{ fontSize: '30px', textAlign: 'center' }}
            >
            <div className="content">
              <p className="price">
                ￥3999.00 <span>￥5500.00</span>
              </p>
              <p>7天</p>
              </div>
            </Card>
          </Col>
        </Row>
          </div>

          <div style={{width: '25%', paddingLeft: '40px'}}>
          <span>FAQ：</span>
          <Row style={{marginTop: '10px'}}>
            <Col><strong>最划算的套餐方案</strong></Col>
          </Row>
          <Row>
            <Col>按年购买，最大折扣，且享有最优质的售后支持服务。</Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col><strong>如何申请发票</strong></Col>
          </Row>
          <Row>
            <Col>完成付款后，在"用户中心-我的订单"中申请发票。</Col>
          </Row>
          <Row style={{marginTop: '10px'}}>
            <Col><strong>发票寄送</strong></Col>
          </Row>
          <Row>
            <Col>我们将提交发票申请后3-5个工作日内以快递方式寄出，寄出后会发包含将时间及快递号的邮件至您的账号通知邮箱，请注意查收。</Col>
          </Row>
          </div>
        </div>
        
      </div>
    )
  }
}
