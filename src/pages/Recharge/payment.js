import React, { Component } from 'react'
import { Divider, Row, Col, Tabs, Icon } from 'antd'
import './index.less'
import { inject, observer } from 'mobx-react'
const TabPane = Tabs.TabPane

let interval
@inject('rechargeStore')
@observer
export default class Payment extends Component {
  componentDidMount() {
    // todo 查询订单状态
    interval = setInterval(() => {
      this.props.rechargeStore.getOrderStatus().then(rsp => {
        if (rsp.code === 0 && rsp.data.status === '已支付') {
          clearInterval(interval)
          // todo 跳订单详情页
        }
      })
    }, 1000)
  }

  render() {
    const { orderInfo } = this.props.rechargeStore

    return (
      <div className="payment-page recharge-page">
        <h2>在线支付</h2>
        <Divider />
        <div className="msg">
          <strong>订单号：{orderInfo.orderId}</strong>
        </div>
        <Row>
          <Col span={2} offset={1}>
            套餐名称：
          </Col>
          <Col span={2}>{orderInfo.packageName}</Col>

          <Col span={2} offset={2}>
            套餐价格：
          </Col>
          <Col span={2}>￥{orderInfo.packagePrice}</Col>

          <Col span={2} offset={2}>
            有效期至：
          </Col>
          <Col span={2}> {orderInfo.expiresDate}</Col>
        </Row>

        <Tabs type="card" className="pay-card">
          <TabPane
            tab={
              <span>
                <Icon type="wechat" />
                微信支付
              </span>
            }
            key="1"
          >
            支付金额：<span className="red">￥{orderInfo.payPrice}</span>
            <div className="qrcode">此处存放二维码</div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}
