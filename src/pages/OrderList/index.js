import React, { Component } from 'react'
import { Table, Divider } from 'antd'
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

  handleInvoiceModal = (record) => {
    this.props.orderListStore.showInvoiceModal(record)
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
                <a href="javascript:void(0);" onClick={this.handleInvoiceModal.bind(this, record)}>发票申请</a>
              ) : null}
              {/*eslint-disable no-script-url*/}
              {record.status === 2 && record.invoiceStatus !== 1 ? (
                <a href="javascript:void(0);">发票信息</a>
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
