/*eslint no-undef: "off"*/ 
import React, { Component } from 'react'
import { Divider, Card, Row, Col, Modal,message } from 'antd'
import './index.less'
import { observer,inject } from 'mobx-react';

@inject('rootStore','rechargeStore')
@observer
export default class index extends Component {
  handleChoicePackage = (type,name) => {
    const self = this
    Modal.confirm({ 
      title: `请您确定要购买:${name}套餐？`,
      onOk(){
        console.log('确定购买'+ type)
        //todo 调api，生成订单, 跳转支付页面
        self.props.history.push({pathname: '/payment'})
        // self.props.rootStore.showLoading()
        // self.props.rechargeStore.createOrder(type).then(rsp => {
        //   self.props.rootStore.hideLoading()
        //   if(rsp.code === 0){
        //     message.success('订单创建成功')
        //     //todo 去支付页面
        //   }else{
        //     message.error('订单创建失败')
        //   }
        // }).catch(err => {
        //   self.props.rootStore.hideLoading()
        //   message.error('订单创建失败')
        // })
      }
    })
  }

  render() {
    return (
      <div className="recharge-page">
        <h2>在线充值</h2>
        <Divider />
        <div className="msg">
          <strong>选择套餐</strong>{' '}
          <span>
            一次性购买1年以上服务请咨询客服：<strong>(021)-400-90-1898</strong>
          </span>
        </div>

        <div className="body">
          <div style={{ width: '75%' }} className="price-item">
            <span>请选择您需要购买的套餐方案：</span>
            <Row style={{ marginTop: '10px' }}>
              <Col span={8} offset={0}>
                <Card
                onClick={this.handleChoicePackage.bind(this, 1, '1年')}
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
                onClick={this.handleChoicePackage.bind(this, 2, '6个月')}
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
              <Col span={8} offset={0}>
                <Card
                onClick={this.handleChoicePackage.bind(this, 3, '3个月')}
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
                onClick={this.handleChoicePackage.bind(this, 4, '2个月')}
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
                onClick={this.handleChoicePackage.bind(this, 5, '1个月')}
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
              <Col span={8} offset={0}>
                <Card
                onClick={this.handleChoicePackage.bind(this, 6, '1周')}
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

          <div style={{ width: '25%', paddingLeft: '40px' }}>
            <span>FAQ：</span>
            <Row style={{ marginTop: '10px' }}>
              <Col>
                <strong>最划算的套餐方案</strong>
              </Col>
            </Row>
            <Row>
              <Col>按年购买，最大折扣，且享有最优质的售后支持服务。</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col>
                <strong>如何申请发票</strong>
              </Col>
            </Row>
            <Row>
              <Col>完成付款后，在"用户中心-我的订单"中申请发票。</Col>
            </Row>
            <Row style={{ marginTop: '10px' }}>
              <Col>
                <strong>发票寄送</strong>
              </Col>
            </Row>
            <Row>
              <Col>
                我们将提交发票申请后3-5个工作日内以快递方式寄出，寄出后会发包含将时间及快递号的邮件至您的账号通知邮箱，请注意查收。
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
