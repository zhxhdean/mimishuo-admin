import React, { Component } from 'react'
import './index.less'
import { Icon, Row, Col, Button, Input, Tooltip, Upload,message } from 'antd'

import { observer, inject } from 'mobx-react'

const TextArea = Input.TextArea

@inject('suggestStore', 'rootStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      className: 'form hide'
    }
  }
  handleMin = () => {
    this.setState({ className: 'form hide' })
  }

  handleShow = () => {
    this.setState({ className: 'form' })
  }

  handleInputChange = (name, e) => {
    this.props.suggestStore.setValue(name, e.target.value)
  }

  handleSubmit = () => {

    const { fileList,subject,description,mobile,attachmentKeyList} = this.props.suggestStore
    if(!subject){
      message.error('主题没有填写！')
      return
    }
    if(!description){
      message.error('描述没有填写！')
      return
    }
    if(!mobile){
      message.error('联系电话没有填写！')
      return
    }

    this.props.rootStore.showLoading()
    if(fileList.length > 0){
      fileList.forEach(item => {
        this.props.suggestStore.getUploadUrl().then(rsp => {
          if (rsp.code === 0) {
            // promiseAll.push({url: rsp.data.presignedUrl, file: item,})
            this.props.suggestStore
              .upload(rsp.data.presignedUrl, item)
              .then(r => {
                if (r.code === 0) {
                  attachmentKeyList.push(rsp.data.fileKey)
                  if(fileList.length === attachmentKeyList.length){
                    // 图片都上传好了
                    this.props.suggestStore.add().then(rsp => {
                      this.props.rootStore.hideLoading()
                      if(rsp.code === 0){
                        message.success('成功提交')
                      }else{
                        message.error('提交遇到错误')
                      }
                    }).catch(err => {
                      this.props.rootStore.hideLoading()
                      message.error('提交遇到错误')
                    })
                  }
                }else{
                  this.props.rootStore.hideLoading()
                  message.error('提交遇到错误')
                }
              }).catch(err => {
                this.props.rootStore.hideLoading()
                message.error('提交遇到错误')
              })
          }else{
            this.props.rootStore.hideLoading()
            message.error('提交遇到错误')
          }
        }).catch(err => {
          this.props.rootStore.hideLoading()
          message.error('提交遇到错误')
        })
      })
    }else{
      this.props.suggestStore.add().then(rsp => {
        this.props.rootStore.hideLoading()
        if(rsp.code === 0){
          message.success('成功提交')
        }else{
          message.error('提交遇到错误')
        }
      }).catch(err => {
        this.props.rootStore.hideLoading()
        message.error('提交遇到错误')
      })
    }

  }

  render() {
    // const {fileList} = this.props.suggestStore
    const props = {
      accept: 'image/*',
      listType: 'picture',
      beforeUpload: file => {
        this.props.suggestStore.addFile(file)
        return false
      },
      onRemove: file => {
        this.props.suggestStore.removeFile(file)
      }
      // fileList: this.props.suggestStore.fileList
    }
    return (
      <div className="suggest-page">
        {/* <span className="display">隐藏</span> */}
        <div className="default" onClick={this.handleShow}>
          <Icon type="form" style={{ fontSize: '30px' }} />
          <br />
          提建议
        </div>

        <div className={this.state.className}>
          <Row className="header">
            <Col span={22}>
              欢迎反馈问题，
              <br />
              您的意见和建议就是我们的动力！
            </Col>
            <Col span={2}>
              <Tooltip title="最小化">
                <Icon type="minus" onClick={this.handleMin} />
              </Tooltip>
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              我们会认真查阅您反馈的每一个问题，并尽快给您答复，在这里您可以提出遇到的问题和建议和看法。
              <br />
              <span className="red">*为必填项</span>
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              主题<span className="red">*</span>
            </Col>
          </Row>
          <Row className="pdlr10">
            <Col>
              <Input onChange={this.handleInputChange.bind(this, 'subject')}/>
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              描述<span className="red">*</span>
            </Col>
          </Row>
          <Row className="pdlr10">
            <Col>
              <TextArea onChange={this.handleInputChange.bind(this, 'description')}/>
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              <Upload {...props}>
                <Button>
                  <Icon type="upload" /> 上传图片
                </Button>
              </Upload>
            </Col>
          </Row>

          <Row className="pd10">
            <Col>
              联系电话<span className="red">*</span>
            </Col>
          </Row>
          <Row className="pdlr10">
            <Col>
              <Input onChange={this.handleInputChange.bind(this, 'mobile')}/>
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              <Button
                className="submit"
                type="primary"
                onClick={this.handleSubmit}
              >
                提交
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
