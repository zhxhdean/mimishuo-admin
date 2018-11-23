import React, { Component } from 'react'
import { Drawer, Table, Divider,message,Button,Input,Modal } from 'antd'
import { Link } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

import './index.less'
const TextArea = Input.TextArea
@inject('rootStore', 'pendingListStore')
@observer
export default class index extends Component {

  handleRemove = record => {
    this.props.pendingListStore.remove(record)
  }

  handleClearAll = () => {
    const self = this
    Modal.confirm({
      title: '提示',
      content: '确定要清除全部的数据？',
      onOk(){
        self.props.pendingListStore.clear()
        message.success('已清除全部')
      }
    })
  }

  handleInputChange = (name, e) => {
    this.props.pendingListStore.setValue(name, e.target.value)
  }

  handleSubmit = () => {
    if(!this.props.pendingListStore.title){
      message.error('请输入newsletter的标题')
      return
    }
    if(!this.props.pendingListStore.content){
      message.error('请输入newsletter的内容')
      return
    }
    if(this.props.pendingListStore.pendingList.length === 0){
      message.error('请添加秘密到清单中')
      return
    }
    this.props.pendingListStore.publish().then(rsp => {
      if(rsp.code === 0){
        message.success('清单已发布成功，将在周五推送到关注用户')
      }else{
        message.error(rsp.content)
      }
    })

  }


  render() {
    const { pendingList } = this.props.pendingListStore || []
    // 不知道为什么pendingList 直接在table上不会实时更新！！
    const dataSource = pendingList.map(item => item)
    const columns = [
      {
        dataIndex: 'title',
        key: 'id',
        title: '标题',
        width:340,
        render: (text, record) => {
          return(<div><span  className="black">{record.title}</span><br/>{record.createTime}</div>)
        }
      },
      {
        title: '操作',
        render: (text, record) => {
          return(<span>
            <Link to={{ pathname: `/secret/detail/${record.id}` }}>详情</Link>
            <Divider type="vertical" />
            <a href="javascript:;" onClick={this.handleRemove.bind(this, record)}>移除</a>
          </span>)
        }
      }
    ]
    return (
      <Drawer
        width={500}
        title={`NewsLetter发布清单(${dataSource.length})`}
        placement="right"
        closable={false}
        visible={this.props.rootStore.newsletterModal}
        onClose={this.props.rootStore.hideNewsLetter}
      >
        <div className="news-letter-pending-list">
          <Button type="primary" onClick={this.handleSubmit}>确定发布</Button><Button className="clear" onClick={this.handleClearAll}>清除全部</Button>
          <Divider/>
          <Input placeholder="请输入newsletter的标题" onChange={this.handleInputChange.bind(this, 'title')}/>
          <TextArea rows={3} placeholder="请输入newsletter内容,200字以内" onChange={this.handleInputChange.bind(this, 'content')}></TextArea>
          <Table
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            scroll={{y: 350}}
            rowKey="id"
          />
        </div>
      </Drawer>
    )
  }
}
