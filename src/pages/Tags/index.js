import React, { Component } from 'react'
import { Divider, Tag, Icon, Tooltip, Input, message } from 'antd'
import { observer, inject } from 'mobx-react'

@inject('rootStore', 'tagsStore')
@observer
export default class index extends Component {
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.tagsStore
      .getList()
      .then(rsp => {
        if (rsp.code !== 0) {
          message.error(rsp.content)
        }
        this.props.rootStore.hideLoading()
      })
      .catch(err => {
        this.props.rootStore.hideLoading()
        message.error('数据加载失败')
      })
  }

  handleDelete = id => {
    this.props.rootStore.showLoading()
    this.props.tagsStore.delete(id).then(rsp => {
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        message.success('删除成功')
      }else{
        message.error(rsp.content)
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('删除遇到错误')
    })
  }

  handleSubmit = () => {
    if(!this.props.tagsStore.tag){
      message.error('请输入标签内容')
      return
    }
    this.props.rootStore.showLoading()
    this.props.tagsStore.add().then(rsp => {
      this.props.rootStore.hideLoading()
      if(rsp.code === 0){
        message.success('添加成功')
      }else{
        message.error(rsp.content)
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('添加遇到错误')
    })
  }

  handleInputChange = e => {
    this.props.tagsStore.setValue(e.target.value) 
  }

  render() {
    const { tags } = this.props.tagsStore
    return (
      <div>
        <h2>标签管理</h2>
        <Divider />
        {tags.map((tag, index) => {
          const isLongTag = tag.name.length > 5
          const tagElem = (
            <Tag className="tag"
            closable
              key={tag.id}
              afterClose={() => this.handleDelete(tag.id)}
            >
              {isLongTag ? `${tag.name.slice(0, 5)}...` : tag.name}
            </Tag>
          )
          return isLongTag ? (
            <Tooltip title={tag.name} key={tag.id}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}

          {this.props.tagsStore.showInputText &&<Input onChange={this.handleInputChange}
            onPressEnter={this.handleSubmit} placeholder="请输入标签，按回车提交" style={{width: '150px'}}/>}
          <Tag className="tag"
            onClick={this.props.tagsStore.showInput}
            style={{ background: '#fff', borderStyle: 'dashed' }}
          >
            <Icon type="plus" /> 新增标签
          </Tag>
        
      </div>
    )
  }
}
