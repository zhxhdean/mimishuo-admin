import React, { Component } from 'react'
import { Divider,Button, Table,Tooltip,message,Modal } from 'antd'
import { inject, observer } from 'mobx-react';

@inject('addressStore', 'rootStore')
@observer
export default class index extends Component {

  componentDidMount(){
    this.props.rootStore.showLoading()
    this.props.addressStore.getList().then(rsp => {
      this.props.rootStore.hideLoading()
      if(rsp.code !==0 ){
        message.error('数据加载失败')
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('数据加载失败')
    })
  }

  handleDelete = record => {
    const self = this
    Modal.confirm({
      title: '提示',
      content: '请确定要删除该地址？',
      onOk(){
        self.props.rootStore.showLoading()
        self.props.addressStore.delete(record.id).then(rsp => {
          self.props.rootStore.hideLoading()
          if(rsp.code === 0){
            message.success('删除成功')
          }else{
            message.error('操作错误')
          }
        }).catch(err => {
          self.props.rootStore.hideLoading()
          message.error('操作错误')
        })
      }
    })
  }

  handleToggle = record => {
    const self = this
    const msg = record.status ? '停用' : '启用'
    Modal.confirm({
      title: '提示',
      content: `请确定要${msg}该地址？`,
      onOk(){
        self.props.rootStore.showLoading()
        self.props.addressStore.edit(record.id, !record.status).then(rsp => {
          self.props.rootStore.hideLoading()
          if(rsp.code === 0){
            message.success(`${msg}成功`)
          }else{
            message.error('操作错误')
          }
        }).catch(err => {
          self.props.rootStore.hideLoading()
          message.error('操作错误')
        })
      }
    })
  }

  render() {
    const {addressList} = this.props.addressStore
    const columns = [{
      title: '序号',
      dataIndex: 'id'
    },{
      title: '详情地址',
      dataIndex: 'address'
    },{
      title: '状态',
      dataIndex: 'status',
      render: text => {
        if(text){
          return '启用中'
        }else{
          return '已停用'
        }
      }
    },{
      title: '操作',
      render: (text, record) => {
        return(<span>
          <Tooltip title="删除">
          { /*eslint-disable no-script-url*/}
            <a href="javascript:void(0);" onClick={this.handleDelete.bind(this, record)}>删除</a> 
          </Tooltip>
          <Divider type="vertical" />
 
          { /*eslint-disable no-script-url*/}
            <a href="javascript:void(0);" onClick={this.handleToggle.bind(this, record)}>{record.status ? '停用' : '启用'}</a> 
        
        </span>)
      }
    }]
    return (
      <div>
        <h2>公司地址管理</h2>
        <Divider />
        <div>
        <Button type="primary" onClick={() => this.props.history.push({pathname: '/address/add'})}>新增地址</Button>
        </div>
        <Table style={{marginTop: '20px'}} columns={columns} dataSource={addressList} pagination={false}/>
      </div>
    )
  }
}
