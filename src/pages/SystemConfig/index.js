import React, { Component } from 'react'
import { Divider, Row, Col, message, Modal, Input,Button } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('rootStore', 'systemConfigStore')
@observer
export default class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      name: ''
    }
  }
  componentDidMount() {
    this.props.rootStore.showLoading()
    this.props.systemConfigStore
      .getConfig()
      .then(rsp => {
        this.props.rootStore.hideLoading()
        if (rsp.code !== 0) {
          message.error(rsp.content)
        }
      })
      .catch(err => {
        this.props.rootStore.hideLoading()
        message.error('数据加载失败')
      })
  }

  handleInputChange = (name, e) => {
    this.props.systemConfigStore.setValue(name, e.target.value)
  }

  handleShowModal = name => {
    this.props.systemConfigStore.showModal()
    const title = name === 'phone' ? '新的手机号码' : '新的邮箱地址'
    this.setState({ title: title, name: name })
  }

  render() {
    const { email, phone } = this.props.systemConfigStore
    return (
      <div>
        <h2>系统配置</h2>
        <Divider />
        <Row>
          <Col span={2}>通知邮箱：</Col>
          <Col span={4}>
            {/*eslint-disable no-script-url */}
            {email || '尚未设置通知邮箱'}
          </Col>
          <Col>
            <a
              href="javascript:void(0)"
              onClick={this.handleShowModal.bind(this, 'email')}
            >
              设置
            </a>
          </Col>
        </Row>
        <Row className="pdtb20">
          <Col span={2}>通知手机：</Col>
          <Col span={4}>
            {/*eslint-disable no-script-url */}
            {phone || '尚未设置通知手机'}
          </Col>
          <Col>
            <a
              href="javascript:void(0)"
              onClick={this.handleShowModal.bind(this, 'phone')}
            >
              设置
            </a>
          </Col>
        </Row>

        <Modal
          visible={this.props.systemConfigStore.modal}
          onCancel={this.props.systemConfigStore.hideModal}
          closable={false}
        >
          <Row>
            <Col>{this.state.title}：</Col>
          </Row>
          <Row className="pdtb20">
            <Col>
              <Input
                placeholder={`请输入${this.state.title}`}
                onChange={this.handleInputChange.bind(this, this.state.name)}
              />
            </Col>
          </Row>
          <Row>
            <Col>验证码：</Col>
          </Row>
          <Row className="pdtb20">
            <Col>
              <Input
                placeholder="请输入验证码"
                onChange={this.handleInputChange.bind(this, 'verify')}
                style={{width: '200px'}}
              />
              <Button>发送验证码（60）</Button>
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}
