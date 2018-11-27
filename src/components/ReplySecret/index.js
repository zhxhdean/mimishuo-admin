import React, { Component } from 'react'
import { Modal, Input, Button,message } from 'antd'
import { inject, observer } from 'mobx-react'

const TextArea = Input.TextArea

@inject('secretListStore', 'rootStore')
@observer
export default class index extends Component {

  handleInputChange = e => {
    this.props.secretListStore.setValue('replyContent', e.target.value)
  }

  // 提交回复
  handleSubmit = () => {
    const content = this.props.secretListStore.replyContent
    // todo 提交
    if(!content){
      message.error('回复内容不能为空！')
      return
    }
    const {id} = this.props.secretListStore.record
    this.props.rootStore.showLoading()
    this.props.secretListStore.reply(id, content).then(rsp => {
      if(rsp.code === 0){
        // 重置输入框的内容
        this.props.secretListStore.setValue('replyContent','')
        message.success('回复成功')
        this.props.secretListStore.showQuickReply(false)
      }else{
        message.error(rsp.content)
      }
      this.props.rootStore.hideLoading()
    }).catch(err => {
      message.error('提交回复遇到错误')
      this.props.rootStore.hideLoading()
    })
  }

  render() {
    const {loading} = this.props.rootStore
    const {replyContent} = this.props.secretListStore
    return (
      <div>
        <Modal
          title="快捷回复"
          footer={null}
          visible={this.props.secretListStore.showQuickReplyModal}
          onCancel={this.props.secretListStore.showQuickReply.bind(this, false)}
        >
          <TextArea rows={5} placeholder="请输入回复内容" value={replyContent} onChange={this.handleInputChange}/>
          <Button type="primary" onClick={this.handleSubmit} loading={loading}>确认回复</Button>
          <Button onClick={this.props.secretListStore.showQuickReply.bind(this, false)}>取消</Button>
        </Modal>
      </div>
    )
  }
}
