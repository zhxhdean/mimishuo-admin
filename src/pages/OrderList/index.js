import React, { Component } from 'react'
import { Table, Divider, Modal, Col, Row, message } from 'antd'
import { observer, inject } from 'mobx-react'
import { ORDER_STATUS, INVOICE_STATUS } from '../../common/constant'

import Invoice from '../../components/Invoice'
@inject('rootStore', 'orderListStore')
@observer
export default class index extends Component {
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.orderListStore
      .getList()
      .then(rsp => {
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        this.props.rootStore.hideLoading()
      })
  }

  handleInvoiceModal = record => {
    this.props.orderListStore.showInvoiceModal(record)
  }

  handleInvoiceInfo = record => {
    this.props.rootStore.showLoading()
    this.props.orderListStore
      .getInvoice(record)
      .then(rsp => {
        this.props.rootStore.hideLoading()
        if (rsp.code === 0) {
          const invoiceInfo = this.props.orderListStore
          Modal.info({
            width: 540,
            title: '发票信息',
            content: (
              <div>
                <Row>
                  <Col span={6}>商品名称：</Col>
                  <Col span={18}>{invoiceInfo.packageName}</Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Col span={6}>发票类型：</Col>
                  <Col span={18}>增值税普通发票</Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Col span={6}>发票金额(元)：</Col>
                  <Col span={18}>￥{invoiceInfo.price}</Col>
                </Row>
                <Row style={{ marginTop: '10px' }} type="flex" align="middle">
                  <Col span={6}>发票抬头：</Col>
                  <Col span={18}>{invoiceInfo.title}</Col>
                </Row>
                <Row style={{ marginTop: '10px' }} type="flex" align="middle">
                  <Col span={6}>税号：</Col>
                  <Col span={18}>{invoiceInfo.taxCode}</Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                  <Col span={6}>邮寄地址：</Col>
                  <Col span={18}>
                  {invoiceInfo.address}
                  </Col>
                </Row>
                <Row style={{ marginTop: '20px' }}>
                  <Col span={18} offset={6}>
                    <span className="red">
                      以上发票信息如有疑问请联系秘密说客服人员。
                      <br />
                      联系电话：021-40082123
                    </span>
                  </Col>
                </Row>
              </div>
            )
          })
        } else {
          message.error('发票信息查询失败')
        }
      })
      .catch(err => {
        this.props.rootStore.hideLoading()
        message.error('发票信息查询失败')
      })
    
  }

  render() {
    const columns = [
      {
        dataIndex: 'orderId',
        title: '订单号'
      },
      {
        dataIndex: 'packageName',
        title: '套餐名称'
      },
      {
        dataIndex: 'price',
        title: '金额（元）'
      },
      {
        dataIndex: 'createTime',
        title: '创建时间'
      },
      {
        dataIndex: 'payTime',
        title: '支付时间'
      },
      {
        dataIndex: 'status',
        title: '订单状态',
        render: text => ORDER_STATUS.get(text)
      },
      {
        dataIndex: 'invoiceStatus',
        title: '发票状态',
        render: (text, record) =>
          record.status === 2 && INVOICE_STATUS.get(text)
      },
      {
        dataIndex: 'action',
        title: '操作',
        render: (text, record) => {
          return (
            <span>
              {/*eslint-disable no-script-url*/}
              {record.status === 1 ? (
                <a href="javascript:void(0);">继续支付</a>
              ) : null}
              {/*eslint-disable no-script-url*/}
              {record.status === 2 && record.invoiceStatus === 1 ? (
                <a
                  href="javascript:void(0);"
                  onClick={this.handleInvoiceModal.bind(this, record)}
                >
                  发票申请
                </a>
              ) : null}
              {/*eslint-disable no-script-url*/}
              {record.status === 2 && record.invoiceStatus !== 1 ? (
                <a
                  href="javascript:void(0);"
                  onClick={this.handleInvoiceInfo.bind(this, record)}
                >
                  发票信息
                </a>
              ) : null}
            </span>
          )
        }
      }
    ]
    const { orderList } = this.props.orderListStore
    return (
      <div>
        <h2>我的订单</h2>
        <Divider />
        <Table rowKey="orderId" columns={columns} dataSource={orderList} />

        <Invoice />
      </div>
    )
  }
}
