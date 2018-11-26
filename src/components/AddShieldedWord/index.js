import React, { Component } from 'react'
import { Modal, Select, Col, Row,Input,Button,message } from 'antd'
import { CATEGORY, getCategory } from '../../common/constant'
import { inject, observer } from 'mobx-react';
import './index.less'
const Option = Select.Option
const TextArea = Input.TextArea
@inject('shieldedWordStore','rootStore')
@observer
export default class index extends Component {

  handleChange = value => {
    this.props.shieldedWordStore.setValue('category', value)
  }

  handleInputChange =(name, e) =>{
    this.props.shieldedWordStore.setValue(name, e.target.value)
  }

  handleSubmit = () =>{
    if(this.props.shieldedWordStore.category === 0){
      message.error('请选择类别')
      return
    }
    if(!this.props.shieldedWordStore.shieldedWord){
      message.error('请输入屏蔽词')
      return
    }
    this.props.rootStore.showLoading()
    this.props.shieldedWordStore.add().then(rsp =>{
      this.props.rootStore.hideLoading()
      if(rsp.code === 0) {
        message.success('新增成功')
        this.props.shieldedWordStore.hideAddShieldedWord()
      }else{
        message.error(rsp.content)
      }
    }).catch(err => {
      this.props.rootStore.hideLoading()
      message.error('新增失败')
    })
  }

  render() {
    return (
      <Modal title="新增屏蔽词" onCancel={this.props.shieldedWordStore.hideAddShieldedWord} footer={null} visible={this.props.shieldedWordStore.showAddShieldedWordModal}>
      <div  className="add-shielded-word">
        <Row>
          <Col>
          <label>分类：</label>
            <Select placeholder="请选择类别" style={{width: '100%'}} onChange={this.handleChange}>
              {Object.values(CATEGORY).map((item,index) => (
                <Option value={item} key={index}>{getCategory(item)}</Option>
              ))}
            </Select>
          </Col>
          </Row>
          <Row>
          <Col>
          <label>屏蔽词：</label>
            <Input placeholder="请输入屏蔽词" onChange={this.handleInputChange.bind(this,'shieldedWord')}/>
          </Col>
        </Row>
        <Row>
          <Col>
          <label>相关谐音词/近义词（多个逗号隔开）：</label>
            <TextArea placeholder="请输入屏蔽词" rows={3} onChange={this.handleInputChange.bind(this,'similar')}></TextArea>
          </Col>
        </Row>
        <Row>
          <Col><Button type="primary" onClick={this.handleSubmit}>确定保存</Button><Button onClick={this.props.shieldedWordStore.hideAddShieldedWord}>取消</Button></Col>
        </Row>
        </div>
      </Modal>
    )
  }
}
