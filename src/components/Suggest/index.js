import React, { Component } from 'react'
import './index.less'
import { Icon, Row, Col, Button, Input, Tooltip } from 'antd'
const TextArea = Input.TextArea

export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      className: 'form hide'
    }
  }
  handleMin = () => {
    this.setState({className: 'form hide'})
  }

  handleShow = () => {
    this.setState({className: 'form'})
  }
  render() {
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
                <Icon type="minus" onClick={this.handleMin}/>
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
              <Input />
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              描述<span className="red">*</span>
            </Col>
          </Row>
          <Row className="pdlr10">
            <Col>
              <TextArea />
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              <Button>上传图片</Button>
            </Col>
          </Row>
          
          <Row className="pd10">
            <Col>
              联系电话<span className="red">*</span>
            </Col>
          </Row>
          <Row className="pdlr10">
            <Col>
              <Input />
            </Col>
          </Row>
          <Row className="pd10">
            <Col>
              <Button className="submit" type="primary">提交</Button>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}
